/*************************************************
 *  自动生成 md 文件                              *
 *  接收单个或多个 文件路径 参数                   *
 *  自动判断是否添加 .md 后缀                     *
 * **********************************************
 * 
 * # 斜线开头表示在 ./docs 目录下创建
 * node createNote.mjs /cheatsheets/js 
 * 
 * # 否则表示在 ./docs/notes 目录下创建
 * node createNote.mjs css/font
 * 
 * # 支持一次创建多篇笔记
 * node createNote.mjs css/font /cheatsheets/js
 * 
 **********************************************/

import path, { resolve, join } from "node:path";
// import { exec } from "node:child_process";
import fs from "node:fs";
import { getDateStr } from "../utils/getDateStr.mjs";
import { __dirname } from "../utils/path.mjs";

const date = new Date();
const dateStr = getDateStr(date, 2);

const filepaths = process.argv.slice(2);
if (filepaths.length === 0) {
  filepaths[0] = getDateStr(date, 3);
}

filepaths.map(v => {
  if (!v.endsWith('.md')) {
    v += '.md'
  }

  if (v.startsWith('/')) {
    return { file: resolve(__dirname, '..',  'docs', v.slice(1)), name: v.replace(/\.md$/, '') }
  } else {
    return { file: resolve(__dirname, '..',  'docs', 'notes', v), name: 'notes/' + v.replace(/\.md$/, '') }
  }
}).forEach(path => {
  writeFile(path);
})

function writeFile({file, name}) {

  if (fs.existsSync(file)) {
    // 文件已存在则使用新的名字尝试
    return writeFile(file.replace('.md', '_new.md'));
  }
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true});
  }

  const content = `---
title: "${name}"
descripttion: ""
tags: []
categories: []
created: "${dateStr}"
updated: "${dateStr}"
draft: true
---
# ${name}
::: warning
This is a draft.
:::

`

  fs.writeFileSync(file, content);
}