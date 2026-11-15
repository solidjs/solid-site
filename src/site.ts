/** Single source of truth for site-wide constants, navigation and links. */
import type { IconName } from "./components/Icon";

export const SITE_NAME = "SolidJS";
/**
 * Canonical origin, used for canonical links, og:url and og:image. Social crawlers need absolute URLs on a host that
 * actually serves the files, so a preview deploy builds with `VITE_SITE_URL=https://<preview-host>` to point at itself.
 */
export const SITE_URL: string =
  // In dev the browser's own origin, so tools reading the page's tags find the dev-served /og images.
  import.meta.env.DEV && typeof window !== "undefined"
    ? window.location.origin
    : import.meta.env.VITE_SITE_URL || "https://www.solidjs.com";
export const SITE_TAGLINE = "Simple and performant reactivity for building user interfaces.";
export const SITE_DESCRIPTION =
  "Solid is a declarative JavaScript library for building fast, fine-grained reactive user interfaces. Solid 2.0 is live.";
/** Evaluated once at build time (prerender); the year is intentionally static per deploy. */
export const COPYRIGHT_YEAR = new Date().getFullYear();
export const COPYRIGHT_HOLDER = "Solid Maintainers";
export const LICENSE_NOTE = "Released under the MIT License.";

/** Solid 2.0, now live. */
export const SOLID_2 = {
  /** Current release. TODO(content): confirm the exact version string at go-live. */
  version: "2.0.0",
  installCommand: "npm install solid-js @solidjs/web",
  // TODO(content): confirm the migration guide URL once published.
  migrationGuide: "https://docs.solidjs.com",
} as const;

export const URLS = {
  docs: "https://docs.solidjs.com",
  tutorial: "https://tutorial.solidjs.com",
  github: "https://github.com/solidjs",
  githubRepo: "https://github.com/solidjs/solid",
  githubSiteRepo: "https://github.com/solidjs/solid-site",
  discord: "https://discord.com/invite/solidjs",
  reddit: "https://www.reddit.com/r/solidjs/",
  bluesky: "https://bsky.app/profile/solidjs.com",
  x: "https://x.com/solid_js",
  opencollective: "https://opencollective.com/solid",
  npm: "https://www.npmjs.com/package/solid-js",
} as const;

/** Placeholder live-number fallbacks, baked into the static HTML. TODO(content): replace with real values at build time. */
export const STATS_FALLBACK = {
  githubStars: null as number | null,
  npmWeeklyDownloads: null as number | null,
} as const;

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: URLS.github, icon: "github" },
  { label: "Discord", href: URLS.discord, icon: "discord" },
  { label: "Bluesky", href: URLS.bluesky, icon: "bluesky" },
  { label: "X (Twitter)", href: URLS.x, icon: "x" },
  { label: "Reddit", href: URLS.reddit, icon: "reddit" },
];

export interface NavLink {
  label: string;
  href: string;
  /** Short description, shown in header dropdowns. */
  description?: string;
  icon?: IconName;
  /** Derived from href when omitted (http(s) = external). */
  external?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavLink[];
}

export type NavEntry = NavLink | NavGroup;

export const isNavGroup = (entry: NavEntry): entry is NavGroup => "items" in entry;

/** True for absolute http(s) URLs (opened in a new tab with rel=noopener). */
export const isExternalHref = (href: string): boolean => /^https?:\/\//.test(href);

export const NAV: NavEntry[] = [
  {
    label: "Learn",
    items: [
      { label: "Docs", href: URLS.docs, icon: "book", description: "Guides and API reference for Solid." },
      { label: "Tutorial", href: URLS.tutorial, icon: "graduation-cap", description: "Learn Solid interactively, step by step." },
    ],
  },
  { label: "Blog", href: "/blog" },
  {
    label: "Community",
    items: [
      { label: "Discord", href: URLS.discord, icon: "discord", description: "Chat with the community and core team." },
      { label: "GitHub", href: URLS.github, icon: "github", description: "Source code, issues and discussions." },
      { label: "Team & Contributors", href: "/team", icon: "users", description: "The people who build and support Solid." },
      { label: "Code of Conduct", href: "/code-of-conduct", icon: "shield", description: "How we keep the community welcoming." },
    ],
  },
  {
    label: "About",
    items: [
      { label: "About", href: "/about", icon: "info", description: "What Solid is and where it is going." },
      { label: "Media", href: "/media", icon: "newspaper", description: "Logos, brand assets and press resources." },
    ],
  },
];

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Learn",
    links: [
      { label: "Docs", href: URLS.docs },
      { label: "Tutorial", href: URLS.tutorial },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: URLS.discord },
      { label: "GitHub", href: URLS.github },
      { label: "Reddit", href: URLS.reddit },
      { label: "Team & Contributors", href: "/team" },
      { label: "Code of Conduct", href: "/code-of-conduct" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "About", href: "/about" },
      { label: "Media & Brand", href: "/media" },
      { label: "npm", href: URLS.npm },
      { label: "Sponsor on Open Collective", href: URLS.opencollective },
      { label: "Website source", href: URLS.githubSiteRepo },
    ],
  },
];

/** Prefix a path with the canonical origin. */
export const absoluteUrl = (path: string): string => new URL(path, SITE_URL).href;
