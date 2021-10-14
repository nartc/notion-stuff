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

