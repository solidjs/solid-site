import { optimize as svgOptimize } from 'svgo';
import { readFile, writeFile } from 'fs/promises';
import glob from 'fast-glob';

const svgFiles = await glob(['./dist/**/*.svg'], {
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
);
