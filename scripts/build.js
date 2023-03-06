const fs  = require('fs');
const { resolve, join } = require("path");

const marked = require("marked");
const yaml = require('js-yaml');
const pug = require('pug');

const docsDir = resolve(__dirname, "..", "docs");
const outDir = resolve(__dirname, '..', '.out');
const outDocsDir = join(outDir, 'docs');



async function getContent(path) {
  return fs.promises.readFile(path, 'utf8').then(data => {
    const regexp = /^---(?:\n|\r\n)([\s\S]*?)---(?:\n|\r\n)([\s\S]*)$/;
    const match = regexp.exec(data);
    if (match === null) {
      return { meta: null, data: marked.parse(match[2])}
    } else {
      return { meta: yaml.load(match[1]), data: marked.parse(match[2])}
    }
  });
}

function generateOut(path) {
  return getContent(path).then(({meta, data}) => {
    fs.promises.writeFile(join(outDocsDir, meta.title + '.md'), data);
    return meta;
  })
}

function genIndexFile(docsMeta) {
  const content = pug.renderFile(resolve(__dirname, '..', 'templates', 'index.pug'), {
    docsMeta
  });
  fs.promises.writeFile(join(outDir, 'index.html'), content);
}

async function walkDocs() {
  if (!fs.existsSync(outDocsDir)) {
      fs.mkdirSync(outDocsDir, { recursive: true, mode: 0744 });
  }
  try {
    const docsMeta = [];
    const files = await fs.promises.readdir(docsDir);
    const fileLength = files.length;
    files.forEach((file, index) => {
      generateOut(join(docsDir, file)).then(meta => {
        docsMeta.push(meta);
        if (index === fileLength - 1) {
          genIndexFile(docsMeta);
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
}

walkDocs();