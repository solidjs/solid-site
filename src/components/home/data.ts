import { URLS } from "../../site";
import type { IconName } from "../Icon";
import { ACTIONS_EXAMPLE, ASYNC_EXAMPLE, EFFECTS_EXAMPLE, STORES_EXAMPLE, type ReplFile } from "../repl/examples";

/**
 * Static fallbacks for the live stats row. They are baked into the prerendered HTML and replaced
 * client-side when the public APIs answer. `null` renders an em dash, never an invented number.
 * TODO(content): fill with real, dated values at build time.
 */
export const STATS_FALLBACK = {
  stars: null as number | null,
  downloads: null as number | null,
  contributors: null as number | null,
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
    label: "Async memos",
    title: "Read a promise like a value",
    description:
      "A memo can return a promise. Reads suspend the nearest <Loading> boundary, and a changed input keeps the old UI on screen while the new answer arrives.",
    files: ASYNC_EXAMPLE,
  },
  {
    value: "effects",
    label: "Split effects",
    title: "Say what you track, then what you do",
    description:
      "Effects take two halves. The compute half reads signals and decides the dependencies; the apply half runs side effects and can return a cleanup.",
    files: EFFECTS_EXAMPLE,
  },
  {
    value: "stores",
    label: "Draft stores",
    title: "Mutate a draft, get fine-grained updates",
    description:
      "Store setters hand you a draft. Write to it the way you would plain objects and arrays; only the parts that changed notify their readers.",
    files: STORES_EXAMPLE,
  },
  {
    value: "actions",
    label: "Actions",
    title: "Optimistic updates without rollback code",
    description:
      "An action groups a write, a request and a refresh into one transaction. The optimistic write shows immediately and is discarded when the action settles, even if it fails.",
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
  { name: "Solid Primitives", description: "A community library of well-tested reactive building blocks.", href: "https://github.com/solidjs-community/solid-primitives", icon: "sparkles" },
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
