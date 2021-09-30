import type {
  Block,
  BulletedListItemBlock,
  EmbedBlock,
  HeadingOneBlock,
  HeadingThreeBlock,
  HeadingTwoBlock,
  ImageBlock,
  NumberedListItemBlock,
  ParagraphBlock,
  RichText,
  RichTextText,
  RichTextTextInput,
} from '@notionhq/client/build/src/api-types';
import type {
  NotionBlocksHtmlParserOptions,
  TemporaryListItems,
} from './interfaces';

export class NotionBlocksHtmlParser {
  private static instance: NotionBlocksHtmlParser;
  private readonly parserOptions: Required<NotionBlocksHtmlParserOptions>;

  private constructor(parserOptions: NotionBlocksHtmlParserOptions = {}) {
    this.parserOptions = this.assignDefaultOptions(
      parserOptions
    ) as Required<NotionBlocksHtmlParserOptions>;
  }

  static getInstance(parserOptions: NotionBlocksHtmlParserOptions = {}) {
    if (!this.instance) {
      this.instance = new this(parserOptions);
    }

    return this.instance;
  }

  private static isPreviousBlockListType(
    block: Block,
    listItems: TemporaryListItems
  ) {
    return (
      block.type !== 'bulleted_list_item' &&
      block.type !== 'numbered_list_item' &&
      listItems.type &&
      listItems.items
    );
  }

  parse(blocks: Block[]) {
    let html = '';
    let listItems: TemporaryListItems = { items: '' };

    for (const block of blocks) {
      if (NotionBlocksHtmlParser.isPreviousBlockListType(block, listItems)) {
        html +=
          listItems.type === 'bulleted_list_item'
            ? this.parserOptions.unorderedListWrapperParser(listItems.items)
            : this.parserOptions.orderedListWrapperParser(listItems.items);
        listItems = { items: '' };
      }

      switch (block.type) {
        case 'unsupported':
          html += this.parserOptions.unsupportedParser(block);
          break;
        case 'paragraph':
          html += this.parserOptions.paragraphParser(block.paragraph);
          break;
        case 'heading_1':
          html += this.parserOptions.headingOneParser(block.heading_1);
          break;
        case 'heading_2':
          html += this.parserOptions.headingTwoParser(block.heading_2);
          break;
        case 'heading_3':
          html += this.parserOptions.headingThreeParser(block.heading_3);
          break;
        case 'bulleted_list_item':
        case 'numbered_list_item':
          listItems.type = block.type;
          listItems.items += this.parserOptions.listItemParser(
            block[block.type]
          );
          break;
        case 'to_do':
          html += this.parserOptions.todoParser(block.to_do);
          break;
        case 'toggle':
          html += this.parserOptions.toggleParser(block.toggle);
          break;
        case 'child_page':
          console.log('Child Page ==>', JSON.stringify(block, null, 2));
          break;
        case 'embed':
          html += this.parserOptions.embedParser(block.embed);
          break;
        case 'image':
          html += this.parserOptions.imageParser(block.image);
          break;
        case 'video':
          html += this.parserOptions.videoParser(block.video);
          break;
        case 'file':
          html += this.parserOptions.fileParser(block.file);
          break;
        case 'pdf':
          html += this.parserOptions.pdfParser(block.pdf);
          break;
        case 'audio':
          html += this.parserOptions.audioParser(block.audio);
          break;
      }
    }

    return html;
  }

  parseRichTexts(richTexts: RichText[]): string {
    let parsedText = '';

    for (
      let i = 0, richTextsLength = richTexts.length;
      i < richTextsLength;
      i++
    ) {
      const richText = richTexts[i];

      switch (richText.type) {
        case 'text':
          parsedText += this.parseRichTextText(richText);
          break;
        case 'mention':
          break;
        case 'equation':
          break;
      }
    }

    return parsedText;
  }

  parseRichTextText(richTextText: RichTextText): string {
    let content = richTextText.text.content;
    if (richTextText.text.link) {
      content = this.linkify(content, richTextText.text.link);
    }
    content = this.annotate(content, richTextText.annotations);
    return content;
  }

