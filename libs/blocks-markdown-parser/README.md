# @notion-stuff/blocks-html-parser

This is a parser to parse Notion blocks to Markdown. If you're here, you are probably aware of the [Notion API](https://developers.notion.com/), which is currently in beta. Hence, this parser is being updated (trying to) as the Notion API is updated. 

## Installation

```bash
npm install @notion-stuff/blocks-markdown-parser
```

> `@notion-stuff/blocks-markdown-parser` depends on `@notionhq/client`

## Usage

1. Get the parser instance with `NotionBlocksMarkdownParser.getInstance()`
   1. Optionally pass in a `NotionBlocksMarkdownParserOptions` object to customize the parser. The passed-in option will be merged with the default options.
2. Call `instance.parse(blocks)` with `blocks` being `Block[]` that you'd get from a Notion page.

## Configuration

```ts
export interface NotionBlocksMarkdownParserOptions {}
```
