import fs from 'node:fs'
import parseFrontmatter from 'gray-matter'
import { getGitTimestamp } from "../../utils/getGitTimestamp.mjs";

export default {
  watch: ['./**/*.md'],
  async load(watchedFiles) {
    return Promise.all(
      watchedFiles.map(async (file) => {
        const content = fs.readFileSync(file, 'utf-8');
        const lastUpdated = await getGitTimestamp(file);
        const { data } = parseFrontmatter(content)
        return {
          file,
          data,
          lastUpdated
        }
      })
    ).then(files => files.filter(({data}) => data.layout === undefined || data.layout === 'docs'));
  }
}