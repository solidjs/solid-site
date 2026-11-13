/**
 * SolidBase's sitemap only lists .md/.mdx routes. Add the hand-written .tsx pages to dist/client/sitemap.xml.
 * Wired as "postbuild".
 */
import { readFile, writeFile } from "node:fs/promises";

const origin = "https://www.solidjs.com";
const extra = ["/", "/about", "/blog", "/media", "/team"];
const file = new URL("../dist/client/sitemap.xml", import.meta.url);

const xml = await readFile(file, "utf8");
const missing = extra.filter((p) => !xml.includes(`<loc>${origin}${p === "/" ? "" : p}</loc>`) && !xml.includes(`<loc>${origin}${p}</loc>`));
const entries = missing.map((p) => `  <url>\n    <loc>${origin}${p}</loc>\n  </url>`).join("\n");
await writeFile(file, xml.replace("</urlset>", `${entries}\n</urlset>`));
console.log(`sitemap: added ${missing.length} page(s)`);
