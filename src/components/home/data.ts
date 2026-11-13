import { URLS } from "../../site";
import type { IconName } from "../Icon";

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
  code: string;
}

/** Valid Solid 2.0 RC snippets. Keep in sync with the solid2 reference. */
export const SNIPPETS: Snippet[] = [
  {
    value: "async",
    label: "Async memos",
    title: "Read a promise like a value",
    description:
      "A memo can return a promise. Reads suspend the nearest <Loading> boundary, and a changed input keeps the old UI on screen while the new answer arrives.",
    code: `import { createMemo, createSignal, Loading } from "solid-js";

function Profile() {
  const [id, setId] = createSignal(1);
  const user = createMemo(() => fetchUser(id()));

  return (
    <>
      <button onClick={() => setId(id() + 1)}>Next user</button>
      <Loading fallback={<p>Loading...</p>}>
        <h2>{user().name}</h2>
      </Loading>
    </>
  );
}`,
  },
  {
    value: "effects",
    label: "Split effects",
    title: "Say what you track, then what you do",
    description:
      "Effects take two halves. The compute half reads signals and decides the dependencies; the apply half runs side effects and can return a cleanup.",
    code: `import { createEffect, createSignal } from "solid-js";

const [count, setCount] = createSignal(0);

createEffect(
  () => count(), // compute: tracked reads only
  (value) => {
    // apply: side effects, runs untracked
    document.title = \`Clicked \${value} times\`;
    return () => console.log("cleanup before next run");
  }
);`,
  },
  {
    value: "stores",
    label: "Draft stores",
    title: "Mutate a draft, get fine-grained updates",
    description:
      "Store setters hand you a draft. Write to it the way you would plain objects and arrays; only the parts that changed notify their readers.",
    code: `import { createStore } from "solid-js";

const [state, setState] = createStore({
  user: { name: "Ada" },
  todos: ["Try Solid 2.0"],
});

setState((s) => {
  s.user.name = "Grace";
  s.todos.push("Ship it");
});`,
  },
  {
    value: "actions",
    label: "Actions",
    title: "Optimistic updates without rollback code",
    description:
      "An action groups a write, a request and a refresh into one transaction. The optimistic write shows immediately and is discarded when the action settles, even if it fails.",
    code: `import { action, createOptimisticStore, refresh } from "solid-js";

const [todos, setTodos] = createOptimisticStore(() => api.list(), []);

const addTodo = action(function* (todo: Todo) {
  setTodos((list) => {
    list.push(todo); // shows right away
  });
  yield api.add(todo); // the request
  refresh(todos); // reconcile with the server
});`,
  },
];

export interface Principle {
  index: string;
  title: string;
  description: string;
  visual: "reactivity" | "compiled" | "async" | "familiar";
}

export const PRINCIPLES: Principle[] = [
  {
    index: "01",
    title: "Fine-grained reactivity",
    description:
      "Components run once. Signals update exactly the DOM nodes that read them, with no re-rendering and no diffing of component trees.",
    visual: "reactivity",
  },
  {
    index: "02",
    title: "No virtual DOM",
    description:
      "JSX compiles to real DOM operations ahead of time. What you write is what runs in the browser.",
    visual: "compiled",
  },
  {
    index: "03",
    title: "Async-first in 2.0",
    description:
      "Async memos, Loading and Errored boundaries, and actions make data fetching and mutations part of the reactive graph.",
    visual: "async",
  },
  {
    index: "04",
    title: "Familiar and lean",
    description:
      "If you know JSX and TypeScript you already know most of Solid. A small runtime and a Vite-based toolchain keep the rest out of your way.",
    visual: "familiar",
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
  { name: "SolidStart", description: "Fullstack framework with routing, SSR and server functions.", href: "https://github.com/solidjs/solid-start", icon: "layers" },
  { name: "Solid Router", description: "Universal router for Solid apps.", href: "https://github.com/solidjs/solid-router", icon: "arrow-right" },
  { name: "Solid Primitives", description: "A community library of well-tested reactive building blocks.", href: "https://github.com/solidjs-community/solid-primitives", icon: "sparkles" },
  { name: "SolidBase", description: "Docs and content site framework built on Solid. This site uses it.", href: "https://github.com/kobaltedev/solidbase", icon: "book" },
  { name: "Solid Meta", description: "Manage document head tags, such as titles and meta.", href: "https://github.com/solidjs/solid-meta", icon: "code" },
  { name: "Testing Library", description: "Solid bindings for Testing Library.", href: "https://github.com/solidjs/solid-testing-library", icon: "check" },
  { name: "Solid Devtools", description: "Inspect the reactive graph of your app.", href: "https://github.com/thetarnav/solid-devtools", icon: "zap" },
];

export const COMMUNITY: { title: string; description: string; href: string; icon: IconName; cta: string }[] = [
  { title: "Discord", description: "Ask questions and talk with the community and core team.", href: URLS.discord, icon: "discord", cta: "Join the server" },
  { title: "GitHub", description: "Read the source, file issues and join the discussions.", href: URLS.github, icon: "github", cta: "Visit solidjs" },
  { title: "Team and contributors", description: "Meet the people who build and maintain Solid.", href: "/team", icon: "users", cta: "Meet the team" },
  { title: "Code of Conduct", description: "How we keep the community welcoming for everyone.", href: "/code-of-conduct", icon: "shield", cta: "Read it" },
];

export type SponsorTier = "gold" | "silver" | "bronze" | "supporter";
export interface Sponsor {
  name: string;
  href: string;
  logo: string;
  tier: SponsorTier;
}
