import type { NotionBlocksMarkdownParserOptions } from '@notion-stuff/blocks-markdown-parser';
import type { MarkedOptions } from 'marked';

export interface NotionBlocksHtmlParserOptions {
  mdParserOptions?: Partial<NotionBlocksMarkdownParserOptions>;
  mdToHtmlOptions?:
    | ((
        markdown: string,
        htmlParserOptions: NotionBlocksHtmlParserOptions
      ) => string)
    | MarkedOptions;
  /**
   * Only applicable with @link{mdToHtmlOptions} as @link{MarkedOptions}
   * @default 'hljs'
   */
  mdHighlightingOptions?: 'hljs' | 'prismjs' | MarkedOptions['highlight'];
}
