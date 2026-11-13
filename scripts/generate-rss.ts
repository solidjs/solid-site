/**
 * Writes public/rss.xml from src/blog/posts.ts. Bundles the TS sources with esbuild (already a
 * dependency of Vite) so no TS loader is needed.
 *
 * Wire as: "prebuild": "node scripts/generate-rss.ts"   (Node >= 22.18 strips types natively)
 */
import { build } from "esbuild";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = new URL("..", import.meta.url).pathname;
const dir = await mkdtemp(join(tmpdir(), "rss-"));
const outfile = join(dir, "rss.mjs");
try {
  await build({
    entryPoints: [join(root, "src/blog/rss.ts")],
    bundle: true,
    platform: "node",
    format: "esm",
    outfile,
    logLevel: "silent",
  });
  const { buildRss } = (await import(pathToFileURL(outfile).href)) as { buildRss: () => string };
  await mkdir(join(root, "public"), { recursive: true });
  await writeFile(join(root, "public/rss.xml"), buildRss());
  console.log("wrote public/rss.xml");
} finally {
  await rm(dir, { recursive: true, force: true });
}
