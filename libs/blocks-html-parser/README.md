# @notion-stuff/blocks-html-parser

This is a parser to parse Notion blocks to HTML parser. If you're here, you are probably aware of the [Notion API](https://developers.notion.com/), which is currently in beta. Hence, this parser is being updated (trying to) as the Notion API is updated.

## Installation

```bash
npm install @notion-stuff/blocks-html-parser
```

> `@notion-stuff/blocks-html-parser` depends on `@notionhq/client` and `@notion-stuff/blocks-markdown-parser`

If you are using `NotionBlocksHtmlParser` with default configuration, you need to also install `marked` and `hljs`. More info [here](#usage)

```bash
npm install marked highlight.js
```

## Usage

1. Get the parser instance with `NotionBlocksHtmlParser.getInstance()`
   1. Optionally pass in a `NotionBlocksHtmlParserOptions` object to customize the parser. The passed-in option will be merged with the default options.
2. Call `instance.parse(blocks)` with `blocks` being `Block[]` that you'd get from a Notion page.

`NotionBlocksHtmlParser` uses `NotionBlocksMarkdownParser` under the hood to parse Notion blocks to Markdown first.

By default, `NotionBlocksHtmlParser` will use [marked](https://github.com/markedjs/marked) to compile Markdown to HTML. The default `marked` configuration is as follow:

```ts
export const defaultMarkedOptions = {
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
};
```
> `defaultMarkedOptions` is exported so you can merge it with your custom configuration.

For highlighting, `hljs` will be used by default.

You can customize:

- Markdown to HTML compilation with `NotionBlocksHtmlParserOptions#mdToHtmlOptions`
  - If you pass in a function, you are taking over the compilation
  - Otherwise, you can pass in an `MarkedOptions` object to customize `marked`
  > Make sure to `npm install marked`
- Markdown Highlighting with `NotionBlocksHtmlParserOptions#mdHighlightingOptions`
  - If you pass in a function, you are taking over the highlighting
  - If you pass in `hljs`, the parser will use `highlight.js` to highlight the code blocks.
  > Make sure to `npm install highlight.js`
  - If you pass in `prism`, the parse will use `prismjs` to highlight the code blocks
  > Make sure to `npm install prismjs`

## Configuration

```ts
export interface NotionBlocksHtmlParserOptions {
  mdParserOptions?: NotionBlocksMarkdownParserOptions;
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
```
