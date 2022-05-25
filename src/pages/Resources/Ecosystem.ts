import { code, videoCamera, bookOpen, microphone, terminal } from 'solid-heroicons/outline';

export enum ResourceType {
  Article = 'article',
  Video = 'video',
  Podcast = 'podcast',
}
export enum PackageType {
  Library = 'library',
  Package = 'package',
}
export enum ResourceCategory {
  Primitives = 'primitive',
  Routers = 'router',
  Data = 'data',
  UI = 'ui',
  Plugins = 'plugin',
  Starters = 'starters',
  BuildUtilities = 'build_utility',
  AddOn = 'add_on',
  Testing = 'testing',
  Educational = 'educational',
}
export const ResourceCategoryName = Object.fromEntries(
  Object.entries(ResourceCategory).map(([key, value]) => [value, key]),
);
export interface Resource {
  title: string;
  link: string;
  author?: string;
  author_url?: string;
  description?: string;
  type: ResourceType | PackageType;
  categories: readonly ResourceCategory[];
  official?: boolean; // If the resource is an official Solid resource
  keywords?: readonly string[];
  published_at?: number;
}

export const ResourceTypeIcons = {
  article: bookOpen,
  podcast: microphone,
  video: videoCamera,
  library: code,
  package: terminal,
};
