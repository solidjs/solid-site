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

## Translating text in components

```tsx
const { t } = useI18n();
<h2>{t("Why Solid 2.0?")}</h2>
<p>{t("Updated {date}", { date })}</p>
```

Navigation and footer labels come from `src/site.ts` and are translated where they are rendered, so add those English
labels to the catalog as they are. **Page copy is not wrapped in `t()` yet**: until a page's text is, its translated
locale shows English. Wrap strings as a language is translated; untouched strings keep working.

## A fully translated page or article

A route file under the prefix replaces the generated copy for that locale only:
`src/routes/fr/about.tsx` serves `/fr/about`, `src/routes/fr/blog/<slug>.mdx` serves a translated post.

## Checking a language

Temporarily enable the entry in `locales.ts`, run `pnpm build`, and open `dist/client/fr/`. Things worth a look: the
switcher, that links keep the prefix, `<html lang>`, and the `hreflang` tags in `<head>`.
