import path from "node:path";
import { fileURLToPath } from "node:url";
import copy from 'rollup-plugin-copy';
import { deleteSync } from 'del';

const production = !process.env.ROLLUP_WATCH;
const resolve = (...args) => path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ...args
);

export default [
  {
    input: [
      resolve('src/service-worker.js'),
      resolve('src/content-script.js'),
      resolve('src/popup.js'),
    ],
    output: {
      dir: 'dist/scripts',
      format: 'es'
    },
    plugins: [
      deleteSync('dist/*'),
      copy({
        targets: [
          { src: 'src/styles', dest: 'dist' },
          { src: 'src/icons', dest: 'dist' },
          { src: 'src/ui/*', dest: 'dist/ui' },
          { src: 'src/manifest.json', dest: 'dist' }
        ]
      }),
    ],
  },
  {
    input: [
      resolve('src/installHooks.js')
    ],
    output: {
      dir: 'dist/scripts',
      format: 'iife'
    },
  }
];
