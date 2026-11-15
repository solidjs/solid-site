import { absoluteUrl, SITE_NAME } from "../site";
import { posts, postPath, type Post } from "./posts";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const item = (p: Post) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${absoluteUrl(postPath(p.slug))}</link>
      <guid isPermaLink="true">${absoluteUrl(postPath(p.slug))}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>${esc(p.author)}</dc:creator>
      <description>${esc(p.description)}</description>
${(p.tags ?? []).map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`;

/** RSS 2.0 document for published posts. Wire into the build to emit public/rss.xml (see scripts/generate-rss.ts). */
export function buildRss(list: Post[] = posts): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(SITE_NAME)} Blog</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>News and updates from the Solid team.</description>
    <language>en</language>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />
${list.map(item).join("\n")}
  </channel>
</rss>
`;
}
