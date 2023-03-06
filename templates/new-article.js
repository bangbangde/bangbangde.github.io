const { DateFMT } = require("../util");

function generate(data = {}) {
  const {title = "", tags = [], categories = []} = data;
  const {yyyy, MM, dd, hh, mm, ss} = DateFMT();
  const datetime = `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;

  const content = [
    `---`,
    `title: ${title}`,
    `tags: ${tags.join(' ')}`,
    `categories: ${categories.join(' ')}`,
    `createTime: ${datetime}`,
    `updateTime: ${datetime}`,
    `---`,
    `## `
  ]
  return content.join("\n");
}

module.exports = generate;
