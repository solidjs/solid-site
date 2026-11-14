/**
 * SolidBase's sitemap only lists .md/.mdx routes, and only in the default language. Add the hand-written .tsx pages and
 * a copy of every page under each extra language's prefix (src/i18n/locales.ts) to dist/client/sitemap.xml.
 * Wired as "postbuild".
 */
import { readFile, writeFile } from "node:fs/promises";
import { PREFIXED_LOCALES } from "../src/i18n/locales.ts";

const origin = "https://www.solidjs.com";
const extra = ["/", "/about", "/blog", "/media", "/team"];
const file = new URL("../dist/client/sitemap.xml", import.meta.url);

const xml = await readFile(file, "utf8");
const has = (xmlText: string, path: string) => xmlText.includes(`<loc>${origin}${path === "/" ? "" : path}</loc>`) || xmlText.includes(`<loc>${origin}${path}</loc>`);

const listed = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1].slice(origin.length) || "/");
const defaults = [...new Set([...listed, ...extra])];
const wanted = [...defaults, ...PREFIXED_LOCALES.flatMap((l) => defaults.map((p) => `/${l.code}${p === "/" ? "" : p}`))];
const missing = [...new Set(wanted)].filter((p) => !has(xml, p));
const entries = missing.map((p) => `  <url>\n    <loc>${origin}${p}</loc>\n  </url>`).join("\n");
await writeFile(file, xml.replace("</urlset>", `${entries}\n</urlset>`));
console.log(`sitemap: added ${missing.length} page(s)`);
