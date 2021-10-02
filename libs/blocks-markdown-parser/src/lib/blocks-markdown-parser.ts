import type {
  Annotations,
  AudioBlock,
  Block,
  BulletedListItemBlock,
  EmbedBlock,
  ExternalFileWithCaption,
  FileBlock,
  FileWithCaption,
  HeadingOneBlock,
  HeadingThreeBlock,
  HeadingTwoBlock,
  ImageBlock,
  NumberedListItemBlock,
  ParagraphBlock,
  PDFBlock,
  RichText,
  RichTextEquation,
  RichTextMention,
  RichTextText,
  ToDoBlock,
  ToggleBlock,
  VideoBlock,
} from '@notionhq/client/build/src/api-types';

const EOL_MD = '\n';

type HeadingBlock = HeadingOneBlock | HeadingTwoBlock | HeadingThreeBlock;

export interface NotionBlocksMarkdownParserOptions {}

export class NotionBlocksMarkdownParser {
  private static instance: NotionBlocksMarkdownParser;
  private readonly parserOptions: Required<NotionBlocksMarkdownParserOptions>;

  private constructor(options?: NotionBlocksMarkdownParserOptions) {
    this.parserOptions = { ...(options || {}) };
  }

  static getInstance(options?: NotionBlocksMarkdownParserOptions) {
    if (!this.instance) {
      this.instance = new this(options);
    }

    return this.instance;
  }

  parse(blocks: Block[], depth = 0): string {
    return blocks
      .reduce((markdown, childBlock) => {
        let childBlockString = '';
        if (childBlock.has_children && childBlock[childBlock.type].children) {
          childBlockString = ' '
            .repeat(depth)
            .concat(
              childBlockString,
              this.parse(childBlock[childBlock.type].children, depth + 2)
            );
        }

        if (childBlock.type === 'unsupported') {
          markdown += 'NotionAPI Unsupported'.concat(EOL_MD, childBlockString);
        }

        if (childBlock.type === 'paragraph') {
          markdown += this.parseParagraph(childBlock).concat(childBlockString);
        }

        // @ts-ignore
        if (childBlock.type === 'code') {
          markdown += this.parseCodeBlock(childBlock).concat(childBlockString);
        }

        if (childBlock.type.startsWith('heading_')) {
          const headingLevel = Number(childBlock.type.split('_')[1]);
          markdown += this.parseHeading(
            childBlock as HeadingBlock,
            headingLevel
          ).concat(childBlockString);
        }

        if (childBlock.type === 'bulleted_list_item') {
          markdown +=
            this.parseBulletedListItems(childBlock).concat(childBlockString);
        }

        if (childBlock.type === 'numbered_list_item') {
          markdown +=
            this.parseNumberedListItems(childBlock).concat(childBlockString);
        }

        if (childBlock.type === 'to_do') {
          markdown += this.parseTodoBlock(childBlock).concat(childBlockString);
        }

        if (childBlock.type === 'toggle') {
          markdown += this.parseToggleBlock(childBlock).replace(
            '{{childBlock}}',
            childBlockString
          );
        }

        if (childBlock.type === 'image') {
          markdown += this.parseImageBlock(childBlock).concat(childBlockString);
        }

        if (childBlock.type === 'embed') {
          markdown += this.parseEmbedBlock(childBlock).concat(childBlockString);
        }

        if (childBlock.type === 'audio') {
          markdown += this.parseAudioBlock(childBlock).concat(childBlockString);
        }

        if (childBlock.type === 'video') {
          markdown += this.parseVideoBlock(childBlock).concat(childBlockString);
        }

        if (childBlock.type === 'file') {
          markdown += this.parseFileBlock(childBlock).concat(childBlockString);
        }

        if (childBlock.type === 'pdf') {
          markdown += this.parsePdfBlock(childBlock).concat(childBlockString);
        }

        return markdown;
      }, '')
      .concat(EOL_MD);
  }

  parseParagraph(paragraphBlock: ParagraphBlock): string {
    return this.parseRichTexts(paragraphBlock.paragraph.text).concat(
      EOL_MD.repeat(2)
    );
  }

  parseCodeBlock(codeBlock: any): string {
    return `\`\`\`${codeBlock.code.language.toLowerCase() || ''}
${codeBlock.code.text[0].text.content}
\`\`\``.concat(EOL_MD);
  }

  parseHeading(headingBlock: HeadingBlock, headingLevel: number): string {
    return EOL_MD.concat(
      '#'.repeat(headingLevel),
      ' ',
      this.parseRichTexts(headingBlock[headingBlock.type].text),
      EOL_MD
    );
  }

  parseBulletedListItems(bulletedListItemBlock: BulletedListItemBlock): string {
    return '* '.concat(
      this.parseRichTexts(bulletedListItemBlock.bulleted_list_item.text),
      EOL_MD
    );
  }

