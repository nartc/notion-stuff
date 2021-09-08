# @notion-stuff/blocks-html-parser

This is a parser to parse Notion blocks to HTML parser. If you're here, you are probably aware of the [Notion API](https://developers.notion.com/), which is currently in beta. Hence, this parser is being updated (trying to) as the Notion API is updated. 

## Installation

```bash
npm install @notion-stuff/blocks-html-parser
```

> `@notion-stuff/blocks-html-parser` depends on `@notionhq/client`

## Usage

1. Get the parser instance with `NotionBlocksHtmlParser.getInstance()`
   1. Optionally pass in a `NotionBlocksHtmlParserOptions` object to customize the parser. The passed-in option will be merged with the default options.
2. Call `instance.parse(blocks)` with `blocks` being `Block[]` that you'd get from a Notion page.

## Configuration

```ts
export interface NotionBlocksHtmlParserOptions {
  audioParser?: (audio: AudioBlock['audio']) => string;
  unsupportedParser?: (block: Block) => string;
  unorderedListWrapperParser?: (listItemsHtml: string) => string;
  orderedListWrapperParser?: (listItemsHtml: string) => string;
  paragraphParser?: (paragraph: ParagraphBlock['paragraph']) => string;
  headingOneParser?: (heading: HeadingOneBlock['heading_1']) => string;
  headingTwoParser?: (heading: HeadingTwoBlock['heading_2']) => string;
  headingThreeParser?: (heading: HeadingThreeBlock['heading_3']) => string;
  fileParser?: (file: FileBlock['file']) => string;
  listItemParser?: (
    list:
      | BulletedListItemBlock['bulleted_list_item']
      | NumberedListItemBlock['numbered_list_item']
  ) => string;
  pdfParser?: (pdf: PDFBlock['pdf']) => string;
  todoParser?: (todo: ToDoBlock['to_do']) => string;
  toggleParser?: (toggle: ToggleBlock['toggle']) => string;
  embedParser?: (embed: EmbedBlock['embed']) => string;
  imageParser?: (image: ImageBlock['image']) => string;
  videoParser?: (video: VideoBlock['video']) => string;

  boldAnnotator?: (original: string) => string;
  codeAnnotator?: (original: string) => string;
  italicAnnotator?: (original: string) => string;
  underlineAnnotator?: (original: string) => string;
  strikethroughAnnotator?: (original: string) => string;

  linkTransformer?: (
    original: string,
    link: RichTextTextInput['text']['link']
  ) => string;
  captionTransformer?: (richTexts: RichText[]) => string;
}
```
