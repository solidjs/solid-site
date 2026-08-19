The hardest problems in UI frameworks were never about rendering. We've always had a DOM we could mutate efficiently. The early challenge was synchronization — showing a consistent interface no matter what was going on, and doing it efficiently. Fine-grained reactivity solved that a decade ago. Update exactly what changed. Skip the rest.

The problem that never went away was async. Every framework, including ours, treated it as a condition that happened *to* it. Something a synchronous core would have to weather.

Today Solid 2.0 reaches Release Candidate, and it takes the other path: async is a property of the reactive system itself. It's part of the graph. That one decision runs through everything in this release. The model does more, so the framework does less.

## Async Lives in the Graph

A computation can return a Promise (or an async iterator), and everything downstream just understands. No special primitive to absorb it. No manual loading state. No null checks.

```tsx
import { createMemo, isPending, Loading } from "solid-js";

function Profile(props) {
  const user = createMemo(() => fetchUser(props.id));

  return (
    <Loading fallback={<Skeleton />}>
      <h1 class={{ stale: isPending(user) }}>{user().name}</h1>
    </Loading>
  );
}
```

That's the whole data-fetching story. `user` is a memo that happens to be async. `<Loading>` covers it until it's ready. When `props.id` changes, the old content stays visible while the new answer is in flight, and `isPending` tells you a change is coming — not "is anything fetching anywhere," but "is a new answer to *this* question on the way."

Derived state, error handling, transitions, and optimistic updates all fall out of this one idea. And because async lives in the graph, the same components work whether their data comes from a client fetch, a server render, or a server function. The server story layers onto your app instead of replacing it.

There's more to the async story than a single section can cover — see What's Next below.

## Less to Learn, More to Use

Everything Solid 2.0 removes is something you had to learn. Everything it adds is something you get to use. These weren't features we cut. They were workarounds you had to learn. Now they're just how Solid works:

- **`createResource` — gone.** Async flows through ordinary memos.
- **`batch` — gone.** Everything batches. Writes apply on a microtask; `flush()` when you need them now.
- **`startTransition` / `useTransition` — gone.** The graph holds a consistent state on its own; `isPending` and `latest` read it.
- **`on` and `createComputed` — gone.** Split effects — `createEffect(compute, apply)` — separate tracking from side effects.
- **`produce` and `createMutable` — gone.** Store setters hand you a draft you mutate. That's just how stores work now.

