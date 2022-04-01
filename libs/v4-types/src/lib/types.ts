import type {
  GetBlockResponse,
  GetPagePropertyResponse,
} from '@notionhq/client/build/src/api-endpoints';

/** Property **/

export type PropertyValueType = GetPagePropertyResponse['type'];

export type ExtractedPropertyValue<TType extends PropertyValueType> = Extract<
  GetPagePropertyResponse,
  { type: TType }
>;

export type PropertyValuePropertyItem = ExtractedPropertyValue<'property_item'>;
export type PropertyValueTitle = ExtractedPropertyValue<'title'>;
export type PropertyValueRichText = ExtractedPropertyValue<'rich_text'>;
export type PropertyValueNumber = ExtractedPropertyValue<'number'>;
export type PropertyValueUrl = ExtractedPropertyValue<'url'>;
export type PropertyValueSelect = ExtractedPropertyValue<'select'>;
export type PropertyValueMultiSelect = ExtractedPropertyValue<'multi_select'>;
export type PropertyValuePeople = ExtractedPropertyValue<'people'>;
export type PropertyValueEmail = ExtractedPropertyValue<'email'>;
export type PropertyValuePhoneNumber = ExtractedPropertyValue<'phone_number'>;
export type PropertyValueDate = ExtractedPropertyValue<'date'>;
export type PropertyValueFiles = ExtractedPropertyValue<'files'>;
export type PropertyValueFormula = ExtractedPropertyValue<'formula'>;
export type PropertyValueRelation = ExtractedPropertyValue<'relation'>;
export type PropertyValueRollup = ExtractedPropertyValue<'rollup'>;
export type PropertyValueCreatedTime = ExtractedPropertyValue<'created_time'>;
export type PropertyValueCreatedBy = ExtractedPropertyValue<'created_by'>;
export type PropertyValueEditedTime =
  ExtractedPropertyValue<'last_edited_time'>;
export type PropertyValueEditedBy = ExtractedPropertyValue<'last_edited_by'>;
export type PropertyValueCheckbox = ExtractedPropertyValue<'checkbox'>;

/** People **/
export type PropertyValueUser = Extract<
  PropertyValuePeople['people'],
  { type: string }
>;
export type PropertyValueUserType = PropertyValueUser['type'];

export type PropertyValueUserPerson = Extract<
  PropertyValueUser,
  { type: 'person' }
>;
export type PropertyValueUserBot = Extract<PropertyValueUser, { type: 'bot' }>;

/** Block **/
export type Block = Extract<GetBlockResponse, { type: string }>;

export type BlockType = Block['type'];

export type ExtractedBlockType<TType extends BlockType> = Extract<
  Block,
  { type: TType }
>;

export type Blocks = Block[];

export type ParagraphBlock = ExtractedBlockType<'paragraph'>;

export type HeadingOneBlock = ExtractedBlockType<'heading_1'>;
export type HeadingTwoBlock = ExtractedBlockType<'heading_2'>;
export type HeadingThreeBlock = ExtractedBlockType<'heading_3'>;

export type HeadingBlock =
  | HeadingOneBlock
  | HeadingTwoBlock
  | HeadingThreeBlock;

export type BulletedListItemBlock = ExtractedBlockType<'bulleted_list_item'>;
export type NumberedListItemBlock = ExtractedBlockType<'numbered_list_item'>;

export type TableBlock = ExtractedBlockType<'table'>;
export type TableRowBlock = ExtractedBlockType<'table_row'>;

export type QuoteBlock = ExtractedBlockType<'quote'>;
export type EquationBlock = ExtractedBlockType<'equation'>;
export type CodeBlock = ExtractedBlockType<'code'>;
export type CalloutBlock = ExtractedBlockType<'callout'>;
export type ToDoBlock = ExtractedBlockType<'to_do'>;
export type BookmarkBlock = ExtractedBlockType<'bookmark'>;
export type ToggleBlock = ExtractedBlockType<'toggle'>;
export type TemplateBlock = ExtractedBlockType<'template'>;
export type SyncedBlock = ExtractedBlockType<'synced_block'>;
export type BreadcrumbBlock = ExtractedBlockType<'breadcrumb'>;

export type ChildPageBlock = ExtractedBlockType<'child_page'>;
export type ChildDatabaseBlock = ExtractedBlockType<'child_database'>;

export type EmbedBlock = ExtractedBlockType<'embed'>;
export type ImageBlock = ExtractedBlockType<'image'>;
export type VideoBlock = ExtractedBlockType<'video'>;
export type PDFBlock = ExtractedBlockType<'pdf'>;
export type FileBlock = ExtractedBlockType<'file'>;
export type AudioBlock = ExtractedBlockType<'audio'>;

export type TocBlock = ExtractedBlockType<'table_of_contents'>;
export type DividerBlock = ExtractedBlockType<'divider'>;

export type ColumnBlock = ExtractedBlockType<'column'>;
export type ColumnListBlock = ExtractedBlockType<'column_list'>;

export type LinkPreviewBlock = ExtractedBlockType<'link_preview'>;
export type LinkToPageBlock = ExtractedBlockType<'link_to_page'>;

export type UnsupportedBlock = ExtractedBlockType<'unsupported'>;

/** RichText **/
export type RichText = ParagraphBlock['paragraph']['rich_text'][number];

export type Annotations = RichText['annotations'];

export type RichTextType = RichText['type'];

export type ExtractedRichText<TType extends RichTextType> = Extract<
  RichText,
  { type: TType }
>;

export type RichTextText = ExtractedRichText<'text'>;
export type RichTextMention = ExtractedRichText<'mention'>;
export type RichTextEquation = ExtractedRichText<'equation'>;

/** File **/
export type File = ImageBlock['image'];

export type FileType = File['type'];

export type ExtractedFile<TType extends FileType> = Extract<
  File,
  { type: TType }
>;

export type ExternalFileWithCaption = Omit<
  ExtractedFile<'external'>,
  'caption'
> & { caption?: ExtractedFile<'external'>['caption'] };
export type FileWithCaption = Omit<ExtractedFile<'file'>, 'caption'> & {
  caption?: ExtractedFile<'file'>['caption'];
};

/** Callout */
export type CalloutIcon = CalloutBlock['callout']['icon'];

export type CalloutIconType = CalloutIcon['type'];

export type ExtractedCalloutIcon<TType extends CalloutIconType> = Extract<
  CalloutIcon,
  { type: TType }
>;

export type CalloutIconEmoji = ExtractedCalloutIcon<'emoji'>;
export type CalloutIconExternal = ExtractedCalloutIcon<'external'>;
export type CalloutIconFile = ExtractedCalloutIcon<'file'>;
