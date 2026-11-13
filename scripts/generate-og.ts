/**
 * Renders one Open Graph PNG per page into dist/client/og/ with @solidjs/ogp (satori + resvg).
 * Wired as part of "postbuild". @solidjs/ogp normally renders on demand through server functions, which need
 * an SSR server; this site is static on Cloudflare, so we call its server API at build time instead.
 * Run `pnpm og` after `vite build` to regenerate the images alone.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import solid from "@solidjs/vite-plugin";
import { createServer } from "vite";
import { installOgGlobals } from "./og-globals.ts";

const root = fileURLToPath(new URL("..", import.meta.url));
installOgGlobals();

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
