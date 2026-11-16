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
  keywords?: readonly string[];
  /** Milliseconds since the epoch. */
  published_at?: number;
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
