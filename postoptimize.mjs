import { optimize as svgOptimize } from 'svgo';
import { readFile, writeFile } from 'fs/promises';
import glob from 'fast-glob';
import nodeMinify from '@node-minify/core';
import jsonMinify from '@node-minify/jsonminify';

const svgFiles = await glob(['./dist/**/*.svg'], {
  dot: true,
  cwd: process.cwd(),
  onlyFiles: true,
  absolute: true,
});

const jsonFiles = await glob(['./dist/**/*.json'], {
  dot: true,
  cwd: process.cwd(),
  onlyFiles: true,
  absolute: true,
});

await Promise.all(
  svgFiles.map(async (svgFile) => {
    const svgString = await readFile(svgFile, 'utf8');
    const { data } = await svgOptimize(svgString, {
      path: svgFile,
      multipass: true,
    });
    await writeFile(svgFile, data);
  }),
  jsonFiles.map((jsonFile) =>
    nodeMinify({
      compressor: jsonMinify,
      input: jsonFile,
      output: jsonFile,
    }),
  ),
);