  parseImage(image: ImageBlock['image']): string {
    let imageContent = '';
    let plainImageCaption = '';
    let imageCaption = '';

    if (image.caption) {
      plainImageCaption = image.caption
        .map((richText) => richText.plain_text)
        .join(' ');
      imageCaption = this.parserOptions.captionTransformer(image.caption);
    }

    switch (image.type) {
      case 'external':
        imageContent = `<img src='${image.external.url}' alt='${
          plainImageCaption || image.external.url
        }'>`;
        break;
      case 'file':
        imageContent = `<img src='${image.file.url}' alt='${
          plainImageCaption || image.file.url
        }'>`;
        break;
    }

    if (image.caption) {
      imageContent += imageCaption;
    }

    return `<p>${imageContent}</p>`;
  }

  parseEmbed(embed: EmbedBlock['embed']): string {
    let parsed: string;

    if (embed.url.includes('gist.github')) {
      parsed = `<script async defer type='text/javascript' src='${embed.url}'/>`;
    } else {
      parsed = `<iframe src='${embed.url}'></iframe>`;
    }

    if (embed.caption) {
      parsed += this.parserOptions.captionTransformer(embed.caption);
    }

    return parsed;
  }

  parseListItem(
    listItem:
      | BulletedListItemBlock['bulleted_list_item']
      | NumberedListItemBlock['numbered_list_item']
  ): string {
    return `<li>${this.parseRichTexts(listItem.text)}</li>`;
  }

  parseHeading(headingType: 'h1' | 'h2' | 'h3') {
    return (
      heading:
        | HeadingOneBlock['heading_1']
        | HeadingTwoBlock['heading_2']
        | HeadingThreeBlock['heading_3']
    ) =>
      `<${headingType}>${this.parseRichTexts(heading.text)}</${headingType}>`;
  }

  parseParagraph(paragraph: ParagraphBlock['paragraph']): string {
    return `<p>${this.parseRichTexts(paragraph.text)}</p>`;
  }

  parseListWrapper(listType: 'ul' | 'ol') {
    return (listItemsHtml: string) =>
      `<${listType}>${listItemsHtml}</${listType}>`;
  }

  private linkify(
    originalContent: string,
    link: RichTextTextInput['text']['link']
  ) {
    return this.parserOptions.linkTransformer(originalContent, link);
  }

  private annotate(
    originalContent: string,
    annotations: RichTextText['annotations']
  ) {
    if (!annotations) return originalContent;

    if (annotations.bold) {
      originalContent = this.parserOptions.boldAnnotator(originalContent);
    }

    if (annotations.code) {
      originalContent = this.parserOptions.codeAnnotator(originalContent);
    }

    if (annotations.italic) {
      originalContent = this.parserOptions.italicAnnotator(originalContent);
    }

    if (annotations.underline) {
      originalContent = this.parserOptions.underlineAnnotator(originalContent);
    }

    if (annotations.strikethrough) {
      originalContent =
        this.parserOptions.strikethroughAnnotator(originalContent);
    }

    return originalContent;
  }

  private assignDefaultOptions(
    parserOptions: NotionBlocksHtmlParserOptions
  ): NotionBlocksHtmlParserOptions {
    return {
      unsupportedParser: () =>
        `<p style='text-align: center'>Notion API Unsupported</p>`,
      imageParser: this.parseImage.bind(this),
      embedParser: this.parseEmbed.bind(this),
      listItemParser: this.parseListItem.bind(this),
      headingOneParser: this.parseHeading('h1').bind(this),
      headingTwoParser: this.parseHeading('h2').bind(this),
      headingThreeParser: this.parseHeading('h3').bind(this),
      paragraphParser: this.parseParagraph.bind(this),
      unorderedListWrapperParser: this.parseListWrapper('ul').bind(this),
      orderedListWrapperParser: this.parseListWrapper('ol').bind(this),

      boldAnnotator: (original) => `<strong>${original}</strong>`,
      codeAnnotator: (original) => `<code>${original}</code>`,
      italicAnnotator: (original) => `<em>${original}</em>`,
      underlineAnnotator: (original) =>
        `<span style='text-decoration: underline'>${original}</span>`,
      strikethroughAnnotator: (original) =>
        `<span style='text-decoration: line-through'>${original}</span>`,

      captionTransformer: (richTexts) =>
        `<em>${this.parseRichTexts(richTexts)}</em>`,
      linkTransformer: (original, link) =>
        `<a href='${link.url}' rel='noopener noreferrer' target='_blank'>${original}</a>`,
      ...parserOptions,
    };
  }
}
