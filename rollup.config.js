
import nodeResolve from "@rollup/plugin-node-resolve";
import common from "@rollup/plugin-commonjs";
import babel from "rollup-plugin-babel";
import postcss from 'rollup-plugin-postcss';
import del from "rollup-plugin-delete";
import execute from "rollup-plugin-execute";
import autoprefixer from "autoprefixer";
import { terser } from "rollup-plugin-terser";
import livereload from "rollup-plugin-livereload";
import copy from "rollup-plugin-copy-assets";
import path from 'path';

const production = process.env.ROLLUP_WATCH !== 'true';

export default [
  {
    input: "src/server.js",
    output: [
      {
        dir: "lib",
        format: "cjs",
      },
    ],
    external: ["solid-js", "solid-js/dom", "solid-ssr"],
    plugins: [
      del({ targets: "lib/*" }),
      nodeResolve({ preferBuiltins: true }),
      babel({
        presets: [["solid", { generate: "ssr" }]],
      }),
      common(),
      postcss({
        modules: true,
        extensions: ['.css', '.sass', '.scss'],
        output: false,
        extract: true,
        plugins: [ autoprefixer ],
        use: [
          [
            'sass', {
              includePaths: [path.join(__dirname, 'scss')]
            }
          ]
        ]
      }),
      execute("node export.js")
    ],
  },
  {
    input: "src/index.js",
    output: [
      {
        dir: "public",
        format: "esm",
      },
    ],
    plugins: [
      livereload(),
      del({ targets: ["public/*", "!public/*.html", "!public/favicon.ico"] }),
      nodeResolve(),
      babel({
        presets: [["solid", { generate: "hydrate" }]],
      }),
      postcss({
        modules: true,
        extensions: ['.css', '.sass', '.scss'],
        output: false,
        extract: true,
        plugins: [ autoprefixer ],
        use: [
          [
            'sass', {
              includePaths: [path.join(__dirname, 'scss')]
            }
          ]
        ]
      }),
      copy({
        assets: [
          "src/assets"
        ],
      }),
      production && terser()
    ],
  },
];
