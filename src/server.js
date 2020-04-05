import ssr from "solid-ssr";
import { renderToString, generateHydrationEventsScript } from "solid-js/dom";
import App from "./components/App";
const lang = "en";

function render(body, title) {
  return `<html lang="${lang}">
    <head>
      <title>${title}</title>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="/styles.css" />
      <link rel="stylesheet" href="/index.css" />
      <script>${generateHydrationEventsScript(["click", "blur", "input"])}</script>
    </head>
    <body><div id="app">${body}</div></body>
    <script type="module" src="/index.js"></script>
  </html>`;
}

// entry point for server render
ssr(async req => {
  const string = await renderToString(() => <App url={req.url} />);
  return render(string, `Solid - ${req.url.slice(1)}`);
});
