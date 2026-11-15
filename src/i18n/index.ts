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
  // Development aid: `window.__i18nMissing` lists every string a translated page asked for that the catalog lacks.
  if (import.meta.env.DEV && code !== DEFAULT_LOCALE.code && catalogs[code]?.[english] === undefined && /[A-Za-z]{2}/.test(english)) {
    ((globalThis as { __i18nMissing?: Set<string> }).__i18nMissing ??= new Set()).add(english);
  }
  return vars ? text.replace(/\{(\w+)\}/g, (whole, name: string) => (name in vars ? String(vars[name]) : whole)) : text;
}

export interface I18n {
  locale: () => LocaleDef;
  /** Translates a plain string and passes anything else (JSX, numbers) through, for components that take text props. */
  tx: <T>(node: T) => T | string;
  /** `t("Read the blog")`. English text is the key; `{name}` placeholders are filled from `vars`. */
  t: (english: string, vars?: Record<string, string | number>) => string;
  /** Translates a sentence and splits it around `{name}`, so a link or styled word can sit inside it: [before, after]. */
  tSplit: (english: string, name: string) => [string, string];
  /** A calendar date (`2024-09-03`) written for the current language, e.g. "3 septembre 2024". */
  fmtDate: (iso: string) => string;
  /** A date of any precision (`2021`, `2018-04`, `2021-09-30`) in short form, e.g. "30 sept. 2021". */
  fmtIso: (iso: string) => string;
  /** A compact number, e.g. "36.3K" in English and "36,3 k" in French. */
  fmtCompact: (n: number) => string;
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
    tSplit: (english, name) => {
      const marker = "\u0001";
      const [before, ...rest] = translate(locale().code, english, { [name]: marker }).split(marker);
      return [before, rest.join(marker)];
    },
    fmtDate: (iso) =>
      new Intl.DateTimeFormat(locale().lang, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`)),
    fmtIso: (iso) => {
      const parts = iso.split("-").length;
      const date = new Date(`${iso}${parts === 1 ? "-01-01" : parts === 2 ? "-01" : ""}T00:00:00Z`);
      const opts: Intl.DateTimeFormatOptions =
        parts === 1 ? { year: "numeric" } : parts === 2 ? { month: "short", year: "numeric" } : { day: "numeric", month: "short", year: "numeric" };
      return new Intl.DateTimeFormat(locale().lang, { ...opts, timeZone: "UTC" }).format(date);
    },
    fmtCompact: (n) => new Intl.NumberFormat(locale().lang, { notation: "compact", maximumFractionDigits: 1 }).format(n),
    tx: (node) => (typeof node === "string" ? translate(locale().code, node) : node),
    localePath: (href) => (isPagePath(href) ? withLocale(href, locale().code) : href),
    pathIn: (code) => withLocale(location.pathname, code),
  };
}

export { DEFAULT_LOCALE, stripLocale };