  parseNumberedListItems(numberedListItemBlock: NumberedListItemBlock): string {
    return '1. '.concat(
      this.parseRichTexts(numberedListItemBlock.numbered_list_item.text),
      EOL_MD
    );
  }

  parseTodoBlock(todoBlock: ToDoBlock): string {
    return `- [${todoBlock.to_do.checked ? 'x' : ' '}] `.concat(
      this.parseRichTexts(todoBlock.to_do.text),
      EOL_MD
    );
  }

  parseToggleBlock(toggleBlock: ToggleBlock): string {
    return `<details><summary>${this.parseRichTexts(
      toggleBlock.toggle.text
    )}</summary>{{childBlock}}</details>`;
  }

  parseImageBlock(imageBlock: ImageBlock): string {
    const { url, caption } = this.parseFile(imageBlock.image);
    return `![${caption}](${url})`.concat(EOL_MD);
  }

  parseAudioBlock(audioBlock: AudioBlock): string {
    const { url, caption } = this.parseFile(audioBlock.audio);
    return `![${caption}](${url})`;
  }

  private parseVideoBlock(videoBlock: VideoBlock): string {
    const { url, caption } = this.parseFile(videoBlock.video);
    return `To be supported: ${url} with ${caption}`.concat(EOL_MD);
  }

  private parseFileBlock(fileBlock: FileBlock): string {
    const { url, caption } = this.parseFile(fileBlock.file);
    return `To be supported: ${url} with ${caption}`.concat(EOL_MD);
  }

  private parsePdfBlock(pdfBlock: PDFBlock): string {
    const { url, caption } = this.parseFile(pdfBlock.pdf);
    return `
<figure>
  <object data='${url}' type='application/pdf'></object>
  <figcaption>${caption}</figcaption>
</figure>
`.concat(EOL_MD);
  }

  parseEmbedBlock(embedBlock: EmbedBlock): string {
    const embedded = `<iframe src='${embedBlock.embed.url}'></iframe>`;

    if (embedBlock.embed.caption) {
      return `
<figure>
  ${embedded}
  <figcaption>${this.parseRichTexts(embedBlock.embed.caption)}</figcaption>
</figure>`.concat(EOL_MD);
    }

    return embedded.concat(EOL_MD);
  }

  parseRichTexts(richTexts: RichText[]): string {
    return richTexts.reduce((parsedContent, richText) => {
      switch (richText.type) {
        case 'text':
          parsedContent += this.parseText(richText);
          break;
        case 'mention':
          parsedContent += this.parseMention(richText);
          break;
        case 'equation':
          parsedContent += this.parseEquation(richText);
          break;
      }

      return parsedContent;
    }, '');
  }

  parseText(richText: RichTextText): string {
    let content = richText.text.content;

    if (richText.text.link) {
      content = this.annotateLink(richText.text);
    }

    return this.annotate(richText.annotations, content);
  }

  // TODO: support mention when we know what it actually means

  parseMention(mention: RichTextMention): string {
    switch (mention.mention.type) {
      case 'user':
        break;
      case 'page':
        break;
      case 'database':
        break;
      case 'date':
        break;
    }
    return this.annotate(mention.annotations, mention.plain_text);
  }

  parseEquation(equation: RichTextEquation): string {
    return this.annotate(
      equation.annotations,
      `$${equation.equation.expression}$`
    );
  }

  parseFile(file: ExternalFileWithCaption | FileWithCaption): {
    caption: string;
    url: string;
  } {
    let fileContent = {
      caption: '',
      url: '',
    };

    switch (file.type) {
      case 'external':
        fileContent.url = file.external.url;
        break;
      case 'file':
        fileContent.url = file.file.url;
        break;
    }

    fileContent.caption = file.caption
      ? this.parseRichTexts(file.caption)
      : fileContent.url;

    return fileContent;
  }

  private annotate(annotations: Annotations, originalContent: string): string {
    return Object.entries(annotations).reduce(
      (
        annotatedContent,
        [modifier, isOnOrColor]: [keyof Annotations, boolean | string]
      ) =>
        isOnOrColor
          ? this.annotateModifier(
              modifier,
              annotatedContent,
              isOnOrColor as string
            )
          : annotatedContent,
      originalContent
    );
  }

  private annotateLink(text: RichTextText['text']): string {
    return `[${text.content}](${text.link.url ? text.link.url : text.link})`;
  }

  private annotateModifier(
    modifier: keyof Annotations,
    originalContent: string,
    color?: string
  ): string {
    switch (modifier) {
      case 'bold':
        return `**${originalContent}**`;
      case 'italic':
        return `_${originalContent}_`;
      case 'strikethrough':
        return `~~${originalContent}~~`;
      case 'underline':
        return `<u>${originalContent}</u>`;
      case 'code':
        return `\`${originalContent}\``;
      case 'color':
        if (color !== 'default') {
          return `<span notion-color='${color}'>${originalContent}</span>`;
        }
        return originalContent;
    }
  }
}
