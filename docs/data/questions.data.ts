import fs from 'node:fs';
import path from 'node:path';
import yaml from "js-yaml";
import { fileURLToPath } from 'node:url';

export default {
  async load() {
    const data = yaml.load(fs.readFileSync(path.resolve(fileURLToPath(import.meta.url), '..', './questions.yml'), 'utf8'));
    console.log(data);
    return data;
  }
}