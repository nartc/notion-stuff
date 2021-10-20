import type { NotionBlocksHtmlParserOptions } from '@notion-stuff/blocks-html-parser';
import { PostResult, PropertyValue } from '@notion-stuff/v4-types';
import type { RouteConfig } from '@scullyio/scully';


export interface NotionDomRouterPluginOptions extends RouteConfig {
  /**
   * @requires string Notion DatabaseID
   */
  databaseId: string;

  /**
   * Notion API Key. This should be provided via NOTION_API_KEY environment variable instead
   */
  notionApiKey?: string;

  /**
   * A custom function that will process the {PostResult} from Notion. You take over the Frontmatter with this function
   */
  postResultProcessor?<TObject = Record<string, unknown>>(post: PostResult, options: NotionDomRouterPluginOptions, propertyValueParser: (propertyValue: PropertyValue) => any): TObject;

  /**
   * A custom function that will resolve the `published` flag that Scully needs.
   */
  isPublished?<TObject = Record<string, unknown>>(frontmatter: TObject): boolean;

  /**
   * Default icon for your post
   */
  defaultPostIcon?: string;

  /**
   * The key that you use as your "Slug" in your Notion table.
   * @default "slug" (requires you to have a "Slug" property in your table)
   */
  slugKey?: string;

  /**
   * The base path of the route when setup in Scully config
   * @example
   * {
   *   "/basePath/:slug": {
   *     basePath: "/basePath" // needs to match /basePath
   *   }
   * }
   *
   * @default "/blog"
   */
  basePath?: string;
  titleSuffix?: string;
}

export interface NotionDomPluginOptions {
  notionBlocksHtmlParserOptions?: NotionBlocksHtmlParserOptions;
}
