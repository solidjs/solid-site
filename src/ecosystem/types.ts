/** Content types for the Resources page (articles, videos, podcasts) and the Ecosystem page (libraries, packages). */
export const ResourceType = {
  Article: "article",
  Video: "video",
  Podcast: "podcast",
} as const;
export type ResourceType = (typeof ResourceType)[keyof typeof ResourceType];

export const PackageType = {
  Library: "library",
  Package: "package",
} as const;
export type PackageType = (typeof PackageType)[keyof typeof PackageType];

export const ResourceCategory = {
  Primitives: "primitive",
  Routers: "router",
  Data: "data",
  DataVisualization: "data_visualization",
  UI: "ui",
  Plugins: "plugin",
  Starters: "starters",
  BuildUtilities: "build_utility",
  AddOn: "add_on",
  Testing: "testing",
  Educational: "educational",
} as const;
export type ResourceCategory = (typeof ResourceCategory)[keyof typeof ResourceCategory];

export interface Resource {
  title: string;
  link: string;
  author?: string;
  author_url?: string;
  description?: string;
  type: ResourceType | PackageType;
  categories: readonly ResourceCategory[];
  /** An official Solid resource. */
  official?: boolean;
  /** `false` marks a package that is no longer maintained. */
  maintained?: boolean;
  /** About Solid 2.0 (betas, the release candidate and the final release). Shown under the "Solid 2.0" tab. */
  solid2?: boolean;
  keywords?: readonly string[];
  /** Milliseconds since the epoch. */
  published_at?: number;
  /**
   * Milliseconds since the epoch when the entry was added to this site. Shown nowhere but drives the "New" badge, which
   * an entry carries for NEW_WINDOW_MONTHS after it (falling back to `published_at` when this is not set).
   */
  added_at?: number;
}

/** English label for each category; the page runs them through t(). */
export const CATEGORY_LABELS: Record<ResourceCategory, string> = {
  primitive: "Primitives",
  router: "Routers",
  data: "Data",
  data_visualization: "Data Visualization",
  ui: "UI",
  plugin: "Plugins",
  starters: "Starters",
  build_utility: "Build Utilities",
  add_on: "Add Ons",
  testing: "Testing",
  educational: "Educational",
};

export const TYPE_LABELS: Record<ResourceType | PackageType, string> = {
  article: "Articles",
  video: "Videos",
  podcast: "Podcasts",
  library: "Libraries",
  package: "Packages",
};

/** Plain-text search over the fields visitors know a resource by. Every word must match somewhere. */
export function matches(resource: Resource, query: string): boolean {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const haystack = [resource.title, resource.author, resource.description, resource.link, ...(resource.keywords ?? []), ...resource.categories]
    .join(" ")
    .toLowerCase();
  return words.every((w) => haystack.includes(w));
}

/** How long an entry counts as "New" after it was added. */
export const NEW_WINDOW_MONTHS = 3;

/** Whether an entry was added within the last NEW_WINDOW_MONTHS calendar months of `now` (ms since the epoch). */
export function isNew(r: Resource, now: number): boolean {
  const added = r.added_at ?? r.published_at;
  if (added === undefined || added > now) return false;
  const since = new Date(now);
  since.setUTCMonth(since.getUTCMonth() - NEW_WINDOW_MONTHS);
  return added >= since.getTime();
}
