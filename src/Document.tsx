import { getHtmlProps } from "@kobalte/solidbase/server";
import { HydrationScript } from "@solidjs/web";
import type { ParentProps } from "solid-js";

export default function Document(props: ParentProps) {
  return (
    <html lang={getHtmlProps().lang}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/favicons/favicon.ico" />
        <HydrationScript />
      </head>
      <body>
        <div id="app">{props.children}</div>
      </body>
    </html>
  );
}
