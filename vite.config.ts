import { createSolidBase, defineTheme } from "@kobalte/solidbase/config";
import solid from "@solidjs/vite-plugin";
import { defineConfig } from "vite";

const siteTheme = defineTheme({
  componentsPath: new URL("./src/theme/", import.meta.url).href,
});

const solidBase = createSolidBase(siteTheme);

export default defineConfig({
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
    }),
    solid(solidBase.startConfig()),
  ],
});
