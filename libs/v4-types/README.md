# @notion-stuff/v4-types


This package is to cover the typings of `@notionhq/client@0.4`.

Since v0.4, `@notionhq/client` uses generated typings for their API Responses which breaks all the Interfaces/Types downstream for community packages that depend on those Interfaces/Types. This package aims to address this issue by construct Type Aliases from `@notion/client` API Responses Types.

## Installation

```bash
npm i --save-dev @notion-stuff/v4-types
```
or 
```bash
yarn add --dev @notion-stuff/v4-types
```

## Feature
- [x] Blocks
- [x] Page Properties

If you find anything missing, feel free to create an issue.
