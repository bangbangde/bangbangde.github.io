import { resolve, join } from "node:path";
import { exec } from "node:child_process";
import fs from "node:fs";
import { getDateStr } from "../utils/getDateStr.mjs";
import { __dirname } from "../utils/path.mjs";

const filename = process.argv[2] || getDateStr(null, 2);
const dir = resolve(__dirname, '..',  'docs', 'notes');
const filePath = join(dir, `${filename}`);
const dateStr = getDateStr(null, 2);

function writeFile(file) {
  if (fs.existsSync(file + '.md')) {
    return writeFile(file + '_new');
  }
  file += '.md';
  const content = `---
title: 未命名
descripttion: ""
tags: []
categories: []
created: ${dateStr}
updated: ${dateStr}
draft: true
---`
  console.log('create note success:\n', file, '\n',content);
  exec(`echo '${content}' > ${file}`);
}

writeFile(filePath)