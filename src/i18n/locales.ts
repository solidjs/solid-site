/**
 * The list of site languages. Pure data and pure functions (no framework imports) because vite.config.ts reads it too.
 *
 * To add a language, see src/i18n/README.md. In short: append an entry below, then add `messages/<code>.ts`.
 * The first entry is the default: it is served at the site root with no path prefix and is the fallback for any
 * string a translation does not cover. Every other locale is served under `/<code>/`.
 */
export interface LocaleDef {
  /** URL prefix and message-file name: `fr` is served at `/fr/...` and read from `messages/fr.ts`. */
  code: string;
  /** BCP 47 tag for <html lang> and hreflang. */
  lang: string;
  /** Name in its own language, shown in the language switcher. */
  label: string;
  /** Open Graph locale, language_TERRITORY (og:locale wants fr_FR, not fr). */
  ogLocale: string;
  /** Text direction. Defaults to "ltr". */
  dir?: "ltr" | "rtl";
}

export const LOCALES: readonly LocaleDef[] = [
  { code: "en", lang: "en-US", ogLocale: "en_US", label: "English" },
  { code: "fr", lang: "fr", ogLocale: "fr_FR", label: "Français" },
];

export const DEFAULT_LOCALE: LocaleDef = LOCALES[0];

/** Locales served under a path prefix. */
export const PREFIXED_LOCALES: readonly LocaleDef[] = LOCALES.slice(1);

export const getLocale = (code: string): LocaleDef => LOCALES.find((l) => l.code === code) ?? DEFAULT_LOCALE;

/** The locale a pathname belongs to: `/fr/blog` is French, `/blog` and `/frequently` are the default. */
export function localeFromPath(pathname: string): LocaleDef {
  const first = pathname.split("/")[1]?.split(/[?#]/)[0];
  return PREFIXED_LOCALES.find((l) => l.code === first) ?? DEFAULT_LOCALE;
}

/** `/fr/blog` -> `/blog`; paths without a locale prefix are returned unchanged. */
export function stripLocale(pathname: string): string {
  const locale = localeFromPath(pathname);
  if (locale === DEFAULT_LOCALE) return pathname;
  return pathname.slice(locale.code.length + 1) || "/";
}

/** `/blog` in `fr` -> `/fr/blog`; the default locale has no prefix. Keeps any `?query` and `#hash`. */
export function withLocale(path: string, code: string): string {
  const locale = getLocale(code);
  const bare = stripLocale(path);
  if (locale === DEFAULT_LOCALE) return bare;
  return `/${locale.code}${bare === "/" ? "" : bare}`;
}

/** True for site pages that are translated (not files like `/rss.xml` or `/img/logo.svg`). */
export const isPagePath = (href: string): boolean => href.startsWith("/") && !href.startsWith("//") && !/\.[a-z0-9]+([?#].*)?$/i.test(href);
