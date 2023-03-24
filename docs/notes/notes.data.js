import fs from 'node:fs'
import parseFrontmatter from 'gray-matter'
import { getGitTimestamp } from "../../utils/getGitTimestamp.mjs";

export default {
  watch: ['./**/*.md'],
  async load(watchedFiles) {
    return Promise.all(
      watchedFiles.map(async (file) => {
        const content = fs.readFileSync(file, 'utf-8');
        const gitTimestamp = await getGitTimestamp(file);
        const { data } = parseFrontmatter(content);
        data.updated = new Date(data.updated).getTime();
        data.created = new Date(data.created).getTime();
        if (Number.isNaN(data.updated)) {
          data.updated = null;
        }
        if (Number.isNaN(data.created)) {
          data.created = null;
        }
        return {
          file,
          data,
          gitTimestamp
        }
      })
    ).then(files => files.filter(({data}) => data.layout === undefined || data.layout === 'docs'));
  }
}