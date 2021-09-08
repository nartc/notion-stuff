# @notion-stuff/scully-plugin-notion

This is a [Scully](https://scully.io) plugin to convert [Notion](https://notion.so) pages to static HTML pages utilizing [@notion-stuff/blocks-html-parser](../blocks-html-parser/README.md)

> [Notion API](https://developers.notion.com/) is currently in beta. There are content types that aren't being supported. Check the Notion API documentations for details

## Features

- [x] Convert Notion pages to static HTML
- [x] Access to Notion page properties as `Frontmatter` (should be `ScullyRoute` from `ScullyRoutesService`)
  - [ ] Customize Notion page properties
- [x] Customize HTML parsers

## Installation

```bash
npm install --save-dev @notion-stuff/scully-plugin-notion
```

> `@notion-stuff/scully-plugin-notion` depends on `@notionhq/client`

## Usage

> Notion integration steps courtesy of [Gatsby Source Notion Plugin author](https://www.gatsbyjs.com/plugins/gatsby-source-notion-api/)

1. Created a Notion integration (sign in to Notion, go to `Settings & Memberships → Integrations → Develop your own integrations`, [short link to the Integrations creation section](https://www.notion.so/my-integrations)). It’s OK to use an internal one. Don’t forget to copy the token:
   ![gif-1](https://files.readme.io/2ec137d-093ad49-create-integration.gif)

2. Go to the database you want to have access to from Scully, and share it with the integration (`Share` → Select the integration in the `Invite` dropdown). Don’t forget the database in the URL. It’s a series of characters after the last slash and before the question mark.
   ![gif-2](https://files.readme.io/0a267dd-share-database-with-integration.gif)

> Here’s a reference: https://www.notion.so/{USER}/**{DATABASE_ID}**?{someotherirrelevantstuff}

3. Your database needs to have the following Page Properties (Table column headers)

| Title                  | Tags         | Description | Status                                    | Slug | Updated At     | Published At   |
| ---------------------- | ------------ | ----------- | ----------------------------------------- | ---- | -------------- | -------------- |
| This should be default | Multi Select | Text        | Select (a `Published` option is required) | Text | Date/Date-Time | Date/Date-Time |

- `Published` status is required because this is being used by the plugin to set the `published` flag for a specific `ScullyRoute`. Although this is required for the plugin to work as expected, your intention (as plugin consumers) to use the `published` flag is totally up to you. 
- `Slug` is utilized to setup the route to the post which is needed to be set manually as of the moment.

4. Configure the plugin in `scully.your-app.config.ts`

```ts
import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { NotionDom, NotionDomRouter, NotionPluginOptions } from '@notion-stuff/scully-plugin-notion';

setPluginConfig('md', { enableSyntaxHighlighting: true });

setPluginConfig(NotionDom, {
  notionBlocksHtmlParserOptions: {
    /**
    ... customer the parser ...
    */
  }
} as NotionPluginOptions)

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'my-project',
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: NotionDomRouter,
      postRenderers: [NotionDom],
      databaseId: 'your-database-id', // required
      notionApiKey: 'your-integration-secret', // if this is not set, NOTION_API_KEY environment variable is used
      basePath: '/blog', // optional, should match your route here 
      titleSuffix: '' // optional
    },
  },
};
```
