import type {
  AudioBlock,
  Block,
  BulletedListItemBlock,
  EmbedBlock,
  FileBlock,
  HeadingOneBlock,
  HeadingThreeBlock,
  HeadingTwoBlock,
  ImageBlock,
  NumberedListItemBlock,
  ParagraphBlock,
  PDFBlock,
  RichText,
  RichTextTextInput,
  ToDoBlock,
  ToggleBlock,
  VideoBlock,
} from '@notionhq/client/build/src/api-types';

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

export interface TemporaryListItems {
  type?: 'bulleted_list_item' | 'numbered_list_item';
  items?: string;
}
