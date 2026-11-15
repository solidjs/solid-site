import { getHtmlProps } from "@kobalte/solidbase/server";
import { HydrationScript } from "@solidjs/web";
import type { ParentProps } from "solid-js";
import { THEME_INIT_SCRIPT } from "./components/theme";
import { LOCALES } from "./i18n/locales";
import { SITE_NAME } from "./site";

export default function Document(props: ParentProps) {
  const lang = getHtmlProps().lang;
  return (
    <html lang={lang} dir={LOCALES.find((l) => l.lang === lang)?.dir}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Sets <html data-theme> before first paint (no flash). Inline by necessity: the CSP in public/_headers allows 'unsafe-inline' scripts. */}
        <script innerHTML={THEME_INIT_SCRIPT} />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#03152c" media="(prefers-color-scheme: dark)" />
        <link rel="alternate" type="application/rss+xml" title="SolidJS Blog" href="/rss.xml" />
        <link rel="icon" type="image/svg+xml" href="/img/logos/icon/solid-icon-flat-light.svg" media="(prefers-color-scheme: light)" />
        <link rel="icon" type="image/svg+xml" href="/img/logos/icon/solid-icon-flat-dark.svg" media="(prefers-color-scheme: dark)" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@solid_js" />
        <HydrationScript />
      </head>
      <body>
        <div id="app">{props.children}</div>
      </body>
    </html>
  );
}
