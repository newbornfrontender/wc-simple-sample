import resolve from 'rollup-plugin-node-resolve';

import html from './packages/rollup-plugin-html/index.js';

export default {
  input: ['components/test.js'],

  output: {
    format: 'esm',
    dir: 'public/components',
    preferConst: true,
  },

  plugins: [
    resolve({
      jsnext: true,
      browser: true,
      modulesOnly: true,
    }),

    html(),
  ],
};
