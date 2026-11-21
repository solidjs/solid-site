# Translating the Solid site

This guide is for people who want to improve a translation or add a language. It explains where everything lives and how
to check your work. For the short technical reference (how the router, `Link` and `hreflang` pick up a locale) see
[`src/i18n/README.md`](src/i18n/README.md).

## Languages today

English (default, no URL prefix), Français, Italiano, Deutsch, Español, Português (Brazil), 简体中文, 日本語, 한국어,
বাংলা, Русский, Bahasa Indonesia.

Every translation except the English original is machine-written and marked `TODO(content): review` at the top of its
catalog. **Native-speaker review is the most useful contribution.** Fixing a wrong or awkward sentence is a one-line change.

## Where things live

| What | Where |
| --- | --- |
| The list of languages (code, `<html lang>`, name in its own language, Open Graph locale, text direction) | `src/i18n/locales.ts` |
| One translation catalog per language | `src/i18n/messages/<code>.ts` |
| A fully translated page, which replaces the generated copy for that language | `src/routes/<code>/…` (today only `code-of-conduct.mdx`) |
| The `t()` helper, date and number formatting, locale-aware paths | `src/i18n/index.ts` |
| The language menu (header and footer) | `src/components/LanguageSwitcher.tsx` |
| Navigation, footer columns and other site-wide text | `src/site.ts` (the English text there is looked up in the catalog) |
| Page copy | the components and routes themselves, wrapped in `t("…")` or passed as plain text props |
| Build steps that know about languages | `vite.config.ts`, `scripts/patch-sitemap.ts`, `scripts/patch-headers.ts` |

Codes used in URLs and file names: `fr it de es pt zh ja ko bn ru id`. A page in language `xx` is served at `/xx/…`.

## How a catalog works

A catalog maps the **English text** to its translation. The English text is the key, so there is no separate ID to look up:

```ts
export default {
  "Read the docs": "Leggi la documentazione",
  "Updated {date}": "Aggiornato il {date}",
} satisfies Record<string, string>;
```

Rules:

- **Do not change a key.** It must match the English text in the code exactly, including quotes and punctuation. If it does not
  match, the English text is shown.
- **Keep `{placeholders}` exactly as written** (`{date}`, `{version}`, `{name}`, `{license}`, …), and use each one as many times as
  the key does. They are replaced at render time.
- A missing key falls back to English, so a partial translation is fine.
- Sentences with a link or styled word inside (`{license}`, `{link}`, `{word}`) are translated as a whole and then split around
  that one placeholder. Make sure the sentence still reads correctly once the placeholder is replaced, and mind word order,
  case endings and particles in your language.
- Keep UI labels short. They sit in menus and buttons.
- Brand and product names (Solid, SolidStart, SolidBase, GitHub, npm) stay as they are. Widely used developer terms (signal,
  store, memo, SSR) may stay in English if that is what developers in your language say.
- There are no plural forms, so a count label such as `{n} posts` must read acceptably for any number.

## Improve an existing translation

1. Open `src/i18n/messages/<code>.ts` and edit the **value** (the right-hand side).
2. Run the site and look at the page (see below).
3. Once a native speaker has reviewed the whole file, update its header comment and drop `TODO(content): review`.

## Add a new language

1. Add an entry to `src/i18n/locales.ts`:
   ```ts
   { code: "nl", lang: "nl", ogLocale: "nl_NL", label: "Nederlands" },
   ```
   Add `dir: "rtl"` for right-to-left languages. The first entry in the list is the default language, so append yours at the end.
2. Create `src/i18n/messages/nl.ts`. The easiest start is to copy `fr.ts` and translate the values, keeping every key.
3. Translate the Code of Conduct: copy `src/routes/fr/code-of-conduct.mdx` to `src/routes/nl/code-of-conduct.mdx`. The `toc` ids in
   the file must match the heading ids the site generates (lowercase, spaces to hyphens, punctuation dropped, non-Latin letters kept).
   Check them against the built page as described below.
4. Build and check (below).

Nothing else needs changing: routing, the language menu, the sitemap, `hreflang` tags and the security headers all read the list
in `locales.ts`.

## What is not translated

- **Blog articles** stay in English in every language. Their listings, dates and labels are translated, and a translated blog page
  shows a note that the article is in English. To translate an article, add `src/routes/<code>/blog/<slug>.mdx`.
- **Social preview images** (`/og/*.png`) are shared by all languages and use English text.
- **Ecosystem data** (library and article listings) is English.
- **Names** of people, projects and companies.

## Check your work

Run the site and open a translated page, for example `http://localhost:5173/it/`:

```bash
pnpm dev
```

In development, open the browser console and run `window.__i18nMissing` to list every string the page asked for that the catalog
does not have.

To check that a catalog is complete and its placeholders are intact, compare it with `fr.ts` (Node 22.18 or newer runs TypeScript
directly). Save this outside the repo, for example `/tmp/check-catalog.mjs`, and pass the language code:

```js
import { pathToFileURL } from "node:url";
const root = process.argv[2]; // path to the repo
const code = process.argv[3]; // e.g. "it"
const load = async (c) => (await import(pathToFileURL(`${root}/src/i18n/messages/${c}.ts`).href)).default;
const [ref, cat] = [await load("fr"), await load(code)];
const ph = (s) => (s.match(/\{\w+\}/g) ?? []).sort().join();
for (const k of Object.keys(ref)) {
  if (!(k in cat)) console.log("missing:", k);
  else if (ph(k) !== ph(cat[k])) console.log("placeholder mismatch:", k);
  else if (!cat[k].trim()) console.log("empty:", k);
}
for (const k of Object.keys(cat)) if (!(k in ref)) console.log("unknown key:", k);
```

Before opening a pull request, run a full build and look at the output:

```bash
pnpm type:check
pnpm build
```

Things worth checking in `dist/client/<code>/`: `<html lang>`, that links keep the `/<code>/` prefix, the language menu, and for the
Code of Conduct that every table-of-contents link points to a heading id that exists in the page.

## When the English copy changes

Because the English text is the key, editing an English sentence in the code silently orphans its translations: they stop matching and
the page falls back to English. After changing English text, update the matching key in every catalog (search for the old sentence
in `src/i18n/messages/`), or leave the translation to be refreshed in a follow-up.

## Pull requests

- One language per pull request keeps review simple.
- Mention in the description whether a native speaker reviewed it.
- Include a screenshot of one or two translated pages if the language has long words or a non-Latin script, since those are the
  ones most likely to wrap or overflow.
