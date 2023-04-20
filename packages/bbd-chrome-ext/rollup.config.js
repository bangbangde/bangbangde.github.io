// rollup.config.js
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: 'scripts/service-worker.js',
    output: {
      file: 'dist/service-worker.js',
      format: 'iife'
    },
    plugins: [
      del({ targets: 'dist/*' }),
      resolve(),
      commonjs(),
      json(),
      production && terser(),
      // copy({
      //   targets: [
      //     { src: 'src/popup.html', dest: 'dist' },
      //     { src: 'src/manifest.json', dest: 'dist' },
      //     { src: 'src/images/*', dest: 'dist/images' },
      //   ],
      //   verbose: true,
      //   hook: 'writeBundle'
      // }),
    ],
  },
  {
    input: 'scripts/content-script.js',
    output: {
      file: 'dist/content-script.js',
      format: 'iife'
    },
    plugins: [
      resolve(),
      commonjs(),
      json(),
      production && terser(),
    ],
  },
  {
    input: 'src/inject-script.js',
    output: {
      file: 'dist/inject-script.js',
      format: 'iife'
    },
    plugins: [
      resolve(),
      commonjs(),
      json(),
      production && terser(),
      copy({
        targets: [
          { src: 'src/inject.html', dest: 'dist' },
        ],
        verbose: true,
        hook: 'writeBundle'
      }),
    ],
  },
];
