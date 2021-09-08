import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser';
import { Client } from '@notionhq/client/build/src';
import type { HandledRoute, RouteConfig } from '@scullyio/scully';
import {
  getPluginConfig,
  log,
  red,
  registerPlugin,
  yellow,
} from '@scullyio/scully';
import { injectHtml } from '@scullyio/scully/src/lib/renderPlugins/content-render-utils/injectHtml';
import { pagePropertiesToFrontmatter } from './page-properties-to-frontmatter';
import type { NotionPluginOptions } from './plugin-options';

export const NotionDom = 'notionDom';
export const NotionDomRouter = 'notionDomRouter';

async function notionDomRouterPlugin(
  route: string | undefined,
  config: RouteConfig
) {
  const mergedConfig = {
    ...{ slugKey: 'slug', basePath: '/blog', titleSuffix: '' },
    ...(config || {}),
  } as RouteConfig;

  try {
    const notion = new Client({
      auth: mergedConfig.notionApiKey || process.env.NOTION_API_KEY,
    });
    const posts = await notion.databases.query({
      database_id: mergedConfig.databaseId,
    });

    return Promise.resolve(
      posts.results.map((postResult) => {
        const frontmatter = pagePropertiesToFrontmatter(postResult.properties);
        return {
          type: mergedConfig.type,
          route: `${mergedConfig.basePath}/${
            frontmatter[mergedConfig.slugKey]
          }`,
          title: mergedConfig.titleSuffix
            ? `${frontmatter.title} | ${mergedConfig.titleSuffix}`
            : frontmatter.title,
          data: {
            ...frontmatter,
            id: postResult.id,
            notionUrl: postResult.url,
            cover: postResult.cover,
            notionClient: notion,
          },
        } as HandledRoute;
      })
    );
  } catch (e) {
    throw new Error(`Something went wrong. ${e}`);
  }
}

const notionDomRouterValidator = (config: RouteConfig) => {
  const errors: string[] = [];

  if (!config.databaseId) {
    errors.push('Missing "databaseId"');
  }

  return errors;
};

async function notionDomPlugin(dom: any, route: HandledRoute | undefined) {
  if (!route) return dom;

  const notionClient = route.data?.['notionClient'];
  const postId = route.data?.['id'];

  if (!notionClient) {
    log(yellow(`Notion Client not found. Skipping ${route.route}`));
    return Promise.resolve(dom);
  }

  if (!postId) {
    log(yellow(`Post ID not found. Skipping ${route.route}`));
    return Promise.resolve(dom);
  }

  try {
    const blocks = await notionClient.blocks.children.list({
      block_id: postId,
    });
    if (!blocks || !blocks.results.length) {
      log(yellow(`Post does not have any blocks. Skipping ${route.route}`));
      return Promise.resolve(dom);
    }

    const pluginOptions: NotionPluginOptions =
      getPluginConfig(NotionDom, 'postProcessByDom') || {};
    const notionBlocksHtmlParser = NotionBlocksHtmlParser.getInstance(
      pluginOptions.notionBlocksHtmlParserOptions
    );

    return injectHtml(dom, notionBlocksHtmlParser.parse(blocks.results), route);
  } catch (e) {
    log(red(`Something went wrong. ${e}`));
    return Promise.resolve(dom);
  }
}

registerPlugin(
  'router',
  NotionDomRouter,
  notionDomRouterPlugin,
  notionDomRouterValidator
);

registerPlugin('postProcessByDom', NotionDom, notionDomPlugin);
