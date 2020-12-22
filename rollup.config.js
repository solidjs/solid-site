import postcss from 'postcss';

import url from '@rollup/plugin-url';
import babel from '@rollup/plugin-babel';
import cjs from '@rollup/plugin-commonjs';
import hotcss from 'rollup-plugin-hot-css';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import staticFiles from 'rollup-plugin-static-files';

const isProd = process.env.NODE_ENV === 'production';
const extensions = ['.ts', '.tsx', '.jsx', '.js', '.json', '.svg', '.css'];

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: './src/main.tsx',
  output: {
    dir: 'dist',
    format: 'esm',
    entryFileNames: '[name].[hash].js',
    assetFileNames: '[name].[hash][extname]',
  },
  preserveEntrySignatures: false,
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    hotcss({
      hot: !isProd,
      filename: 'styles.css',
      loaders: ['css', postCSSLoader],
    }),
    babel({
      extensions,
      babelHelpers: 'bundled',
      presets: ['babel-preset-solid', '@babel/preset-typescript'],
    }),
    cjs({ extensions }),
    resolve({ extensions, browser: true }),
    url(),
  ],
};

if (isProd) {
  config.plugins = config.plugins.concat([
    staticFiles({
      include: ['./public'],
    }),
    terser({
      compress: {
        global_defs: {
          module: false,
        },
      },
    }),
  ]);
}

function postCSSLoader(input) {
  return postcss(require('tailwindcss'), require('autoprefixer'), require('postcss-font-base64'))
    .process(input.code, { from: undefined })
    .then((res) => {
      return {
        code: res.css,
        map: res.map && res.map.toJSON(),
      };
    });
}

export default config;
