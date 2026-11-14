/**
 * public/_headers sets a Content-Security-Policy per path (see the comment there), written for the default language.
 * Repeat each page rule under every extra language's prefix (src/i18n/locales.ts) so /fr/ gets the REPL policy that
 * / has and /fr/about gets the strict one. Rewrites dist/client/_headers. Wired as "postbuild".
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

const added = PREFIXED_LOCALES.flatMap((l) =>
  pageRules.flatMap(([path, ...headers]) => {
    const prefixed = path === "/" ? [`/${l.code}`, `/${l.code}/`] : [`/${l.code}${path}`];
    return prefixed.map((p) => [p, ...headers].join("\n"));
  }).concat(`/${l.code}/404.html\n${pageRules.find((r) => r[0] === "/about")!.slice(1).join("\n")}`),
);

await writeFile(file, `${text.trimEnd()}\n\n${added.join("\n\n")}\n`);
console.log(`headers: added ${added.length} rule(s) for ${PREFIXED_LOCALES.map((l) => l.code).join(", ") || "no extra languages"}`);
