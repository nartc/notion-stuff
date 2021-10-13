import { NotionBlocksMarkdownParser } from '@notion-stuff/blocks-markdown-parser';
import type { Block } from '@notion-stuff/v4-types';
import type { NotionBlocksHtmlParserOptions } from './interfaces';

export const defaultMarkedOptions = {
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
};

let marked, hljs, prism;

export class NotionBlocksHtmlParser {
  private static instance: NotionBlocksHtmlParser;
  private static markdownParser: NotionBlocksMarkdownParser;
  private readonly parserOptions: Required<NotionBlocksHtmlParserOptions>;

  private constructor(parserOptions: NotionBlocksHtmlParserOptions = {}) {
    this.parserOptions = NotionBlocksHtmlParser.assignDefaultOptions(
      parserOptions
    ) as Required<NotionBlocksHtmlParserOptions>;
  }

  static getInstance(parserOptions: NotionBlocksHtmlParserOptions = {}) {
    if (!this.instance) {
      this.instance = new this(parserOptions);
      if (typeof this.instance.parserOptions.mdToHtmlOptions === 'object') {
        this.setupMarked(this.instance.parserOptions);
      }
    }

    if (!this.markdownParser) {
      this.markdownParser = NotionBlocksMarkdownParser.getInstance(
        this.instance.parserOptions.mdParserOptions
      );
    }

    return this.instance;
  }

  parse(blocks: Block[]) {
    const markdown = NotionBlocksHtmlParser.markdownParser.parse(blocks);
    const { mdToHtmlOptions } = this.parserOptions;

    if (typeof mdToHtmlOptions === 'object') {
      return marked(markdown, mdToHtmlOptions);
    }

    return mdToHtmlOptions(markdown, this.parserOptions);
  }

  private static assignDefaultOptions(
    parserOptions: NotionBlocksHtmlParserOptions
  ): NotionBlocksHtmlParserOptions {
    return {
      mdParserOptions: {},
      mdHighlightingOptions: 'hljs',
      mdToHtmlOptions: defaultMarkedOptions,
      ...parserOptions,
    };
  }

  private static setupMarked({
    mdToHtmlOptions,
    mdHighlightingOptions,
  }: Required<NotionBlocksHtmlParserOptions>) {
    try {
      marked = require('marked');
    } catch (e) {
      const message = `Error importing package: marked. Please install "marked" package.`;
      console.error(message);
      throw new Error(message);
    }

    const renderer = new marked.Renderer();

    const codeTransformer = (code: unknown, language: string) => {
      const langClass = 'language-' + language;
      if (mdHighlightingOptions === 'hljs') {
        return `<pre><code class='hljs ${langClass}'>${
          (code as Record<string, unknown>).value
        }</code></pre>`;
      }

      // prism
      if (!language) {
        return `<pre><code>${code}</code></pre>`;
      }
      // e.g. "language-js"
      return `<pre class='${langClass}'><code class='${langClass}'>${code}</code></pre>`;
    };

    renderer.code = function (this: typeof renderer, code, language) {
      code = this.options.highlight(code, language);
      return codeTransformer(code, code.language || language);
    };

    (mdToHtmlOptions as marked.MarkedOptions).renderer = renderer;

    if (mdHighlightingOptions === 'hljs') {
      if (!hljs) {
        try {
          hljs = require('highlight.js');
        } catch (e) {
          const message = `Error importing package: highlight.js. Please install "highlight.js" package.`;
          console.error(message);
          throw new Error(message);
        }
      }
      (mdToHtmlOptions as marked.MarkedOptions).highlight = (code, lang) => {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language });
      };
    } else if (mdHighlightingOptions === 'prismjs') {
      if (!prism) {
        try {
          prism = require('prismjs');
          require('prismjs/components/prism-bash');
          require('prismjs/components/prism-css');
          require('prismjs/components/prism-javascript');
          require('prismjs/components/prism-json');
          require('prismjs/components/prism-markup');
          require('prismjs/components/prism-markdown');
          require('prismjs/components/prism-typescript');
          require('prismjs/components/prism-jsx');
          require('prismjs/components/prism-tsx');
          require('prismjs/components/prism-docker');
        } catch (e) {
          const message = `Error importing package: prismjs. Please install "prismjs" package.`;
          console.error(message);
          throw new Error(message);
        }
      }

      (mdToHtmlOptions as marked.MarkedOptions).highlight = (code, lang) => {
        if (!prism.languages[lang]) {
          return code;
        }

        return prism.highlight(code, prism.languages[lang]);
      };
    } else {
      (mdToHtmlOptions as marked.MarkedOptions).highlight =
        mdHighlightingOptions;
    }
  }
}
