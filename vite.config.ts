import { createSolidBase, defineTheme } from "@kobalte/solidbase/config";
import { solidReplVitePlugin } from "@kobalte/solidbase/default-theme/repl.js";
import solid from "@solidjs/vite-plugin";
import { defineConfig, type Plugin } from "vite";
import { DEFAULT_LOCALE, LOCALES, PREFIXED_LOCALES } from "./src/i18n/locales";

/**
 * Serves /og/*.png from the dev server, rendered on first request with the same code as the build, so link-preview
 * tools pointed at `pnpm dev` find the images (they are otherwise only written to dist/ by `pnpm build`).
 */
function ogDevImages(): Plugin {
  let rendered: Promise<Map<string, Uint8Array>> | undefined;
  return {
    name: "og-dev-images",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const match = req.url?.split("?")[0].match(/^\/og\/(.+)\.png$/);
        if (!match) return next();
        try {
          rendered ??= (async () => {
            (await import("./scripts/og-globals")).installOgGlobals();
            const { ogPages } = (await server.ssrLoadModule("/src/og/pages.ts")) as typeof import("./src/og/pages");
            const { renderAll } = (await server.ssrLoadModule("/src/og/render.tsx")) as typeof import("./src/og/render");
            return new Map(await renderAll(ogPages()));
          })();
          const png = (await rendered).get(match[1]);
          if (!png) return next();
          res.setHeader("content-type", "image/png");
          res.setHeader("cache-control", "no-store");
          res.end(Buffer.from(png));
        } catch (error) {
          rendered = undefined;
          next(error);
        }
      });
    },
  };
}

const siteTheme = defineTheme({
  componentsPath: new URL("./src/theme/", import.meta.url).href,
  // Makes solid-repl bundle: scopes its global CSS to .sb-repl, aliases its styled-system, ES workers.
  vite: () => solidReplVitePlugin(),
});

const solidBase = createSolidBase(siteTheme);

/** The site's languages (src/i18n/locales.ts) in SolidBase's shape: it sets <html lang> and the sitemap from them. */
const locales = Object.fromEntries(
  LOCALES.map((l) => [l === DEFAULT_LOCALE ? "root" : l.code, { label: l.label, lang: l.lang, ...(l === DEFAULT_LOCALE ? {} : { link: `/${l.code}/` }) }]),
);

export default defineConfig({
  // Kobalte's transitive @solid-primitives/* deps are not hoisted to the project root; bundle them into the
  // SSR build so the prerender worker does not resolve stray copies from parent directories.
  ssr: { noExternal: [/^@solid-primitives\//, /^@kobalte\/core/] },
  plugins: [
    ogDevImages(),
    solidBase.plugin({
      title: "Solid",
      titleTemplate: ":title | Solid",
      description:
        "Simple and performant reactivity for building user interfaces.",
      siteUrl: "https://www.solidjs.com",
      lang: DEFAULT_LOCALE.lang,
      locales,
      sitemap: true,
      // Each extra language's home page seeds the crawl: its (localized) footer and blog links reach every other page.
      prerender: { routes: PREFIXED_LOCALES.map((l) => `/${l.code}`) },
      robots: true,
      llms: false,
      lastUpdated: false,
      // The COC's numbered headings ("### 1. Correction") must stay plain headings, not <Steps>.
      markdown: { steps: false },
    }),
    solid(solidBase.startConfig()),
  ],
});
