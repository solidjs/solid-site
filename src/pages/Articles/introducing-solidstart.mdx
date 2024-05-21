<Notice>
  SolidStart has been through some major changes since this announcement. On May 21, 2024 SolidStart
  1.0 was officially released with breaking changes. Hence the code examples and APIs shown in this
  post may be outdated. Visit start.solidjs.com for the most up to date SolidStart docs.
</Notice>

We've been working on SolidJS for a while. The first couple of years were just for me to prove something. The next couple was about spreading the knowledge of what I'd learned.

The last 2 years have been a lot of: "Solid looks really great, I look forward to trying it when you get `_____________`". Let me tell you, that blank is an always moving target. But it has seemed to settle on a "Next.js"-like framework as of late. And finally, we've got an answer for you.

We're happy to announce that SolidStart is in beta!

# Introducing SolidStart

SolidStart is a first-party project starter/framework for SolidJS that punches above its weight and provides a first-class way to deploy your Solid apps. Yes, another framework. But also not really.

What defines SolidStart is its modularity. The few libraries we do use are the same already in the Solid ecosystem. We didn't create a new Router or MetaTag injector. And any improvements we made in these go back into those libraries for everyone to benefit from. It wouldn't be unreasonable to consider SolidStart just a CLI + Vite Plugins.

That's right. SolidStart is built on [Vite](https://vitejs.dev). This gives us access to a huge number of plugins from the Vite and Rollup ecosystems. That means asset handling, things like CSS, are already just managed for us.

# So What Does it Do Exactly?

With SolidStart you can boot up a project template that can be in JavaScript or TypeScript, Client-rendered or Server-rendered, and deployable to [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), [Cloudflare](https://www.cloudflare.com/), [Deno Deploy](https://deno.com/deploy) server-less and edge functions as simply as swapping an adapter.

Although let's face it. I'm describing every modern Web framework. Use of the browser Request/Response model with ability to add custom middleware. Platform agnostic Sessions (Thank you [Remix](https://remix.run/)). Hot Module Reloading. This wouldn't be a Solid project if we weren't building on what we've learned across the whole frontend ecosystem.

## Nested FileSystem Routing

Solid's [router](https://github.com/solidjs/solid-router) has always been pretty powerful. Nested Routing with parallelized data-fetching that works isomorphically and ties into Solid's Suspense and Transitions automatically. If you've used Solid in the past 3 years you know what I'm talking about.

So all we needed to do was add a convention for Filesystem routing to make it easier to get started. We adopted patterns of folder shadowing for nesting (from [Nuxt](https://nuxtjs.org/docs/features/file-system-routing/#nested-routes)) and combined it with `[]` for parameterized routes and `()` for grouping. We also realized that the `()` was kind of perfect for `index.tsx` routes as well. So you never need to name a single file in your project the same name.

![Routes list example](/img/blog/introducing-solidstart/routes.jpeg)

Filesystem routing is incredibly convenient but sometimes it is limiting so we export it as a `<FileRoutes />` component you can insert in your routes definition yourself or not. (Thanks [Hydrogen](https://shopify.dev/api/hydrogen/components/framework/fileroutes)).

```ts filename="index.js"
<Routes>
  <FileRoutes />
  {/* other manual route definitions */}
</Routes>
```

## Server Functions

While Solid offers API routes by using named exports with capitalized HTTP verbs like `GET`, `POST`, and `DELETE` (Thank you [SvelteKit](https://kit.svelte.dev/docs/routing#server)), the core method of doing browser to server communication in SolidStart is by RPC (Remote Procedure Call).

What is great about inline RPC calls is that they are fairly easy to automate types.

```ts filename="index.js"
const greeting = server$(async (name: string) => {
  console.log("I'm always on the server");
  return `Hello ${name}`;
});

greeting(); // Error: Expected 1 argument, but got 0.

greeting(0); // Error: Argument is not assignable to type 'string'

console.log(await greeting('Adam'));
```

And you can define these in any of your files and use them wherever you want.

## RouteData and RouteActions

One thing that became obvious after unleashing the raw power of server functions is that you could pretty much do anything but people needed a prescribed option. Since Solid's router already supports `routeData` functions we didn't need to do any work to support solutions like [Turbo Query](https://github.com/StudioLambda/TurboSolid) or [Tanstack Query](https://tanstack.com/query/v4/docs/adapters/solid-query). Or to even augment their fetching with Server Functions. Or allow multiple different resources per route section each with its own invalidation.

```ts filename="index.js"
export const routeData = ({ params }) => {
  const [post] = createResource(
    () => `posts/${params.id}`,
    server$(getPostFromDB), // <= only on the server
  );
  return post;
};
```

But we also wanted to provide a solution that was more streamlined for simple cases. And for that we took a bit of inspiration from [Remix](https://remix.run/) and [Tanstack Query](https://tanstack.com/query/v4/docs/adapters/solid-query) and blended them into something that was uniquely Solid. We created `createRouteData` and its server-only companion `createServerData$` built on top of our resources. While not the simplicity of a single async function we get granular invalidation.

```ts filename="index.js"
export const routeData = ({ params }) => {
  return createServerData$(getPostFromDB, {
    key() {
      return ['posts', params.id];
    },
  });
};
```

But what is data fetching without mutation? Inspired by [GraphQLs RPC-style mutations](https://graphql.org/learn/queries/#mutations) and [Remix](https://remix.run/)'s actions, again we leveraged our server functions to provide as many actions per page as you want, defined anywhere in the component tree each able to independently invalidate.

```ts filename="index.js"
const [togglingTodo, toggleTodo] = createServerAction$(
  async (id: number) => await db.toggleTodo(id),
  { invalidate: ['todos', id] },
);

// mutate
toggleTodo(id);

// optimistic updates
const completed = () => (togglingTodo.pending ? !todo.completed : todo.completed);
```

And this story wouldn't be complete if they also didn't produce Progressive Enhanced Forms that work with no JavaScript.

```ts filename="index.js"
const [togglingTodo, toggleTodo] = createServerAction$(
  async (form: FormData) => {
    await db.toggleTodo(Number(form.get('id')));
    return redirect('/');
  },
  { invalidate: ['todos', id] },
);

<toggleTodo.Form>
  <input type="hidden" name="id" value={todo.id} />
  <button type="submit">
    <ToggleIcon />
  </button>
</toggleTodo.Form>;
```

# We're Just Getting Started

<Tweet tweetLink="fredkschott/status/1589662230962147332" />

SolidStart might represent the culmination of the best in modern frontend gathered from across the ecosystem but we aren't ones to rest on our laurels. We already have new experimental features showing off <a href="https://dev.to/this-is-learning/client-side-routing-without-the-javascript-3k1i">Partial Hydration and our new take on hybrid nested routing</a>.

SolidStart is in Beta today. There will be bugs and a few missing features. The documentation is still a work in progress and something we are expanding to provide better guides and tutorials. But it's ready for you to try in your projects. Visit <a href="https://start.solidjs.com/getting-started/what-is-solidstart">start.solidjs.com</a> for documentation and updates. Visit one of our official templates on our deployment partners. Or open your terminal and type this to get started:

```bash
> npm init solid
```

Come join us on [Discord](https://discord.com/invite/solidjs) to discuss the latest on SolidJS.
