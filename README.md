# solidjs.com

Source for [www.solidjs.com](https://www.solidjs.com), the marketing site for Solid 2.0 (currently a release candidate).
Docs live at [docs.solidjs.com](https://docs.solidjs.com) and the tutorial at [tutorial.solidjs.com](https://tutorial.solidjs.com); this repo does not host either.

## Stack

- Solid 2.0 RC (`solid-js`, `@solidjs/web`) with `@solidjs/router` 2.0 and `@solidjs/meta`
- [SolidBase](https://github.com/kobaltedev/solidbase) 3 with a custom theme in `src/theme` (`Layout.tsx` wraps every route)
- [Kobalte](https://kobalte.dev) (`@kobalte/core` 2.0 alpha) for interactive primitives: navigation menu, drawer, tabs, toggle group, accordion, tooltip, dialog, image
- Plain CSS Modules and CSS custom properties. No Tailwind.
- Geist and Geist Mono (`@fontsource-variable/geist`, `@fontsource-variable/geist-mono`) as the brand fonts
- Cloudflare static assets, deployed with Wrangler

## Getting started

Requires Node 22.18 or newer (the build scripts run `.ts` files directly; see `.nvmrc`) and [pnpm](https://pnpm.io/installation).

```sh
pnpm install
pnpm dev
```

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Vite dev server |
| `pnpm build` | Prerenders every page to `dist/client`. `prebuild` generates `public/rss.xml` from `src/blog/posts.ts`; `postbuild` adds the hand-written `.tsx` pages to the generated `sitemap.xml` |
| `pnpm preview` | Serve the production build locally |
| `pnpm type:check` | `tsc --noEmit` |
| `pnpm deploy` | Build, then `wrangler deploy` to production |
| `pnpm deploy:preview` | Build, then `wrangler versions upload` (preview version, not promoted) |

The site is fully static: no server code and no data fetching required for first paint. Live numbers (such as GitHub stars) must have a baked-in fallback.

## Where things live

- `src/routes`: file routes. `index.tsx` is `/`, `about.tsx`, `team.tsx`, `media.tsx`, and `.md`/`.mdx` files are routes with YAML frontmatter (title and description). `[...404].tsx` is the not-found page.
- `src/routes/blog/*.mdx`: blog articles. Listing metadata (title, date, tags, image, `draft`) is in `src/blog/posts.ts`.
- `src/team/people.ts`: maintainers shown on `/team`.
- `src/components`: shared UI, built on Kobalte where a Kobalte component exists.
- `src/site.ts`: site-wide constants, navigation, footer columns, social links and URLs. Unknown values are marked `TODO(content)` and must be filled in before launch; do not invent numbers or dates.
- `public`: static files, including `img/` (logos, bios, blog images), `_headers` and `_redirects` (Cloudflare). `robots.txt` and `sitemap.xml` are generated at build time.

### Blog drafts

Set `draft: true` on a post in `src/blog/posts.ts`. Drafts are left out of listings, RSS and the sitemap, and are rendered `noindex`. Remove the flag (and set the real date) to publish.

### Live REPL on the homepage

The "What's new in Solid 2.0" tabs embed `solid-repl` with runnable examples (`src/components/repl/examples.ts`; each is a full app whose entry file is `main.tsx`). Nothing loads until the section is near the viewport: the prerendered HTML shows the static code, then the compiler, editor and preview load on demand (the TypeScript worker alone is about 9 MB). Examples execute live, so keep them valid Solid 2.0 and test an edit in the browser. SolidBase's REPL Vite plugin is registered in `vite.config.ts`.

The REPL's sandboxed preview inherits the page's Content-Security-Policy and loads modules from `esm.sh`, a devtools bridge from `cdn.jsdelivr.net` and a stylesheet from `ga.jspm.io`. Cloudflare comma-joins headers from every matching `_headers` rule, so a page-specific policy cannot loosen a site-wide one. The relaxed policy is therefore set for `/` only, and the strict policy is listed per path in `public/_headers`. **A new top-level route must be added to that strict list**, or it ships without a CSP.

## Theming and brand colours

All colours, radii, shadows, fonts and spacing are semantic tokens in `src/theme/tokens.css`, defined for light and for `[data-theme="dark"]`. Components never hardcode colours, so the final brand palette is a one-file change there. Fonts are `--font-sans` and `--font-mono`.

Theme switching is ours, not SolidBase's: a small inline script in `src/Document.tsx` sets `<html data-theme>` before hydration from `localStorage` (falling back to `prefers-color-scheme`), and `ThemeToggle` changes it.

## Deployment

`wrangler.jsonc` serves `dist/client` as Cloudflare static assets. Log in with `pnpm wrangler login`, then `pnpm deploy`. If you build on Cloudflare's CI, set `NODE_VERSION` to 22.18 or newer.

## License

MIT. See the [Code of Conduct](./CODE_OF_CONDUCT.md).
