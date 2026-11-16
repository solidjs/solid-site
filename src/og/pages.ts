/**
 * Open Graph image registry. Single source of truth for BOTH sides:
 * - the build (scripts/generate-og.ts renders one PNG per entry into dist/client/og/)
 * - the page head (src/theme/Layout.tsx links each route to its image via ogImagePath)
 * Pure data, no Node imports: it is bundled into the client.
 */
import { posts } from "../blog/posts";
import { SITE_TAGLINE } from "../site";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export interface OgPage {
  /** Route pathname without trailing slash ("/" for home). */
  path: string;
  /** Output name under /og/, without extension. May contain a folder. */
  file: string;
  /** Small label above the title. */
  kicker: string;
  title: string;
  description?: string;
  /** Right-aligned footer text (e.g. author and date for posts). */
  meta?: string;
}

/** Used for any route without its own card (and for draft posts, which are not indexed). */
export const DEFAULT_OG: OgPage = {
  path: "",
  file: "default",
  kicker: "Solid 2.0",
  title: SITE_TAGLINE,
};

const STATIC_PAGES: OgPage[] = [
  {
    path: "/",
    file: "home",
    kicker: "Solid 2.0 is live",
    title: "Fine-grained reactivity. No virtual DOM. Async built in.",
    description: SITE_TAGLINE,
  },
  {
    path: "/about",
    file: "about",
    kicker: "About",
    title: "About Solid",
    description: "A community-driven UI library built on fine-grained reactivity, compiled ahead of time.",
  },
  {
    path: "/blog",
    file: "blog",
    kicker: "Blog",
    title: "News from the Solid team",
    description: "News, releases and community updates from the Solid team.",
  },
  {
    path: "/media",
    file: "media",
    kicker: "Media",
    title: "Logos and brand assets",
    description: "Download the Solid logo as SVG, and find brand colours and usage guidelines.",
  },
  {
    path: "/ecosystem",
    file: "ecosystem",
    kicker: "Ecosystem",
    title: "Libraries and tools for Solid",
    description: "Primitives, routers, UI kits, build plugins and starters from the Solid team and the community.",
  },
  {
    path: "/resources",
    file: "resources",
    kicker: "Resources",
    title: "Learn Solid from the community",
    description: "Articles, videos and podcasts about Solid.",
  },
  {
    path: "/store",
    file: "store",
    kicker: "Store",
    title: "The Solid Store",
    description: "Stickers and swag. All profits go to Solid's Open Collective.",
  },
  {
    path: "/team",
    file: "team",
    kicker: "Community",
    title: "Team & Contributors",
    description: "The maintainers and community contributors behind Solid.",
  },
  {
    path: "/code-of-conduct",
    file: "code-of-conduct",
    kicker: "Community",
    title: "Code of Conduct",
    description: "The Contributor Covenant that applies to the Solid community.",
  },
];

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

const POST_PAGES: OgPage[] = posts.map((post) => ({
  path: `/blog/${post.slug}`,
  file: `blog/${post.slug}`,
  kicker: "Blog",
  title: post.title,
  description: post.description,
  meta: `${post.author}  ·  ${formatDate(post.date)}`,
}));

const ALL: OgPage[] = [...STATIC_PAGES, ...POST_PAGES];
const BY_PATH = new Map(ALL.map((p) => [p.path, p]));

/** Every card to render, including the default. */
export const ogPages = (): OgPage[] => [...ALL, DEFAULT_OG];

const normalize = (pathname: string) => (pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname);

/** Site-relative URL of the Open Graph image for a route. */
export const ogImagePath = (pathname: string): string => `/og/${(BY_PATH.get(normalize(pathname)) ?? DEFAULT_OG).file}.png`;

/** Alt text for the image of a route. */
export const ogImageAlt = (pathname: string): string => {
  const page = BY_PATH.get(normalize(pathname)) ?? DEFAULT_OG;
  return `${page.title} | Solid`;
};
