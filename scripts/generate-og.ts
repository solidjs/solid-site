/**
 * Renders one Open Graph PNG per page into dist/client/og/ with @solidjs/ogp (satori + resvg).
 * Wired as part of "postbuild". @solidjs/ogp normally renders on demand through server functions, which need
 * an SSR server; this site is static on Cloudflare, so we call its server API at build time instead.
 * Run `pnpm og` after `vite build` to regenerate the images alone.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import solid from "@solidjs/vite-plugin";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const req = createRequire(import.meta.url);

// @vercel/og's Node bundle inlines harfbuzz's emscripten loader, which expects CommonJS globals:
// `require`, and `__dirname` pointing at the folder that holds hb.wasm. Resolve it through the package chain.
const ogp = dirname(req.resolve("@solidjs/ogp/package.json"));
const og = dirname(createRequire(`${ogp}/`).resolve("@vercel/og/package.json"));
const harfbuzz = dirname(createRequire(`${og}/`).resolve("harfbuzzjs/package.json"));
(globalThis as Record<string, unknown>).require ??= req;
(globalThis as Record<string, unknown>).__dirname ??= `${harfbuzz}/`;

const server = await createServer({
  root,
  configFile: false,
  logLevel: "error",
  appType: "custom",
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true, include: [] },
  plugins: [solid({ ssr: true })],
});

try {
  const { ogPages } = (await server.ssrLoadModule("/src/og/pages.ts")) as typeof import("../src/og/pages");
  const { renderAll } = (await server.ssrLoadModule("/src/og/render.tsx")) as typeof import("../src/og/render");
  const rendered = await renderAll(ogPages());
  const outDir = join(root, "dist/client/og");
  for (const [file, png] of rendered) {
    const target = join(outDir, `${file}.png`);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, png);
  }
  console.log(`og: rendered ${rendered.length} image(s) into dist/client/og`);
} finally {
  await server.close();
}
