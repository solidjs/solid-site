*This is part three of a deep dive into how Solid 2.0 handles async. [Part one](/blog/async-solid-fetch-high-block-low) was about reads. [Part two](/blog/async-solid-write-sync-run-async) was about writes. This one is the network.*

So I sort of already spoiled this one in the last article.

The TodoMVC example already revealed an `api.ts` whose functions ran on a different machine. Their arguments serialized, sent over HTTP, deserialized, ran against a database, and sent back the same way, finally reconciling in an optimistic store. During initial server render they didn't make an HTTP request at all. Since this wasn't code you had to write I didn't mention it.

But today we get to look a bit deeper.

## A Function That Isn't There

It all starts with one directive:

```ts
export function fetchStory(id: number): Promise<Story> {
  "use server";
  return db.stories.find(id);
}
```

The compiler splits this out into its own module and the server build registers it under a stable identifier. The client build gets a reference with the same signature that fetches instead. TypeScript flows through this unchanged. Which is great as there is no type-gen, no schema layer, no file routes. When the function is called during SSR we just call it directly and the server knows how to handle the async.

It's worth pointing out that the HTTP boundary doesn't enforce your types. It exposes a public endpoint with untrusted inputs. Validation inside the function is necessary.

But the part that matters for this article: a server function returns a promise. Parts one and two already told you everything the graph does with promises.

```ts
const story = createMemo(() => fetchStory(props.id));
```

If Server Functions look familiar to you, they should. This is another place, like the tuple return from Signals, where we pioneered the feature but later adopted better syntax.

## Origin of Server Functions

Vite 2 was released in February 2021, which was the final push I needed to get started on creating SolidStart. I was able to very quickly put something together over the next few weeks since Solid's router was already shaped to handle parallel non-blocking data loading and Solid itself already supported streaming SSR. We just ran our route loaders on both sides.

I looked at the metaframeworks of the times and they had things like `getServerSideProps` or API Routes. And I just wasn't convinced of the shape. They either didn't fit with my fine-grained view of the world or they seemed like too much repetitive wiring when we had conceded we were building something that controlled all sides.

What I wanted was RPCs. I hadn't named it at the time. I just wanted a way to swap existing client functions. I just wanted `fetchStory` to run on the server.

```js
// Solid 1.0 async primitive:
const [story] = createResource(() => props.id, fetchStory)
```

