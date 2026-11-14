import { useLocation } from "@solidjs/router";
import { createMemo } from "solid-js";
import { DEFAULT_LOCALE, isPagePath, localeFromPath, stripLocale, withLocale, type LocaleDef } from "./locales";

export * from "./locales";

type Catalog = Record<string, string>;

// Every messages/<code>.ts file is a catalog: its default export maps an English string to its translation.
const modules = import.meta.glob<{ default: Catalog }>("./messages/*.ts", { eager: true });
const catalogs: Record<string, Catalog> = {};
for (const [file, mod] of Object.entries(modules)) catalogs[file.replace(/^.*\/(.+)\.ts$/, "$1")] = mod.default;

/** Translates `english` for locale `code`; a missing entry falls back to the English text itself. */
export function translate(code: string, english: string, vars?: Record<string, string | number>): string {
  const text = catalogs[code]?.[english] ?? english;
  return vars ? text.replace(/\{(\w+)\}/g, (whole, name: string) => (name in vars ? String(vars[name]) : whole)) : text;
}

export interface I18n {
  locale: () => LocaleDef;
  /** `t("Read the blog")`. English text is the key; `{name}` placeholders are filled from `vars`. */
  t: (english: string, vars?: Record<string, string | number>) => string;
  /** Prefixes an internal page path with the current locale (`/blog` -> `/fr/blog`). Other hrefs pass through. */
  localePath: (href: string) => string;
  /** The same page in another locale, for the language switcher and hreflang. */
  pathIn: (code: string) => string;
}

/** Locale-aware helpers, derived from the URL. Call inside a component (needs the router). */
export function useI18n(): I18n {
  const location = useLocation();
  const locale = createMemo(() => localeFromPath(location.pathname));
  return {
    locale,
    t: (english, vars) => translate(locale().code, english, vars),
    localePath: (href) => (isPagePath(href) ? withLocale(href, locale().code) : href),
    pathIn: (code) => withLocale(location.pathname, code),
  };
}

export { DEFAULT_LOCALE, stripLocale };
