import { getHtmlProps } from "@kobalte/solidbase/server";
import { HydrationScript } from "@solidjs/web";
import type { ParentProps } from "solid-js";
import { THEME_INIT_SCRIPT } from "./components/theme";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "./site";

export default function Document(props: ParentProps) {
  return (
    <html lang={getHtmlProps().lang}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Sets <html data-theme> before first paint (no flash). Inline by necessity: the CSP in public/_headers allows 'unsafe-inline' scripts. */}
        <script innerHTML={THEME_INIT_SCRIPT} />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0b0f17" media="(prefers-color-scheme: dark)" />
        <link rel="alternate" type="application/rss+xml" title="SolidJS Blog" href="/rss.xml" />
        <link rel="icon" href="/img/favicons/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicons/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/img/favicons/apple-touch-icon.png" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}${OG_IMAGE}`} />
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
