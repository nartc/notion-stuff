

## [6.0.0](https://github.com/nartc/notion-stuff/compare/5.1.0...6.0.0) (2022-04-01)


### ⚠ BREAKING CHANGES

* **repo:** @notionhq/client has been updated to 1.0.0

### Features

* **repo:** update notion client to 1.0.0 ([497a88f](https://github.com/nartc/notion-stuff/commit/497a88f0f5fd1b3e30727eecc56207c6056e2581))


### Bug Fixes

* **html:** only set mdToHtmlOptions.highlight if not already passed in ([0349311](https://github.com/nartc/notion-stuff/commit/034931181eb1ef70a0cf6dd7a8918510f3bc2627)), closes [#11](https://github.com/nartc/notion-stuff/issues/11)
* **markdown:** adjust markdown parser type for 1.0.0 ([3163924](https://github.com/nartc/notion-stuff/commit/31639247f4afbea44bf4868ccbd01f5ad7b7f26d))
* **scully:** adjust scully plugin type for 1.0.0 ([cb462da](https://github.com/nartc/notion-stuff/commit/cb462dae75477c4009a8355cd50c0892ae5b8213))
* **v4-types:** add PostResult ([f15c938](https://github.com/nartc/notion-stuff/commit/f15c9381d6b39ea5a8e7050b6e531e5c1a7945b6))


### Documentations

* add @Panthaaaa as a contributor ([4edea81](https://github.com/nartc/notion-stuff/commit/4edea81349b9dfc5a92a3f5207f194153613cf2a))## [5.1.0](https://github.com/nartc/notion-stuff/compare/5.0.0...5.1.0) (2021-12-26)


### Features

* **html:** render nested markdown in html blocks ([3e0f241](https://github.com/nartc/notion-stuff/commit/3e0f24115701097fb08f67360663ac168decc713))

## [5.0.0](https://github.com/nartc/notion-stuff/compare/4.0.0...5.0.0) (2021-12-25)


### ⚠ BREAKING CHANGES

* **v4-types:** - 0.4.11 adds aliases that do not conform with other existing aliases in QueryResult type leading to
breaking changes

### Features

* **v4-types:** update 0.4.11 ([caf4b59](https://github.com/nartc/notion-stuff/commit/caf4b5978e006f4103c58dc6f91e431050f65de4))

## [4.0.0](https://github.com/nartc/notion-stuff/compare/3.2.0...4.0.0) (2021-11-11)

### ⚠ BREAKING CHANGES

* **html:** - Marked 4 no longer provides default import
* **v4-types:** - Update notionhq/client to 0.4.6

### Features

* **html:** adapt to Marked 4 ([ad8f1fe](https://github.com/nartc/notion-stuff/commit/ad8f1fe09bca72cadf1dccf7fc344e0bef0b1c57))
* **markdown:** update notionhq/client 0.4.6 ([66c8f64](https://github.com/nartc/notion-stuff/commit/66c8f645fa5c12205b2ca35fd1ff20bf42248ea1))
* **scully:** update notionhq/client 0.4.6 ([cb7fc51](https://github.com/nartc/notion-stuff/commit/cb7fc51266e6aee96ec5812b055c7d89fbff2bf0))
* **v4-types:** add Column and ColumnList ([009ebaa](https://github.com/nartc/notion-stuff/commit/009ebaab605ec49f9f22560542a48f57bac8cf84)), closes [#8](https://github.com/nartc/notion-stuff/issues/8)

## [3.2.0](https://github.com/nartc/notion-stuff/compare/3.1.3...3.2.0) (2021-10-28)


### Features

* **markdown:** add support for empty paragraph with non-breaking space ([4531ae0](https://github.com/nartc/notion-stuff/commit/4531ae0877fe70761cb32d277deff406bf9fddfe))


### Cleanup

* **markdown:** reformat ([543597f](https://github.com/nartc/notion-stuff/commit/543597f82e74953305deb36c1b2e40c9304a0978))


### Documentations

* add @MarcARoberge as a contributor ([0a62355](https://github.com/nartc/notion-stuff/commit/0a62355d538d67c9176a341059ccf148beeafb4d))

### [3.1.3](https://github.com/nartc/notion-stuff/compare/3.1.2...3.1.3) (2021-10-21)


### Bug Fixes

* **html:** handle undefined language param ([#2](https://github.com/nartc/notion-stuff/issues/2)) ([a77409a](https://github.com/nartc/notion-stuff/commit/a77409a2b4f1393d25d0d7982059d687269cd0d1))


### Documentations

* add [@barbados-clemens](https://github.com/barbados-clemens) as a contributor ([4b81cba](https://github.com/nartc/notion-stuff/commit/4b81cba2ad92f68d5525a1f9f631f074852f5301))

### [3.1.2](https://github.com/nartc/notion-stuff/compare/3.1.1...3.1.2) (2021-10-21)


### Bug Fixes

* **scully:** null check cover and icon before processing ([c034ef6](https://github.com/nartc/notion-stuff/commit/c034ef686992f5152d352a4e734d828a4ddba1ff))

### [3.1.1](https://github.com/nartc/notion-stuff/compare/3.1.0...3.1.1) (2021-10-21)


### Bug Fixes

* **scully:** ensure to get the plugin options after plugin has been registered ([4e9571e](https://github.com/nartc/notion-stuff/commit/4e9571e5e88587e677231cd190fa0d74621fea76))

## [3.1.0](https://github.com/nartc/notion-stuff/compare/3.0.0...3.1.0) (2021-10-20)


### Features

* bump notionClient dep ([cca14f4](https://github.com/nartc/notion-stuff/commit/cca14f4556128bc997b24dbad0e30515ccb4c4e0))

## [3.0.0](https://github.com/nartc/notion-stuff/compare/2.4.0...3.0.0) (2021-10-20)


### ⚠ BREAKING CHANGES

* **scully:** - `NotionPluginOptions` -> `NotionDomPluginOptions`

### Features

* **html:** expose MarkdownParser ([600ed9c](https://github.com/nartc/notion-stuff/commit/600ed9cf97e3b0cb8133f9dbe273ab9162797925))
* **markdown:** support Divider now ([37116e7](https://github.com/nartc/notion-stuff/commit/37116e74cb9b23c881403d746b90788e8363aefd))
* **scully:** support icon, cover, and more customization for Page Properties ([2b9e1ac](https://github.com/nartc/notion-stuff/commit/2b9e1ac27c0e3eb7d6da60ddaca372e9b18358a7))


### Bug Fixes

* **v4-types:** widen file type for cover ([26868bc](https://github.com/nartc/notion-stuff/commit/26868bc2fd408b4815643283942ee592dc575008))


### Documentations

* **scully:** add info about database column naming conversion/convention ([#1](https://github.com/nartc/notion-stuff/issues/1)) ([c52b178](https://github.com/nartc/notion-stuff/commit/c52b178f07275f89b6eb8e08406d20e8de2184fa))

## [2.4.0](https://github.com/nartc/notion-stuff/compare/2.3.2...2.4.0) (2021-10-18)


### Features

* **markdown:** add youtube video processor to process youtube url ([6e4f99c](https://github.com/nartc/notion-stuff/commit/6e4f99cd66ce2a2716f2b3b7e2fd7645be160b9b))


### Bug Fixes

* **markdown:** change paragraph parser to have EOL before and after ([2ab15c8](https://github.com/nartc/notion-stuff/commit/2ab15c86f64fb197bcbf7da817537274d2fe215e))

### [2.3.2](https://github.com/nartc/notion-stuff/compare/2.3.1...2.3.2) (2021-10-16)


### Bug Fixes

* **html:** coerce plain text language to none ([ca9057a](https://github.com/nartc/notion-stuff/commit/ca9057a243501636682c2e58aaf153023b0f51fa))

### [2.3.1](https://github.com/nartc/notion-stuff/compare/2.3.0...2.3.1) (2021-10-16)


### Bug Fixes

* **markdown:** parse callout with div ([50d0537](https://github.com/nartc/notion-stuff/commit/50d053745937d70f03361783fbcbfe2200136017))

## [2.3.0](https://github.com/nartc/notion-stuff/compare/2.2.2...2.3.0) (2021-10-14)


### Features

* **scully:** instantiate a global notion instead ([686dec7](https://github.com/nartc/notion-stuff/commit/686dec7914a6d9b8b36a69fed6d2430ae20a551b))

### [2.2.2](https://github.com/nartc/notion-stuff/compare/2.2.1...2.2.2) (2021-10-14)


### Bug Fixes

* **markdown:** add EOL_MD to before blockquote ([fcc90cf](https://github.com/nartc/notion-stuff/commit/fcc90cf751676450de0f7dedf1db4e3ba059d80a))

### [2.2.1](https://github.com/nartc/notion-stuff/compare/2.2.0...2.2.1) (2021-10-13)


### Documentations

* update README for v4-types ([69d7898](https://github.com/nartc/notion-stuff/commit/69d7898114654c8776354e8ffa1cab51ddd14158))

## [2.2.0](https://github.com/nartc/notion-stuff/compare/2.1.1...2.2.0) (2021-10-13)


### Features

* **html:** use v4-types and update to notion 0.4 ([82bf4d7](https://github.com/nartc/notion-stuff/commit/82bf4d70cc2eee10d6eeeeefd0743c119f7bfd85))
* **markdown:** use v4-types and update to notion 0.4 ([1431612](https://github.com/nartc/notion-stuff/commit/143161244c1543a119d517baa7646dc0bd9c5bc4))
* **scully:** use v4-types and update to notion 0.4 ([40c3e16](https://github.com/nartc/notion-stuff/commit/40c3e1603909b3130abf6a7e1a0f97d558af5080))
* **v4-types:** add v4-types ([9806b41](https://github.com/nartc/notion-stuff/commit/9806b41b0168764d7ff2586749e5164322313683))

### [2.1.1](https://github.com/nartc/notion-stuff/compare/2.1.0...2.1.1) (2021-10-03)


### Bug Fixes

* **markdown:** annotate text first before annotate link ([0159038](https://github.com/nartc/notion-stuff/commit/01590384b1ca420db9ca6c29e8594ebfadc400d5))

## [2.1.0](https://github.com/nartc/notion-stuff/compare/2.0.5...2.1.0) (2021-10-02)


### Features

* **markdown:** add imageAsFigure to parser options to parse image as figure element ([ffce05a](https://github.com/nartc/notion-stuff/commit/ffce05a94adb3d130d70572cdcdb8bb57de0e12f))


### Bug Fixes

* **html:** use Partial for MarkdownParserOptions instead ([0224a5e](https://github.com/nartc/notion-stuff/commit/0224a5ec3b55b3bdf9751c462a035cecf2238a04))

### [2.0.5](https://github.com/nartc/notion-stuff/compare/2.0.4...2.0.5) (2021-10-02)


### Bug Fixes

* **html:** add codeTransformer to return correct template for correct highlighter ([ef4a8fd](https://github.com/nartc/notion-stuff/commit/ef4a8fd9540f6d86aef5af4db846565153913597))

### [2.0.4](https://github.com/nartc/notion-stuff/compare/2.0.3...2.0.4) (2021-10-02)


### Bug Fixes

* **markdown:** adjust format of codeBlockParser ([7c881a5](https://github.com/nartc/notion-stuff/commit/7c881a5a24402ad9dc9e2da6833014d5ad3d6902))

### [2.0.3](https://github.com/nartc/notion-stuff/compare/2.0.2...2.0.3) (2021-10-02)


### Bug Fixes

* **markdown:** double EOL for paragraph and adjust CodeBlock Parser ([2a4f122](https://github.com/nartc/notion-stuff/commit/2a4f122897d9bd515f9a44f11af0c06fa10b1bf8))

### [2.0.2](https://github.com/nartc/notion-stuff/compare/2.0.1...2.0.2) (2021-10-01)


### Bug Fixes

* **markdown:** null check children before recusive call ([6d96a01](https://github.com/nartc/notion-stuff/commit/6d96a019ed4e51fbc8ab12bb6a70408cbaa718b1))

### [2.0.1](https://github.com/nartc/notion-stuff/compare/2.0.0...2.0.1) (2021-10-01)


### Bug Fixes

* **scully:** move scully to peerDep instead ([7171397](https://github.com/nartc/notion-stuff/commit/7171397f995f975f8f096124f84c02cd99762826))


### Documentations

* **html:** fix highlight.js dep ([45fa3db](https://github.com/nartc/notion-stuff/commit/45fa3db9874c872219d3d7d1fe9931a1dd7ca831))

## [2.0.0](https://github.com/nartc/notion-stuff/compare/1.0.4...2.0.0) (2021-09-30)


### ⚠ BREAKING CHANGES

* **scully:** Scully version has been bumped to v2
* **html:** HTML Parser now uses Markdown parser. Please check README for details

### Features

* **html:** use Markdown parser ([9882e90](https://github.com/nartc/notion-stuff/commit/9882e9071d9034aa5ba33306689ad2daa36ed8a8))
* **markdown:** add markdown parser ([6ed8398](https://github.com/nartc/notion-stuff/commit/6ed8398d7ef9c07c5676452b99f9427662b0ab35))
* **scully:** bump scully version ([025c3a1](https://github.com/nartc/notion-stuff/commit/025c3a1f1425e2d7e9986bfb65e428404db4682c))

### [1.0.4](https://github.com/nartc/notion-stuff/compare/1.0.3...1.0.4) (2021-09-24)


### Bug Fixes

* **scully:** adjust Formula and RollUp block type to match NotionAPi ([53e895c](https://github.com/nartc/notion-stuff/commit/53e895c1fdc00e78296376e4abc6a92ffa5616b5))

### [1.0.3](https://github.com/nartc/notion-stuff/compare/1.0.2...1.0.3) (2021-09-08)


### Bug Fixes

* **html:** fix list items being undefined ([1b95be1](https://github.com/nartc/notion-stuff/commit/1b95be1e5f382cef6ee79f068eba436c1d4f2b66))

### [1.0.2](https://github.com/nartc/notion-stuff/compare/1.0.1...1.0.2) (2021-09-08)


### Bug Fixes

* **html:** grab plain text as plain image caption instead of captionTransformer ([2e36175](https://github.com/nartc/notion-stuff/commit/2e36175f708200e33824dbd8b8005d4dd3a2b09a))

### [1.0.1](https://github.com/nartc/notion-stuff/compare/1.0.0...1.0.1) (2021-09-08)


### Bug Fixes

* **html:** use image caption as alt if available. fix "this" issue ([5831dac](https://github.com/nartc/notion-stuff/commit/5831dac6b3f53e570e69e488d62341f3881be780))

## 1.0.0 (2021-09-08)


### Features

* **html:** add HTML parser ([7fa11d9](https://github.com/nartc/notion-stuff/commit/7fa11d92404ba9ffcf115150a90cfe27a5be29c0))
* **scully:** add Scully plugin ([7c81cef](https://github.com/nartc/notion-stuff/commit/7c81cef1041499bf7889f84e0c649c21802745e2))


### Documentations

* add [@nartc](https://github.com/nartc) as a contributor ([e1ea76f](https://github.com/nartc/notion-stuff/commit/e1ea76f2b00847e7e4375d15b62511fb404a39f4))
* add README ([c981380](https://github.com/nartc/notion-stuff/commit/c981380ad1e7df2bbe7b60645eb0c74fb48b312a))