I had a late-night chat with [Romuald Brillout](https://github.com/brillout) about his library [wildcard-api](https://github.com/brillout/wildcard-api) which used proxies to create a request in the client and agreed that it was the cleanest approach I had seen to date. I landed my first version on April 22nd, 2021.

```js
// packages/start/runtime/actions.ts (2021)
actionProxy = new Proxy({}, {
  get(_, property: string) {
    return (...args: any[]) => {
      return postData(`/actions/${property}`, args);
    }
  }
})
```

Shortly after, I would put SolidStart on hold to focus on the [Solid 1.0](https://dev.to/ryansolid/solidjs-official-release-the-long-road-to-1-0-4ldd) release, which among other things would bring in the creator of Server Functions, [Nikhil Saraf](https://github.com/nksaraf). He'd been in our ecosystem for all of a month and he had ported `react-three-fiber` and `react-ink`, and made `solid-markdown`.

I remember lamenting in our Discord, that it felt like it could be so much easier if we could just compile the functions in place. Nikhil came back a few days later with `server()`, a compiler driven version of RPC that landed [January 2022](https://youtu.be/lsWXyyEsw7E?t=6934). He had repurposed Next.js' dead-code elimination plugin they had used for SSG into something that changed the way we all build.

```ts
export const fetchStory = server((id: number) => {
  return db.stories.find(id);
})
```

We would go on to add the trailing `$` to make the callsite more obvious and then replace the function with the directive as that made the scope more explicit and better reflected the rules of composition.

The pattern has since spread across the ecosystem: React's server actions/functions, Svelte's remote functions, TanStack's server functions, and more. After Signals/Fine-grained rendering, this may be Solid's biggest contribution to the wider ecosystem. So with Solid 2.0 this isn't something new. Five years of iteration on the idea we originated, brought into core, and built on web standards.

## The Internet Already Knows How to Cache

Server functions default to `POST` — the safest choice for anything that might mutate. But reads already have browser mechanisms that we can leverage.

```ts
import { GET } from "@solidjs/web/server-functions";

export const fetchStory = GET((id: number) => {
  "use server";
  return db.stories.find(id);
});
```

`GET` puts the arguments on the url and sends a `GET` request. That one change gives us access to 30 years of web infrastructure: browser caches, CDN edges, proxies.

The `respond` helper wraps a return value with response metadata:

```ts
import { respond } from "@solidjs/web";
import { GET } from "@solidjs/web/server-functions";

export const fetchStory = GET(async (id: number) => {
  "use server";
  const story = await db.stories.find(id);
  return respond(story, {
    headers: { "cache-control": "public, max-age=60, s-maxage=300" }
  });
});
```

The caller still gets the `Story`. The memo reading this has no idea the headers exist. The metadata rides the transport, the value rides the reactive graph, and your most popular story never touches the database twice.

This is a pattern worth noticing in 2.0. We don't build a proprietary caching layer. Solid's instinct is to handle the protocol and push other decisions to libraries and applications. You can use the platform as it is as the default. Or import `query` and `action` from `@solidjs/router` or even use `@tanstack/solid-query`. This is what allows us to pull these features into core without being too opinionated about how you build.

## A Value That Keeps Arriving

Back in part one I defined async as "a computation that returns a promise", but that is only half of it. We also support async iterators. This gives us a natural interface to connect to event streams. Even things like RxJS observables. The rule is simple: until the first value arrives, we consider it unsettled triggering things like `<Loading>`, just like a Promise. After that, values flow in as they come.

But if we are sending these values over the wire we need a bit more consideration:

```ts
import { live } from "@solidjs/web/server-functions";

export const stockPrice = live(async function* (symbol: string) {
  "use server";
  for await (const tick of subscribe(symbol)) yield tick.price;
});
```

`live` gives us the lifecycle a raw stream doesn't have. If the connection dies—network drops, server restarts—we reconnect with exponential backoff. You are never behind after a reconnect because the contract is value-based: every connection yields current state as its first value. If the design wants to show wire status, there's an `onstatus` side channel for "connected", "reconnecting", "closed" — deliberately kept out of the value stream, because data freshness and connection state are different concerns.

Here is the component that consumes it:

```tsx
function Ticker(props) {
  const price = createMemo(() => stockPrice(props.symbol));

  return <span class="price">{price()}</span>;
}
```

There is no subscription API. No store integration to configure. No unsubscribe to forget. One callsite consumes and every reader of the memo shares its latest value. Sharing more widely means hoisting higher or tying into a cache system like `@solidjs/router`'s `liveQuery`.

## HTML is a Stream Too

Everything we've been talking about is after the page is loaded. But it all works on the way out too.

Server rendering streams. The shell goes out immediately. `<Loading>` fallbacks hold the document open, and content replaces them as promises resolve—before, after, and during hydration. This works before your bundle has loaded. Async values serialize as async values. A Promise in flight serializes as a Promise and resolves in the client graph as it settles. A `live` source sends its first value along in the HTML and then picks up the stream in the client. The reactive graph doesn't restart at the browser boundary, it continues.

Out-of-order streaming creates design problems HTML never had. Content arrives as it is ready, and doesn't necessarily respect your layout. Fast queries pop in below slow ones. The page assembles like popcorn. That's what `<Reveal>` is for:

```tsx
<Reveal collapsed>
  <Loading fallback={<HeroSkeleton />}><Hero /></Loading>
  <Loading fallback={<CardSkeleton />}><Feed /></Loading>
  <Loading fallback={<CardSkeleton />}><Sidebar /></Loading>
</Reveal>
```

Siblings reveal in order as they resolve — the sidebar can finish first and it will still wait its turn. We don't block the stream so HTML is sent as soon as it's ready, but we control when it appears. `collapsed` keeps the tail skeletons from stacking below. Whether content streams from SSR or resolves client-side, reveal order is a design decision now, declared where the design lives.

## When the Wire Breaks

It's always easier to talk about the success case. You write your code in a way that mirrors how you want things to play out. Optimism is an example of that, and being the most speculative, we already handle the failure automatically there.

We know that we can capture an error in a read:

```tsx
<Errored fallback={(err, reset) => <OfflineBanner onRetry={reset} />}>
  <Feed />
</Errored>
```

But do we ever talk about what happens next? In Solid 1.x, and pretty much everywhere else Error Boundaries are treated as the end of the line. You tripped them, and then you have to go do some work, reset them and hopefully everything works this time. In contrast, how do you reset a `<Loading>` boundary?

You don't. Solid 2 doesn't have room for this asymmetry. An error is just the current status of that part of the graph. Part of the same lifecycle that "not ready" belongs to. So `<Errored>` behaves the same way as `<Loading>`. When the data underneath comes back — the live source reconnects, a refresh lands, an upstream signal changes and the read succeeds — the boundary heals and the content returns.

You can still call `reset`. But even that is graph-aware. It retries the data, not the UI. So if some data source has errored upstream, the reset will try to refetch it rather than just showing you the same stale error again if you didn't take the proper steps to address it. This automatic recovery is not something you write but is inherent to the shape of your application.

If part one had transitions without a transition API, this is recovery without recovery code. An outage stops being a state your app can get stuck in and becomes one more pending question with a slow answer.

## Beyond Data

If I had to recap this series in one line: the reactive graph always knows. It is what ties together knowledge of how your application is running. That's not something you get with sophisticated compilers alone.

Bringing Async into the graph, and by extension the network completes this narrative. That has always been a blind spot for JS frameworks and now it is just a natural part of it.

The upside goes beyond that though. In part one, we showed how making latency a property of the value allowed us to stop having reads dictate our architecture. Part two had us position writes as speculative by default, and Optimistic UI stopped being just an advanced technique. Today we moved our content across the network and the Components were none the wiser.

These changes are foundational. Although I didn't cover it today, they've allowed us to standardize on higher-level protocols, like "Single Flight Mutations", that let caching/router libraries close the action loop completely on the server in a single request. You can as easily use these with `@solidjs/router` as with `@tanstack/solid-router`.

I'll leave you with one last thought. A server function, we've now established, is a function whose return value crosses the wire — a value, a promise, a stream of values. Nothing in that sentence says the value has to be data.
