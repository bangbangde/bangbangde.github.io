const { resolve, join } = require("path");
const { exec } = require("child_process");
const generate = require("../templates/new-article");
const { DateFMT } = require("../util");
 
const {yyyy, MM, dd, hh, mm, ss} = DateFMT();

const dir = resolve(__dirname, '..',  'docs');
const filePath = join(dir, `_${yyyy}${MM}${dd}-${hh}${mm}${ss}.md`);
const content = generate();

exec(`echo '${content}' > ${filePath}`);
console.log('created file:', filePath);