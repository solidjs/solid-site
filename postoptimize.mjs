import { optimize as svgOptimize } from 'svgo';
import { readFile, writeFile } from 'fs/promises';
import glob from 'fast-glob';

const svgFiles = await glob(['./dist/**/*.svg'], {
  dot: true,
  cwd: process.cwd(),
  onlyFiles: true,
  absolute: true,
});

const svgOptimized = Promise.all(
  svgFiles.map(async (svgFile) => {
    const svgString = await readFile(svgFile, 'utf8');
    const { data } = await svgOptimize(svgString, {
      path: svgFile,
      multipass: true,
    });
    await writeFile(svgFile, data);
  }),
);

import { default as nodeMinify } from '@node-minify/core';
import { default as jsonMinify } from '@node-minify/jsonminify';

const jsonFiles = await glob(['./dist/**/*.json'], {
  dot: true,
  cwd: process.cwd(),
  onlyFiles: true,
  absolute: true,
});

const jsonOtimized = Promise.all(
  jsonFiles.map((jsonFile) =>
    nodeMinify({
      compressor: jsonMinify,
      input: jsonFile,
      output: jsonFile,
    }),
  ),
);

await svgOptimized;
await jsonOtimized;
