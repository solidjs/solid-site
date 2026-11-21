/**
 * public/_headers sets a Content-Security-Policy per path (see the comment there), written for the default language.
 * Repeat each page rule under every extra language's prefix (src/i18n/locales.ts) so /fr/ gets the REPL policy that
 * / has and /fr/about gets the strict one, within Cloudflare's limit of 100 rules. Rewrites dist/client/_headers. Wired as "postbuild".
 */
import { readFile, writeFile } from "node:fs/promises";
import { PREFIXED_LOCALES } from "../src/i18n/locales.ts";

const file = new URL("../dist/client/_headers", import.meta.url);
const text = await readFile(file, "utf8");

// A rule is a path line followed by indented header lines; rules are separated by blank lines.
const pageRules = text
  .split(/\n\s*\n/)
  .map((block) => block.split("\n").filter((line) => !line.startsWith("#")))
  .filter((lines) => /^\/\S*$/.test(lines[0] ?? "") && lines.some((l) => l.includes("Content-Security-Policy")) && lines[0] !== "/404.html");

// Cloudflare allows at most 100 rules in _headers, so repeating every page rule per language does not scale (each
// language costs 15). Page rules use a `:locale` placeholder instead (one path segment, so one rule serves every
// language). The home page cannot: `/:locale` would also match /about and /store and add the REPL policy there, and a
// second policy can only tighten, so /store would lose its Shopify connect-src. Its two rules are written per language.
const home = pageRules.find((r) => r[0] === "/")!.slice(1);
const strict = pageRules.find((r) => r[0] === "/about")!.slice(1);
const added = [
  ...PREFIXED_LOCALES.flatMap((l) => [`/${l.code}`, `/${l.code}/`].map((p) => [p, ...home].join("\n"))),
  ...pageRules.filter(([path]) => path !== "/").map(([path, ...headers]) => [`/:locale${path}`, ...headers].join("\n")),
  [`/:locale/404.html`, ...strict].join("\n"),
];

await writeFile(file, `${text.trimEnd()}\n\n${added.join("\n\n")}\n`);
const total = `${text.trimEnd()}\n\n${added.join("\n\n")}\n`.split(/\n\s*\n/).filter((b) => /^\//.test(b.split("\n").filter((l) => !l.startsWith("#"))[0] ?? "")).length;
if (total > 100) throw new Error(`_headers has ${total} rules; Cloudflare allows 100`);
console.log(`headers: added ${added.length} rule(s) (${total} in total) for ${PREFIXED_LOCALES.map((l) => l.code).join(", ") || "no extra languages"}`);
