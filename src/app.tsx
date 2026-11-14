import { SolidBaseRoot } from "@kobalte/solidbase/client";
import { createRouter } from "@solidjs/router";
import { fileRoutes } from "@solidjs/router/fs";
import { pageRoutes } from "virtual:file-routes";
import { localeFromPath, PREFIXED_LOCALES } from "./i18n/locales";

const pages = fileRoutes(pageRoutes);

/**
 * Every page is also served under each extra locale's prefix (`/about` and `/fr/about`) from the same component, which
 * reads its text through useI18n(). A file route that already lives under the prefix (src/routes/fr/about.tsx) wins,
 * which is how a locale gets a fully translated page or article.
 */
const routes = [
  ...pages,
  ...PREFIXED_LOCALES.flatMap((locale) => {
    const own = new Set(pages.filter((p) => localeFromPath(p.path) === locale).map((p) => p.path));
    return pages
      .filter((p) => localeFromPath(p.path).code === localeFromPath("/").code)
      .map((p) => ({ ...p, path: `/${locale.code}${p.path === "/" ? "" : p.path}` }))
      .filter((p) => !own.has(p.path));
  }),
];

const Router = createRouter({ routes });

export default function App() {
  return (
    <Router>{(props) => <SolidBaseRoot>{props.children}</SolidBaseRoot>}</Router>
  );
}
