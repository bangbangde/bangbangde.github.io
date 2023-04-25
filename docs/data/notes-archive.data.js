import { createContentLoader } from 'vitepress';
import { getGitTimestamp } from "../../utils/getGitTimestamp.mjs";
import path from "node:path";

export default createContentLoader('docs/notes/**/*.md', {
  includeSrc: false, // include raw markdown source?
  render: false,     // include rendered full page HTML?
  excerpt: false,    // include excerpt?
  transform(rawData) {
    // map, sort, or filter the raw data as you wish.
    // the final result is what will be shipped to the client.
    return Promise.allSettled(
      rawData.filter(page => !page.url.endsWith('index.html')).map(async page => {
        page.filePath = path.resolve(page.url.replace('html', 'md').slice(1));
        try {
          page.gitTimestamp = await getGitTimestamp(page.filePath);
        } catch (err) {
          console.error(err)
        }
        return page;
      })
    )
  }
})