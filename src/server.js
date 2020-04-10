import ssr from "solid-ssr";
import { renderToString, generateHydrationEventsScript } from "solid-js/dom";
import App from "./components/App";
const lang = "en";

function render(body, title) {
  return `<html lang="${lang}">
    <head>
      <title>${title}</title>
      <meta charset="UTF-8" />
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png">
      <link rel="manifest" href="/site.webmanifest">
      <meta name="msapplication-TileColor" content="#da532c">
      <meta name="theme-color" content="#ffffff">
      <link rel="manifest" href="/manifest.json">
      <meta name="msapplication-TileColor" content="#ffffff">
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
      <meta name="theme-color" content="#ffffff">
      <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
      <link rel="stylesheet" href="/index.css" />
      <script>${generateHydrationEventsScript(["click", "blur", "input"])}</script>
    </head>
    <body><div id="app">${body}</div></body>
    <script type="module" src="/index.js"></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-163238140-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-163238140-1');
    </script>
  </html>`;
}

// entry point for server render
ssr(async req => {
  const string = await renderToString(() => <App url={req.url} />);
  return render(string, `Solid - ${req.url.slice(1)}`);
});
