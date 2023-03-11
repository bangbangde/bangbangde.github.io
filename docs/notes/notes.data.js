import { spawn } from 'node:child_process'
import fs from 'node:fs'
import parseFrontmatter from 'gray-matter'

function getGitTimestamp(file) {
  return new Promise((resolve, reject) => {
    const child = spawn('git', ['log', '-1', '--pretty="%ci"', file])
    let output = ''
    child.stdout.on('data', (d) => (output += String(d)))
    child.on('close', () => {
      resolve(+new Date(output))
    })
    child.on('error', reject)
  })
}

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
    );
  }
}