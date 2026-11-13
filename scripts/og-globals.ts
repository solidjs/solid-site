import { createRequire } from "node:module";
import { dirname } from "node:path";

/**
 * @vercel/og's Node bundle inlines harfbuzz's emscripten loader, which expects CommonJS globals: `require`, and
 * `__dirname` pointing at the folder that holds hb.wasm. Resolve it through the package chain. Used by
 * generate-og.ts (build) and the dev middleware in vite.config.ts.
 */
export function installOgGlobals(): void {
  const req = createRequire(import.meta.url);
  const ogp = dirname(req.resolve("@solidjs/ogp/package.json"));
  const og = dirname(createRequire(`${ogp}/`).resolve("@vercel/og/package.json"));
  const harfbuzz = dirname(createRequire(`${og}/`).resolve("harfbuzzjs/package.json"));
  (globalThis as Record<string, unknown>).require ??= req;
  (globalThis as Record<string, unknown>).__dirname ??= `${harfbuzz}/`;
}
