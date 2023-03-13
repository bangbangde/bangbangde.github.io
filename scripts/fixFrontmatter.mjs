import fs from 'node:fs'
import fg from 'fast-glob';
import parseFrontmatter from 'gray-matter';
import { getDateStr } from '../utils/getDateStr.mjs';

fg.sync('docs/notes/**/*.md').forEach((file) => {
  const fileContent = fs.readFileSync(file, 'utf-8');
  const { data, content } = parseFrontmatter(fileContent);
  const { title, description, tags, categories, created, updated } = data;

  if ( title && description && tags && categories && created && updated ) return;

  const dateFixed = {
    title: "",
    description: "",
    tags: [],
    categories: [],
    created: getDateStr(),
    updated: getDateStr(),
    ...data
  }
  const result = parseFrontmatter.stringify(content, dateFixed);
  fs.writeFile(file, result, () => {});
})