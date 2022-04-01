import type {
  PostResult,
  PropertyValueFormula,
  PropertyValueRollup,
  PropertyValueSelect,
  PropertyValueUser,
} from '@notion-stuff/v4-types';
import type { NotionDomRouterPluginOptions } from './plugin-options';

import { camelize } from './utils';
import { GetPagePropertyResponse } from '@notionhq/client/build/src/api-endpoints';

export function processPageProperties(
  post: PostResult,
  options: NotionDomRouterPluginOptions
) {
  if (options.postResultProcessor) {
    return options.postResultProcessor(post, options, parsePropertyValue);
  }

  const frontmatter: Record<string, unknown> = { published: false };

  for (const [propertyKey, propertyValue] of Object.entries(post.properties)) {
    const camelizedKey = camelize(propertyKey);
    frontmatter[camelizedKey] = parsePropertyValue(
      propertyValue as unknown as GetPagePropertyResponse
    );

    if (!options.isPublished && propertyKey.toLowerCase() === 'status') {
      frontmatter.published =
        (
          propertyValue as unknown as PropertyValueSelect
        ).select?.name.toLowerCase() === 'published';
    }
  }

  if (options.isPublished) {
    frontmatter.published = options.isPublished(frontmatter);
  }

  return frontmatter;
}

function parsePropertyValue(propertyValue: GetPagePropertyResponse) {
  switch (propertyValue.type) {
    case 'title':
      return propertyValue.title[0].plain_text;
    case 'rich_text':
      return propertyValue.rich_text[0].plain_text;
    case 'number':
      return propertyValue.number;
    case 'select':
      return propertyValue.select?.name;
    case 'multi_select':
      return propertyValue.multi_select.map(
        (multiSelectOption) => multiSelectOption.name
      );
    case 'date':
      if (!propertyValue?.date) return null;
      if (propertyValue.date.end) {
        return [
          new Date(propertyValue.date.start),
          new Date(propertyValue.date.end),
        ];
      }
      return new Date(propertyValue.date.start);
    case 'formula':
      return formularize(propertyValue);
    case 'rollup':
      return rollup(propertyValue);
    case 'people':
      return personify(propertyValue.people as PropertyValueUser);
    case 'files':
      return propertyValue.files.map((fileWithName) => fileWithName.name);
    case 'checkbox':
      return propertyValue.checkbox;
    case 'url':
      return propertyValue.url;
    case 'email':
      return propertyValue.email;
    case 'phone_number':
      return propertyValue.phone_number;
    case 'created_time':
      return new Date(propertyValue.created_time);
    case 'created_by':
      return personify(propertyValue.created_by as PropertyValueUser);
    case 'last_edited_time':
      return new Date(propertyValue.last_edited_time);
    case 'last_edited_by':
      return personify(propertyValue.last_edited_by as PropertyValueUser);
  }
}

function formularize(formulaValue: PropertyValueFormula) {
  let value: unknown;

  switch (formulaValue.formula.type) {
    case 'string':
      value = formulaValue.formula.string;
      break;
    case 'number':
      value = formulaValue.formula.number;
      break;
    case 'boolean':
      value = formulaValue.formula.boolean;
      break;
    case 'date':
      if (formulaValue.formula.date?.end) {
        value = [
          formulaValue.formula.date?.start,
          formulaValue.formula.date?.end,
        ];
      } else {
        value = formulaValue.formula.date?.start;
      }
      break;
  }
  return value;
}

function rollup(rollupValue: PropertyValueRollup) {
  let value: unknown;

  switch (rollupValue.rollup.type) {
    case 'number':
      value = rollupValue.rollup.number;
      break;
    case 'date':
      if (rollupValue.rollup.date?.end) {
        value = [rollupValue.rollup.date?.start, rollupValue.rollup.date?.end];
      } else {
        value = rollupValue.rollup.date?.start;
      }
      break;
    case 'array':
      value = rollupValue.rollup.array.map((propertyValue) =>
        parsePropertyValue(propertyValue as unknown as GetPagePropertyResponse)
      );
      break;
  }

  return value;
}

function personify(user: PropertyValueUser) {
  return {
    name: user.name,
    avatar: user.avatar_url,
  };
}
