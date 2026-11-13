/**
 * Single listing source for the blog. Every src/routes/blog/<slug>.mdx must have an entry here
 * (checked below at module load, so a missing/stale entry fails the prerender build). Keep the
 * frontmatter title/description in the .mdx in sync: they drive <title>/meta; this array drives
 * listings, article headers, prev/next and RSS.
 */
export interface Post {
  slug: string;
  title: string;
  description: string;
  author: string;
  authorUrl?: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** Site-relative hero image. */
  image?: string;
  tags?: string[];
  /** Drafts are excluded from `posts`, listings, RSS and the sitemap, and rendered noindex. */
  draft?: boolean;
  /** Approximate reading time (about 220 words per minute). */
  readingMinutes?: number;
}

const img = (slug: string, file = "header.png") => `/img/blog/${slug}/${file}`;
const RYAN = "https://www.github.com/ryansolid";
const CORE = "https://www.solidjs.com";

const source: Post[] = [
  {
    slug: "solid-2-0-release-candidate",
    title: "Solid 2.0 Release Candidate",
    description:
      "Solid 2.0 is in release-candidate. Here is what changes: batched writes, split effects, async memos with Loading, Errored, a unified For, draft-first stores and actions.",
    author: "Solid Core Team",
    authorUrl: CORE,
    date: "2026-11-12", // TODO(content): set the real publish date when the draft flag is removed.
    tags: ["Release", "Solid 2.0"],
    draft: true,
    readingMinutes: 4,
  },
  {
    slug: "solidhack-2024-announcement",
    title: "SolidHack 2024 Announcement",
    description: "Announcing SolidHack 2024, sponsored by Netlify and Sentry.",
    author: "SolidJS Core",
    authorUrl: CORE,
    date: "2024-09-03",
    image: img("solidhack-2024-announcement", "header.jpeg"),
    tags: ["Events", "Sponsorship"],
    readingMinutes: 1,
  },
  {
    slug: "solid-start-the-shape-frameworks-to-come",
    title: "SolidStart 1.0: The Shape of Frameworks to Come",
    description: "Official SolidStart Version 1.0 release announcement.",
    author: "SolidJS Core",
    authorUrl: CORE,
    date: "2024-05-21",
    image: img("solid-start-the-shape-frameworks-to-come", "header.jpeg"),
    tags: ["SolidStart", "Release"],
    readingMinutes: 5,
  },
  {
    slug: "chrome-supports-solidjs",
    title: "Chrome Supports SolidJS in Building a Performant Web",
    description: "A major support announcement from the teams at Chrome Aurora and SolidJS.",
    author: "SolidJS Core",
    authorUrl: CORE,
    date: "2023-07-12",
    image: img("chrome-supports-solidjs"),
    tags: ["Sponsorship", "Performance"],
    readingMinutes: 2,
  },
  {
    slug: "introducing-solidstart",
    title: "Introducing SolidStart: The SolidJS Framework",
    description: "The official Beta release announcement for the new meta-framework.",
    author: "SolidJS Core",
    authorUrl: CORE,
    date: "2022-11-09",
    image: img("introducing-solidstart"),
    tags: ["SolidStart", "Release"],
    readingMinutes: 5,
  },
  {
    slug: "solid-fellowships-announcement",
    title: "Announcing SolidJS Fellowships",
    description: "An exciting new program sponsored by SolidJS and supported by OpenCollective sponsors.",
    author: "SolidJS Core",
    authorUrl: CORE,
    date: "2022-09-19",
    image: img("solid-fellowships-announcement"),
    tags: ["Community", "Sponsorship"],
    readingMinutes: 3,
  },
  {
    slug: "state-of-solid-july-2022",
    title: "The State of Solid: July 2022",
    description: "Second quarter updates about Solid including core.",
    author: "SolidJS Core",
    authorUrl: CORE,
    date: "2022-07-31",
    image: img("state-of-solid-july-2022"),
    tags: ["State of Solid", "Community"],
    readingMinutes: 9,
  },
  {
    slug: "state-of-solid-march-2022",
    title: "The State of Solid: March 2022",
    description: "First quarter updates about Solid including core, SolidHack and community growth updates.",
    author: "SolidJS Core",
    authorUrl: CORE,
    date: "2022-04-01",
    image: img("state-of-solid-march-2022"),
    tags: ["State of Solid", "Community"],
    readingMinutes: 7,
  },
  {
    slug: "state-of-solid-december-2021",
    title: "The State of Solid: December 2021",
    description: "Second edition of a quarterly update on SolidJS including announcements about SolidHack.",
    author: "SolidJS Core",
    authorUrl: CORE,
    date: "2021-12-31",
    image: img("state-of-solid-december-2021"),
    tags: ["State of Solid", "Events"],
    readingMinutes: 8,
  },
  {
    slug: "state-of-solid-september-2021",
    title: "The State of Solid: September 2021",
    description: "First edition of a quarterly outline of updates in the Solid project, community and ecosystem.",
    author: "Ryan Carniato",
    authorUrl: RYAN,
    date: "2021-09-30",
    image: img("state-of-solid-september-2021"),
    tags: ["State of Solid", "Community"],
    readingMinutes: 5,
  },
  {
    // Unlisted in the legacy site (its legacy date was a dev placeholder), so kept as a draft.
    slug: "welcome-to-the-solid-blog",
    title: "Welcome to the Solid blog!",
    description: "A Solid based blog with announcements, ideas and insights from the community.",
    author: "David Di Biase",
    authorUrl: "https://github.com/davedbase",
    date: "2021-09-24",
    image: img("welcome-to-the-solid-blog"),
    tags: ["Community"],
    draft: true,
    readingMinutes: 1,
  },
];

// Build-time guard: every blog route file has an entry and vice versa. import.meta.glob only exists
// under Vite; plain-Node consumers (scripts/generate-rss.ts) skip the check.
let files: string[] | undefined;
try {
  files = Object.keys(import.meta.glob("../routes/blog/*.mdx"))
    .map((p) => p.slice(p.lastIndexOf("/") + 1, -".mdx".length))
    .sort();
} catch {
  files = undefined;
}
const slugs = source.map((p) => p.slug).sort();
if (files && files.join() !== slugs.join()) {
  throw new Error(
    `src/blog/posts.ts is out of sync with src/routes/blog/*.mdx.\n  mdx: ${files.join(", ")}\n  posts: ${slugs.join(", ")}`,
  );
}

const byDateDesc = (a: Post, b: Post) => b.date.localeCompare(a.date);

/** Every post including drafts, newest first. */
export const allPosts: Post[] = [...source].sort(byDateDesc);

/** Published posts, newest first. */
export const posts: Post[] = allPosts.filter((p) => !p.draft);

export const getPost = (slug: string): Post | undefined => allPosts.find((p) => p.slug === slug);

export const postPath = (slug: string) => `/blog/${slug}`;

/** All tags used by published posts, alphabetical. */
export const allTags: string[] = [...new Set(posts.flatMap((p) => p.tags ?? []))].sort();

const dateFmt = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });
export const formatDate = (iso: string) => dateFmt.format(new Date(`${iso}T00:00:00Z`));

/** Neighbours in the published list; drafts have none. */
export function getAdjacent(slug: string): { newer?: Post; older?: Post } {
  const i = posts.findIndex((p) => p.slug === slug);
  if (i < 0) return {};
  return { newer: posts[i - 1], older: posts[i + 1] };
}
