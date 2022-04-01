import { NotionBlocksHtmlParser } from '@notion-stuff/blocks-html-parser';
import type { Blocks, PostResult } from '@notion-stuff/v4-types';
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
import type {
  NotionDomPluginOptions,
  NotionDomRouterPluginOptions,
} from './plugin-options';
import { processPageProperties } from './process-page-properties';

export const NotionDom = 'notionDom';
export const NotionDomRouter = 'notionDomRouter';

let notion: Client;
let htmlParser: NotionBlocksHtmlParser;
let pluginOptions: NotionDomPluginOptions;

function setupParserAndPluginOptions() {
  if (!pluginOptions) {
    pluginOptions = getPluginConfig(NotionDom, 'postProcessByDom') || {};
  }

  if (!htmlParser) {
    htmlParser = NotionBlocksHtmlParser.getInstance(
      pluginOptions.notionBlocksHtmlParserOptions
    );
  }
}

try {
  notion = new Client({ auth: process.env.NOTION_API_KEY });
} catch {
  log(
    yellow(
      'No NOTION_API_KEY in Environment Variables. Attempting to use API key from the route config'
    )
  );
}

async function notionDomRouterPlugin(
  route: string | undefined,
  config: NotionDomRouterPluginOptions
) {
  const mergedConfig = {
    ...{
      slugKey: 'slug',
      basePath: '/blog',
      titleSuffix: '',
      defaultPostIcon: '',
    },
    ...config,
  };

  try {
    if (!notion) {
      if (!mergedConfig.notionApiKey) {
        return Promise.reject(
          new Error(
            'Notion Client has not been instantiated. Please provide the Notion API Key'
          )
        );
      }

      notion = new Client({
        auth: mergedConfig.notionApiKey,
      });
    }

    const posts = await notion.databases.query({
      database_id: mergedConfig.databaseId,
    });

    setupParserAndPluginOptions();

    return Promise.resolve(
      posts.results.map((result) => {
        const postResult = result as unknown as PostResult;
        const frontmatter = processPageProperties(postResult, mergedConfig);

        let cover = '';
        let icon = mergedConfig.defaultPostIcon;

        if (postResult.cover) {
          cover = NotionBlocksHtmlParser.getMarkdownParser().parseFile(
            postResult.cover
          ).url;
        }

        if (postResult.icon) {
          switch (postResult.icon.type) {
            case 'emoji':
              icon = postResult.icon.emoji;
              break;
            case 'external':
            case 'file':
              icon = NotionBlocksHtmlParser.getMarkdownParser().parseFile(
                postResult.icon
              ).url;
              break;
          }
        }

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
            cover,
            icon,
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

async function notionDomPlugin(dom: unknown, route: HandledRoute | undefined) {
  if (!route) return dom;

  const postId = route.data?.['id'];

  if (!notion) {
    log(yellow(`Notion Client not found. Skipping ${route.route}`));
    return Promise.resolve(dom);
  }

  if (!postId) {
    log(yellow(`Post ID not found. Skipping ${route.route}`));
    return Promise.resolve(dom);
  }

  try {
    const blocks = await notion.blocks.children.list({
      block_id: postId,
    });
    if (!blocks || !blocks.results.length) {
      log(yellow(`Post does not have any blocks. Skipping ${route.route}`));
      return Promise.resolve(dom);
    }

    return injectHtml(dom, htmlParser.parse(blocks.results as Blocks), route);
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
