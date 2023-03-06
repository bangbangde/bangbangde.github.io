const fs = require('fs');
const { resolve } = require('path');

const strLF = fs.readFileSync(resolve(__dirname, 'LF'), 'utf-8');
const strCRLF = fs.readFileSync(resolve(__dirname, 'CRLF'), 'utf-8');
console.log(encodeURI(strLF), strLF.length);
console.log(encodeURI(strCRLF), strCRLF.length);