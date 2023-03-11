import fs from 'node:fs'
import fg from 'fast-glob';
import parseFrontmatter from 'gray-matter';
import { getDateStr } from '../utils/getDateStr.mjs';

// import path from "node:path";
// import { fileURLToPath } from 'node:url';
// const __dirname = path.dirname(fileURLToPath(import.meta.url));


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