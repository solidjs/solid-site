/**
 * SolidBase's sitemap only lists .md/.mdx routes, and only in the default language. Add the hand-written .tsx pages and
 * a copy of every page under each extra language's prefix (src/i18n/locales.ts) to dist/client/sitemap.xml.
 * Wired as "postbuild".
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { DEFAULT_LOCALE, LOCALES, PREFIXED_LOCALES } from "../src/i18n/locales.ts";

const origin = "https://www.solidjs.com";
const extra = ["/", "/about", "/blog", "/ecosystem", "/media", "/resources", "/store", "/team"];
const file = new URL("../dist/client/sitemap.xml", import.meta.url);

const xml = await readFile(file, "utf8");
const has = (xmlText: string, path: string) => xmlText.includes(`<loc>${origin}${path === "/" ? "" : path}</loc>`) || xmlText.includes(`<loc>${origin}${path}</loc>`);

const listed = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1].slice(origin.length) || "/");
const defaults = [...new Set([...listed, ...extra])];
// Blog posts are English only, so a /fr/blog/<slug> page is a duplicate of the English one (it is canonicalised and
// noindexed in src/theme/Layout.tsx) and does not belong in the sitemap. The blog index is translated and stays.
const isPostPath = (p: string) => /^\/blog\/[^/]+$/.test(p.replace(/^\/(?:fr)(?=\/|$)/, "") || "/");
const wanted = [
  ...defaults,
  ...PREFIXED_LOCALES.flatMap((l) => defaults.filter((p) => !isPostPath(p)).map((p) => `/${l.code}${p === "/" ? "" : p}`)),
];
const missing = [...new Set(wanted)].filter((p) => !has(xml, p));
const entries = missing.map((p) => `  <url>\n    <loc>${origin}${p}</loc>\n  </url>`).join("\n");
let result = xml.replace("</urlset>", `${entries}\n</urlset>`);

// Drop any French copy of a post that SolidBase or an earlier run listed.
const prefixes = PREFIXED_LOCALES.map((l) => l.code);
result = result.replace(/\s*<url>\s*<loc>([^<]*)<\/loc>[\s\S]*?<\/url>/g, (block, loc: string) => {
  const path = loc.slice(origin.length) || "/";
  return prefixes.some((c) => new RegExp(`^/${c}/blog/[^/]+$`).test(path)) ? "" : block;
});

// lastmod for posts comes from the frontmatter date; hreflang alternates go on every translated page.
const postsDir = new URL("../src/routes/blog/", import.meta.url);
const postDates = new Map<string, string>();
for (const file of (await readdir(postsDir)).filter((f) => f.endsWith(".mdx"))) {
  const date = (await readFile(new URL(file, postsDir), "utf8")).match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
  if (date) postDates.set(file.replace(/\.mdx$/, ""), date);
}
const localePath = (path: string, code: string) => (code === DEFAULT_LOCALE.code ? path : `/${code}${path === "/" ? "" : path}`);
result = result.replace(/<url>\s*<loc>([^<]*)<\/loc>([\s\S]*?)<\/url>/g, (_block, loc: string, rest: string) => {
  const path = loc.slice(origin.length) || "/";
  const bare = path.replace(new RegExp(`^/(?:${prefixes.join("|")})(?=/|$)`), "") || "/";
  const slug = bare.startsWith("/blog/") ? bare.slice("/blog/".length) : "";
  const lastmod = slug && postDates.has(slug) && !/<lastmod>/.test(rest) ? `\n    <lastmod>${postDates.get(slug)}</lastmod>` : "";
  // Posts have no translations, so no alternates there.
  const alternates = slug
    ? ""
    : LOCALES.map((l) => `\n    <xhtml:link rel="alternate" hreflang="${l.lang}" href="${origin}${localePath(bare, l.code)}"/>`).join("") +
      `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${localePath(bare, DEFAULT_LOCALE.code)}"/>`;
  const body = rest.replace(/\s*<xhtml:link[^>]*>/g, "");
  return `<url>\n    <loc>${loc}</loc>${lastmod}${body.replace(/^\s*\n?/, "")}${alternates}\n  </url>`;
});
if (!result.includes("xmlns:xhtml")) result = result.replace("<urlset", '<urlset xmlns:xhtml="http://www.w3.org/1999/xhtml"');
await writeFile(file, result);
console.log(`sitemap: added ${missing.length} page(s)`);
