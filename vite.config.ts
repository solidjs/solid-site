import { createSolidBase, defineTheme } from "@kobalte/solidbase/config";
import { solidReplVitePlugin } from "@kobalte/solidbase/default-theme/repl.js";
import solid from "@solidjs/vite-plugin";
import { defineConfig } from "vite";

const siteTheme = defineTheme({
  componentsPath: new URL("./src/theme/", import.meta.url).href,
  // Makes solid-repl bundle: scopes its global CSS to .sb-repl, aliases its styled-system, ES workers.
  vite: () => solidReplVitePlugin(),
});

const solidBase = createSolidBase(siteTheme);

export default defineConfig({
  // Kobalte's transitive @solid-primitives/* deps are not hoisted to the project root; bundle them into the
  // SSR build so the prerender worker does not resolve stray copies from parent directories.
  ssr: { noExternal: [/^@solid-primitives\//, /^@kobalte\/core/] },
  plugins: [
    solidBase.plugin({
      title: "SolidJS",
      titleTemplate: ":title | SolidJS",
      description:
        "Simple and performant reactivity for building user interfaces.",
      siteUrl: "https://www.solidjs.com",
      sitemap: true,
      robots: true,
      llms: false,
      lastUpdated: false,
      // The COC's numbered headings ("### 1. Correction") must stay plain headings, not <Steps>.
      markdown: { steps: false },
    }),
    solid(solidBase.startConfig()),
  ],
});
