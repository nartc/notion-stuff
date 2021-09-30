import { NotionBlocksMarkdownParser } from '@notion-stuff/blocks-markdown-parser';
import type { Block } from '@notionhq/client/build/src/api-types';
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
    marked = require('marked');

    const renderer = new marked.Renderer();

    renderer.code = function (this: typeof renderer, code, language) {
      code = this.options.highlight(code, language);
      if (!language) {
        return `<pre><code>${code}</code></pre>`;
      }
      // e.g. "language-js"
      const langClass = 'language-' + language;
      return `<pre class='${langClass}'><code class='${langClass}'>${code}</code></pre>`;
    };

    (mdToHtmlOptions as marked.MarkedOptions).renderer = renderer;

    if (mdHighlightingOptions === 'hljs') {
      if (!hljs) {
        hljs = require('highlight.js');
      }
      (mdToHtmlOptions as marked.MarkedOptions).highlight = (code, lang) =>
        hljs.highlight(code, { language: lang });
    } else if (mdHighlightingOptions === 'prismjs') {
      if (!prism) {
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