The [1.x migration guide](https://v2.solidjs.com/migration/from-solid-1) maps every removal to its replacement.

The new APIs are a different story. You don't need optimistic stores, projections, actions, or reveal ordering to build your first app. You might not need them for your tenth. But when you do, they're there, and they work with everything else. Learn less, do more. And the runtime is only half of it.

## One Plugin, Whole Platform

Our tooling made the same trade.

Solid 2.0 ships a new compiler toolchain written in Rust on top of [Oxc](https://oxc.rs/), and `@solidjs/vite-plugin` **defaults to it**. Upgrade the plugin and you're compiling Solid with native tooling. Zero configuration. Nothing to migrate. The Babel preset remains available.

| Workload | babel-plugin-jsx-dom-expressions | Oxc compiler | Speedup |
| --- | ---: | ---: | ---: |
| Fixture corpus (88 files, 175 KB, all 10 modes) | 440 ms | 19 ms | 23x |
| 129 KB single module | 545 ms | 9.4 ms | 58x |
| 1 MB single module | 24,975 ms | 70 ms | 355x |

And the plugin now ships a **start mode** — a turnkey serving layer built directly into the plugin:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import solid from "@solidjs/vite-plugin";

export default defineConfig({
  plugins: [solid({ start: true })]
});
```

That's a complete app setup on plain Vite. No entry files, no `index.html`, no dev server script. The plugin owns entries, dev serving, and the build. You write `src/App.tsx` and go.

Everything layers on from there:

- **An SPA by default.** `start: true` alone is client mode: dev serves your app client-rendered onto a streamed document shell, and `vite build` emits a purely static `dist/client` — deployable to any static host.
- **File-system routing** via the router-neutral [filesystem-routing](https://github.com/solidjs/filesystem-routing) package — SolidStart-proven conventions, HMR and code splitting, `GET`/`POST` API routes as fetch middleware, typed route emission for Solid Router.
- **SSR** with `solid({ start: true, ssr: true })`. The plugin swaps `render` for `hydrate`, turns on the hydratable transforms, and ships the server bundle. The production contract is one function — `handleRequest(request)` — which is why it composes with any host platform. Fetch-style middleware (`start.middleware`), a per-request setup seam for routers (`start.setup`), and typed environment variables validated by [Standard Schema](https://standardschema.dev) — with a build-time check that blocks compilation if a server secret leaks into a client chunk — round out the serving layer.
- **Server functions.** `"use server"` is now a *core* feature backed by `@solidjs/web/server-functions` — typed RPC, streaming returns, progressive enhancement, and custom serialization in any Vite app. The server side of a server function is your function body — validation, auth, and logging are lines of code, not framework hooks. Anything referenced only inside the body never reaches the client; the directive boundary is itself the privacy mechanism.

```ts
import { reload } from "@solidjs/web";

export async function addTodo(title: string) {
  "use server";
  await db.insert(title);
  return reload({ revalidate: "todos" });
}
```

- **When it's time to ship,** one build emits `dist/client` plus a server module that default-exports a web-standard Fetchable handler — the convention Cloudflare Workers, Netlify Functions, Nitro, Bun, and `deno serve` already speak. The platform Vite plugins from [Cloudflare](https://developers.cloudflare.com/workers/vite-plugin/), [Netlify](https://www.npmjs.com/package/@netlify/vite-plugin), and [Nitro](https://nitro.build/) adopt Solid's server environment directly, so there is no Solid adapter layer for you to configure or for us to maintain. Deployment is web standards plus your platform's own tooling. [Full deployment guide.](https://v2.solidjs.com/building-apps/deployment)

## SolidStart Finished Its Job

A metaframework exists to fill the gaps in its framework. SolidStart's job was to provide what core couldn't. Over the 2.0 cycle, each of those capabilities moved home: server functions into core, the serving layer into start mode, file-system routing into a router-neutral package. What remained at the end of that process was a wrapper around things that no longer needed wrapping.

So instead of shipping a hollow 3.0, we're retiring it. **Start mode replaces SolidStart.**

If you run SolidStart in production today, nothing breaks. SolidStart will continue to receive maintenance releases, and the [migration guide](https://v2.solidjs.com/migration/from-solid-start) is available now. For most apps the move is mechanical, and the migration assistant below flags the rest. This isn't an ending — it's the framework finishing the job the metaframework started.

## The Ten-Second Tour

If you followed the beta announcement, you know the foundations. For everyone else, each item links to the docs:

- **[`<Loading>`, `<Errored>`, `<Reveal>`.](https://v2.solidjs.com/concepts/boundaries)** Suspense, ErrorBoundary, and SuspenseList, reconsidered for the new async model — stale content stays visible on revalidation, boundaries heal, reveal order is coordinated.
- **[Actions and optimistic state in core.](https://v2.solidjs.com/concepts/async-reactivity)** `action`, `createOptimistic`, and `createOptimisticStore` make in-flight mutations render immediately and reconcile when the server answers.
- **[Draft-first stores.](https://v2.solidjs.com/concepts/stores)** Setters hand back a value to mutate directly; projections and derived stores (`createStore(fn)`, `createProjection`) replace the write-back patterns of 1.x.
- **[Unified lists.](https://v2.solidjs.com/concepts/components-and-jsx)** One `<For>` with keying modes replaces `<For>`/`<Index>`; `<Repeat>` renders by count with no diffing.
- **[A DOM model closer to HTML.](https://v2.solidjs.com/concepts/components-and-jsx)** Standard attribute semantics, boolean presence/absence, `class` objects and arrays, `ref` directive factories.
- **A cleaner package graph.** The reactive core is `@solidjs/signals`; the web runtime is `@solidjs/web`; stores live in `solid-js` itself.

The design rationale for all of it lives in the [2.0 RFCs](https://github.com/solidjs/solid/blob/next/documentation/solid-2.0/README.md).

## What's Next

Two things are deliberately not in this post.

The async model deserves a real deep dive. A series starts next week: reads, writes, and the wire — how components stay latency-agnostic whether data comes from a memo, an optimistic mutation, or a streaming server.

And for those who notice `serverFunctions: { components: true }` in the config types: yes, server functions can return components. Reactive server components are in experimental preview behind that flag, and they'll get a full announcement after 2.0 stable. They're worth the wait.

## Try It, Migrate to It

Preview documentation for Solid 2.0 is live at [v2.solidjs.com](https://v2.solidjs.com).

For new projects, choose the Solid 2.0 templates from:

```sh
npm create solid@latest
```

For migrating existing projects, follow the guides [here](https://v2.solidjs.com/migration/from-solid-1).

We are also developing a [migration assistant](https://github.com/solidjs-community/solid-migration-assistant) that scans your project and prints specific guidance for every 1.x migration site it detects — legacy imports, one-argument `createEffect`, `onMount`, `Suspense`/`Index`/`classList`, the old store helpers:

```sh
npx solid-migration-assistant
```

The ecosystem didn't wait. [Solid Router 2.0](https://v2.solidjs.com/routing/solid-router) ships alongside the RC with fully typed routes, params, and navigation. [Solid Meta 1.0](https://v2.solidjs.com/migration/from-solid-meta) is now a thin layer over 2.0's built-in head registry. Prefer TanStack? The [fullstack-tanstack template](https://v2.solidjs.com/routing/tanstack) pairs TanStack Router and TanStack Query with start mode out of the box, and [TanStack Start](https://tanstack.com/start) already ships a Solid 2.0 beta (`@tanstack/solid-start@beta`). And the libraries you actually build apps with — [Solid Primitives](https://primitives2.solidjs.community/), [Kobalte](https://kobalte.dev/), [Solid Testing Library](https://github.com/solidjs/solid-testing-library), [Storybook](https://github.com/solidjs-community/storybook), and [AG Grid](https://github.com/dsnchz/solid-ag-grid) — have been working hard to support 2.0 through the betas and are ready to use with the RC today. Utilities, components, metaframeworks, testing, routing, head management: the stack is ready before the release is.

## Thank You

It's hard to describe the Herculean effort that has gone into making this happen over the last five months. I never thought we'd accomplish so much in such a short time. It is always the quality-of-life things that you tend to skimp on, and that was the difference. Solid 2.0 Beta was pretty "Solid" before we even launched it. Years of researching the best patterns for declarative reactivity reached their culmination.

But what I didn't expect was how different this was compared to when we prepared for the Solid 1.0 release. The community was much smaller then, and it felt like it was taking forever. This time, I went on paternity leave for six weeks to bond with my son Nico, and we didn't miss a beat. The beta testers, the AI agents, just kept pushing forward. While I was determined not to let the core scope creep, everything else sort of just came along with it. Things I had penciled in for Solid 3.0 or even 4.0. I actually had a Solid 3.0 plan document sketched out six months ago — we've accomplished everything in it.

And that might just be how these things go in an age of AI, but it's important to acknowledge the people who make that possible. And there are too many to recognize, but I will give a quick shout-out.

Starting with those who directly support my work, [Sentry](https://sentry.io), my benevolent employer, and [Cursor](https://cursor.com/), whose credits made the impossible possible.

And to everyone involved in testing and contributing to the beta:
@brenelz @yumemi-thomas @mizulu @titoBouzout @GabbeV @birkskyum @dangkyokhoang @tsushanth @maciek50322 @kanashimia @SnowingFox @atk @AFatNiBBa @snatvb @better-salmon @m-canton @arpitjain099 @DominicDolan @deluksic @danon @danielalanbates @beanscg @trusktr @sonukapoor @rtritto @ngotruonghuy @mudmaster556 @jpdutoit @gameroman @echab @danielrkling @katywings @clinuxrulz @ahzvenol @tonghuaxingdsb @thomasbuilds @thep0y @subotac @spokodev @samualtnorman @rvlzzr @rrshaban @rexblade58 @mitsuhiko @mesram @mariokresic @madaxen86 @lxsmnsyc @Tommypop2 @LadyBluenotes @le0-0 @jer3m01 @iamssen @gnomical @developerdizzle @devagrawal09 @milomg @mihar-22 @tannerlinsley @crassicus @alfi-dim @aekobear @WolffM @VXsz @PierBover @Jungzl @JLouisa @DakshSinghDhami @CxRes

Release Candidate means the API is frozen, not that there won't be bugs, so we really appreciate everyone updating their projects and reporting issues. If you're an ecosystem builder or you maintain projects on Solid 1.0, please consider migrating now and reporting any issues.

Let's get Solid 2.0 to an official release!
