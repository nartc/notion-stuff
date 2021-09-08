import { NotionBlocksHtmlParser } from './blocks-html-parser';
import type { NotionBlocksHtmlParserOptions } from './interfaces';

describe(NotionBlocksHtmlParser.name, () => {
  let parser: NotionBlocksHtmlParser;

  function setup(options: NotionBlocksHtmlParserOptions = {}) {
    parser = NotionBlocksHtmlParser.getInstance(options);
  }

  it('should create instance', () => {
    setup();
    expect(parser).toBeTruthy();
  });

  it('should create ONLY one instance', () => {
    setup();
    const instance = NotionBlocksHtmlParser.getInstance();

    expect(instance).toBe(parser);
  });
});
