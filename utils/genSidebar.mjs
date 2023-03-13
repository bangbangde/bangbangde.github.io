import fs from 'node:fs'
import fg from 'fast-glob';
import path from "node:path";
import parseFrontmatter from 'gray-matter';
import { matchFilePath } from "./matchFilePath.mjs";
import { __dirname } from "./path.mjs";

/**
 * 遍历 docs/notes 下指定目录的 md 文件，获取其 title 和 url
 * TOTO: 处理动态路由文件
 * @param {*} pattern
 * @returns 
 */
export const genSideBar = (srcDir, pattern) => {
  const cwd = path.join(srcDir, pattern);
  return fg.sync(pattern, {
    cwd
   }).map((file) => {
    file = path.join(cwd, file);
    const fileContent = fs.readFileSync(file, 'utf-8');
    const { data: { title, draft } } = parseFrontmatter(fileContent);
    const { title: titleMatch, url } = matchFilePath(file);
    return {
      text: title || titleMatch,
      draft,
      link: url
    }
  }).filter(({draft}) => !draft);
}