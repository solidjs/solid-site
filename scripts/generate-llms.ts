/**
 * Writes dist/client/llms.txt, the llmstxt.org index for language models: an H1, a one-paragraph summary and
 * sections of annotated links to the pages worth reading. Plain markdown, English URLs only (the French pages are
 * translations of the same content). The blog list is read from the .mdx frontmatter, so a new post appears here on
 * the next build and drafts never do. Wired as "postbuild".
 *
 * Constants are repeated from src/site.ts on purpose: that module reads import.meta.env and cannot run under node.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";

const origin = "https://www.solidjs.com";
const postsDir = new URL("../src/routes/blog/", import.meta.url);
const out = new URL("../dist/client/llms.txt", import.meta.url);

/** The few frontmatter keys needed, parsed without a YAML dependency (single-line `key: value`, optionally quoted). */
function frontmatter(source: string): Record<string, string> {
  const block = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
  const data: Record<string, string> = {};
  let key = "";
  for (const line of block.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (m) {
      key = m[1];
      data[key] = m[2].trim();
    } else if (key && /^\s+\S/.test(line)) {
      data[key] = `${data[key]} ${line.trim()}`.trim();
    }
  }
  for (const k of Object.keys(data)) data[k] = data[k].replace(/^(["'])([\s\S]*)\1$/, "$2").replace(/\\"/g, '"');
  return data;
}

interface Post { slug: string; title: string; description: string; date: string }
const posts: Post[] = [];
for (const file of (await readdir(postsDir)).filter((f) => f.endsWith(".mdx"))) {
  const fm = frontmatter(await readFile(new URL(file, postsDir), "utf8"));
  if (fm.draft === "true" || !fm.title) continue;
  posts.push({ slug: file.replace(/\.mdx$/, ""), title: fm.title, description: fm.description ?? "", date: fm.date ?? "" });
}
posts.sort((a, b) => b.date.localeCompare(a.date));

// "<Reveal>" in a title would read as an HTML tag in markdown, so angle brackets are escaped.
const escapeTitle = (title: string) => title.replace(/[<>]/g, (c) => `\\${c}`);
const link = (title: string, href: string, note?: string) => `- [${escapeTitle(title)}](${href})${note ? `: ${note}` : ""}`;

const text = `# Solid

> Solid is a declarative JavaScript library for building fast, fine-grained reactive user interfaces. Components run once and signals update exactly the DOM nodes that read them, with no virtual DOM. Solid 2.0 adds first-class async, split effects and draft-first stores. Released under the MIT License.

This file indexes the Solid website. The documentation lives at docs.solidjs.com and the interactive tutorial at tutorial.solidjs.com.

## Docs

${link("Solid documentation", "https://docs.solidjs.com", "guides, concepts and API reference for Solid, Solid Router and SolidStart")}
${link("Interactive tutorial", "https://tutorial.solidjs.com", "learn Solid in the browser, lesson by lesson")}
${link("Solid 2.0 release candidate announcement", `${origin}/blog/solid-2-0-rc-the-big-reveal`, "what changed in 2.0: async in the reactive graph, split effects and the new compiler")}

## Site

${link("Home", `${origin}/`, "what Solid is, why 2.0, live GitHub and npm numbers")}
${link("About", `${origin}/about`, "what Solid is and where it is going")}
${link("Resources", `${origin}/resources`, "community articles, videos and podcasts about Solid")}
${link("Ecosystem", `${origin}/ecosystem`, "libraries, primitives, routers, UI kits, build plugins and starters, searchable by category")}
${link("Team and contributors", `${origin}/team`, "the maintainers and contributors")}
${link("Media and brand", `${origin}/media`, "logos, brand assets and press resources")}
${link("Code of Conduct", `${origin}/code-of-conduct`, "how the community expects people to behave")}
${link("Solid Store", `${origin}/store`, "stickers, shirts and other merchandise; every profit goes to the Open Collective (the catalogue is loaded live from Shopify)")}

## Blog

${posts.map((p) => link(p.title, `${origin}/blog/${p.slug}`, p.description || undefined)).join("\n")}

## Optional

${link("GitHub organisation", "https://github.com/solidjs", "source for Solid, SolidStart, Solid Router and the docs")}
${link("Solid repository", "https://github.com/solidjs/solid", "the core library, issues and releases")}
${link("npm: solid-js", "https://www.npmjs.com/package/solid-js", "the published package and weekly downloads")}
${link("Discord", "https://discord.com/invite/solidjs", "community chat")}
${link("Reddit", "https://www.reddit.com/r/solidjs/", "community discussion")}
${link("Bluesky", "https://bsky.app/profile/solidjs.com", "news")}
${link("Open Collective", "https://opencollective.com/solid", "fund Solid's maintainers")}
`;

await writeFile(out, text);
console.log(`llms.txt: ${posts.length} post(s)`);
