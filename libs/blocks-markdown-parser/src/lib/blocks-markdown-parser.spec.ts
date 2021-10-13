import { NotionBlocksMarkdownParser } from './blocks-markdown-parser';

describe(NotionBlocksMarkdownParser.name, () => {
  it('should work', () => {
    expect(NotionBlocksMarkdownParser.getInstance()).toBeTruthy();
  });
});
