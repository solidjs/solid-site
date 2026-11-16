import { URLS } from "../../site";
import type { IconName } from "../Icon";
import { ACTIONS_EXAMPLE, ASYNC_EXAMPLE, PROJECTIONS_EXAMPLE, STORES_EXAMPLE, type ReplFile } from "../repl/examples";

/**
 * Static fallbacks for the live stats row. They are baked into the prerendered HTML and replaced
 * client-side when the public APIs answer. `null` renders an em dash, never an invented number.
 * Taken from the GitHub API on 2026-11-16 (stars on solidjs/solid; contributors as the API counts them, anon=false).
 * npm downloads stay null: the npm downloads API was not reachable when these were taken, and a stale guess is worse
 * than a dash.
 */
export const STATS_FALLBACK = {
  stars: 36_273 as number | null,
  downloads: null as number | null,
  contributors: 198 as number | null,
};
export type Stats = typeof STATS_FALLBACK;

/** Create command for a Solid 2 project (documented at v2.solidjs.com quick start). */
export const CREATE_COMMAND = "npm create solid@latest";

export interface Snippet {
  value: string;
  label: string;
  title: string;
  description: string;
  /** Runnable app (entry: main.tsx). Shown statically first, then as a live REPL. */
  files: ReplFile[];
  /** Show the REPL's console/devtools panel. */
  devtools?: boolean;
}

/** Valid Solid 2.0 examples. They run live in the REPL, so keep them in sync with the solid2 reference. */
export const SNIPPETS: Snippet[] = [
  {
    value: "async",
    label: "Async",
    title: "Async reads like a plain value",
    description:
      "Async memos read like plain values, even when one depends on another. Pick a state and the old city list stays on screen while the new one loads, the city resets on its own, and no effect keeps them in sync.",
    files: ASYNC_EXAMPLE,
  },
  {
    value: "stores",
    label: "Draft stores",
    title: "Change a draft, update only what changed",
    description:
      "Store setters hand you a draft. Write to it the way you would a plain object or array, and only the values you touched update: a new quantity re-renders one number, not the row.",
    files: STORES_EXAMPLE,
  },
  {
    value: "projections",
    label: "Projections",
    title: "Derived stores that update by the key",
    description:
      "A projection is a store derived from other state. Selecting a row changes two keys, so two of the thousand rows update. Click a row and watch the count.",
    files: PROJECTIONS_EXAMPLE,
  },
  {
    value: "actions",
    label: "Optimistic actions",
    title: "Optimistic UI without rollback code",
    description:
      "Inside an action, write the change you expect, then do the real work. The guess shows at once and is discarded when the action settles, so a failed save needs no undo code. Tick \"Fail the next save\" to see it.",
    files: ACTIONS_EXAMPLE,
  },
];

export interface Project {
  name: string;
  description: string;
  href: string;
  icon: IconName;
}

/** Projects confirmed in the legacy site's package listings (or installed by this site). */
export const ECOSYSTEM: Project[] = [
  { name: "Kobalte", description: "Unstyled, accessible UI components and primitives for Solid.", href: "https://github.com/kobaltedev/kobalte", icon: "layers" },
  { name: "Solid Router", description: "Universal router for Solid apps.", href: "https://github.com/solidjs/solid-router", icon: "arrow-right" },
  { name: "Solid Primitives", description: "A community library of reactive primitives.", href: "https://github.com/solidjs-community/solid-primitives", icon: "sparkles" },
  { name: "SolidBase", description: "Docs and content site framework built on Solid. This site uses it.", href: "https://github.com/kobaltedev/solidbase", icon: "book" },
  { name: "Solid Meta", description: "Manage document head tags, such as titles and meta.", href: "https://github.com/solidjs/solid-meta", icon: "code" },
  { name: "Testing Library", description: "Solid bindings for Testing Library.", href: "https://github.com/solidjs/solid-testing-library", icon: "check" },
  { name: "Solid Devtools", description: "Inspect the reactive graph of your app.", href: "https://github.com/thetarnav/solid-devtools", icon: "zap" },
  { name: "ESLint Plugin Solid", description: "The Solid linter: catches reactivity mistakes such as destructured props.", href: "https://github.com/solidjs-community/eslint-plugin-solid", icon: "shield" },
];

export const COMMUNITY: { title: string; description: string; href: string; icon: IconName; cta: string }[] = [
  { title: "Discord", description: "Ask questions and talk with the community and core team.", href: URLS.discord, icon: "discord", cta: "Join the server" },
  { title: "GitHub", description: "Read the source, file issues and join the discussions.", href: URLS.github, icon: "github", cta: "Visit Solid" },
  { title: "Team and contributors", description: "Meet the people who build and maintain Solid.", href: "/team", icon: "users", cta: "Meet the team" },
  { title: "Code of Conduct", description: "How we keep the community welcoming for everyone.", href: "/code-of-conduct", icon: "shield", cta: "Read it" },
];

export type SponsorTier = "gold" | "silver" | "bronze" | "supporter";
export interface Sponsor {
  name: string;
  href: string;
  logo: string;
  /** Width divided by height of the logo image, used to give every logo the same visual weight. */
  ratio: number;
  tier: SponsorTier;
}
