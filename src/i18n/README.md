# Languages

The site is English-only today, but it is set up so a language can be added without touching routing, the header, the
sitemap or the security headers.

## Add a language

1. **Register it** in `locales.ts`:
   ```ts
   { code: "fr", lang: "fr", label: "Français" },
   ```
   `code` is the URL prefix (`/fr/...`) and the message file name. `lang` is the BCP 47 tag for `<html lang>` and
   `hreflang`. `label` is the name in its own language. Add `dir: "rtl"` for right-to-left languages.
2. **Translate** in `messages/<code>.ts`. The English text is the key, and anything missing falls back to English:
   ```ts
   export default {
     Docs: "Documentation",
     "Read the blog": "Lire le blog",
     "Solid 2.0 is live": "Solid 2.0 est disponible",
   } satisfies Record<string, string>;
   ```

That is all. The language switcher appears in the header once there is more than one language.

## What happens automatically

- Every page is also served under the prefix (`/about` and `/fr/about`) from the same component.
- `Link` and `Button` add the prefix to internal links, so visitors stay in their language.
- `<html lang>` and `dir`, `og:locale`, a canonical URL and `hreflang` alternates (with `x-default`) are set per page.
- The build prerenders `/fr/...`, adds it to `sitemap.xml`, and repeats the `_headers` Content-Security-Policy rules
  for it (`scripts/patch-headers.ts`), so `/fr/` gets the REPL policy that `/` has.
- Open Graph cards are shared by every language of a page.

## French

French (`messages/fr.ts`) covers the whole site except the long blog articles: every page, the navigation, the footer, and the Code of Conduct (`src/routes/fr/code-of-conduct.mdx`, a full translation that replaces the generated copy). Blog articles stay in English and show a note saying so; their listings, dates and labels are translated. The catalog was written by an AI translator and needs a native French speaker's review.

In development, `window.__i18nMissing` lists every string a translated page asked for that the catalog does not have.

## Italian, German, Spanish and Portuguese

Italian (`messages/it.ts`), German (`messages/de.ts`), Spanish (`messages/es.ts`) and Portuguese (`messages/pt.ts`) cover the same ground as French: every page, the navigation, the footer and the Code of Conduct (`src/routes/it/` and `src/routes/de/`). Blog articles stay in English. Both catalogs were written by an AI translator and need a native speaker's review (`TODO(content): review` in each file). Italian uses the informal imperative, German uses "du". Spanish is neutral international Spanish; Portuguese is Brazilian (`pt-BR`).

## Chinese, Japanese, Korean, Bangla, Russian and Indonesian

`messages/{zh,ja,ko,bn,ru,id}.ts` and `src/routes/{zh,ja,ko,bn,ru,id}/code-of-conduct.mdx` follow the same pattern: whole site except blog articles, AI-translated, `TODO(content): review` in each catalog. Chinese is Simplified (`zh-CN`). Geist has no CJK or Bengali glyphs, so those pages use the system fallback font. The catalogs have no plural forms, so count strings such as "{n} posts" read as a label (Russian: "Записей: {n}").

## Translating text in components

```tsx
const { t } = useI18n();
<h2>{t("Why Solid 2.0?")}</h2>
<p>{t("Updated {date}", { date })}</p>
```

Components that take text as props (`Section`, `PageHeader`, `Card`, `Button`, `Badge`, `Tabs`, `ToggleGroup`) translate
plain strings themselves, so `<Section title="Colours">` needs nothing more than a catalog entry. Anywhere else, wrap the
text in `t()`. For a sentence with a link or styled word inside it, use `tSplit("... {link} ...", "link")`, which
translates the sentence and hands back the text before and after the placeholder. Dates and numbers go through
`fmtDate`, `fmtIso` and `fmtCompact` so they follow the language.

## A fully translated page or article

A route file under the prefix replaces the generated copy for that locale only:
`src/routes/fr/about.tsx` serves `/fr/about`, `src/routes/fr/blog/<slug>.mdx` serves a translated post.

## Checking a language

Temporarily enable the entry in `locales.ts`, run `pnpm build`, and open `dist/client/fr/`. Things worth a look: the
switcher, that links keep the prefix, `<html lang>`, and the `hreflang` tags in `<head>`.
