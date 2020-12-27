import { Component } from 'solid-js';
import { Repl, ReplTab } from 'solid-repl';
import Nav from '../components/Nav';

import logo from '../assets/logo.svg';
import wordmark from '../assets/wordmark.svg';
import { Link } from 'solid-app-router';

const Home: Component = () => (
  <div class="flex flex-col">
    <div class="bg-gradient-to-r from-solid-light via-solid-medium bg-hero-pattern to-solid text-white">
      <div class="container">
        <div class="flex content-end flex-wrap h-96 px-5">
          <img class="w-48" src={logo} alt="Solid logo" />
          <img class="w-52 ml-4" src={wordmark} alt="Solid wordmark" />
        </div>
        <div class="py-10 px-10 mb-10">
          <h2 class="font-bold text-5xl leading-snug pr-10">
            The next generation fine-grained <u>reactive</u> Javascript UI library.
          </h2>
        </div>
      </div>
    </div>
    <Nav />
    <div class="my-10 container">
      <div class="grid px-10 py-10 grid-cols-3 gap-4">
        <div>
          <b class="block text-xl mb-2 font-semibold">Extreme Performance</b>
          <span class="text-gray-500 text-base">
            Consitently tops recognized UI speed and memory utilization benchmarks.
          </span>
        </div>
        <div>
          <b class="block text-xl mb-2 font-semibold">Ergonomic Development</b>
          <span class="text-gray-500 text-base">
            Write simple and complex applications with TypeScript and JSX.
          </span>
        </div>
        <div>
          <b class="block text-xl mb-2 font-semibold">Isomorphic Applications</b>
          <span class="text-gray-500 text-base">
            Render applications client and server-side with SSR and SSG.
          </span>
        </div>
      </div>
      <div class="bg-gray-50 mt-10 px-10 py-10">
        <div class="px-10 py-10">
          <h2 class="text-3xl font-bold text-solid">A purely reactive library.</h2>
          <h2 class="text-2xl font-bold text-gray-400 mt-2">
            Solid was designed from the ground up with a reactive core. It's influenced by reactive
            principles developed by previous libraries.
          </h2>
          <a
            target="_blank"
            rel="noopener"
            href="https://bundlephobia.com/result?p=solid-js@0.22.7"
            class="detail inline-block rounded-md border-gray-300 border mr-3 mt-5 px-5 py-5"
          >
            <strong class="font-semibold">7.3kb</strong>
            <span class="block text-sm">Minified + Gzipped</span>
          </a>
          <a
            target="_blank"
            rel="noopener"
            href="https://bundlephobia.com/result?p=solid-js@0.22.7"
            class="detail inline-block rounded-sm border-gray-300 border mr-3 mt-5 px-5 py-5"
          >
            <strong class="font-semibold">4.5kb+</strong>
            <span class="block text-sm">Github Stars</span>
          </a>
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/ryansolid/solid/stargazers"
            class="detail inline-block rounded-sm border-gray-300 border mt-5 px-5 py-5"
          >
            <strong class="font-semibold">4+ years</strong>
            <span class="block text-sm">In development</span>
          </a>
        </div>
      </div>
      <div class="my-10 py-10 px-12">
        <div class="grid grid-cols-12">
          <Repl height={500} isInteractive class="rounded-lg col-span-6 overflow-hidden shadow-2xl">
            <ReplTab name="main">
              {`
                import { createState, onCleanup } from "solid-js";
                import { render } from "solid-js/web";

                const CountingComponent = () => {
                  const [state, setState] = createState({ counter: 0 });
                  const interval = setInterval(
                    () => setState({ counter: state.counter + 1 }),
                    1000
                  );
                  onCleanup(() => clearInterval(interval));
                  return <div>Count value is {state.counter}</div>;
                };

                render(() => <CountingComponent />, document.getElementById("app"));
              `}
            </ReplTab>
          </Repl>
          <div class="col-span-5 col-end-13 flex flex-col justify-center">
            <h4 class="text-3xl font-bold text-solid mb-9">It's familiar...</h4>
            <p class="mb-4">
              While a new UI library is supposed to jump out and break the mould. Solid doesn't
              stand out when it comes to API's or developer experience. If you've developed with
              React Hooks before Solid should seem very natural. In fact, more natural as Solid's
              model is much simpler with no Hook rules. Every Component executes once and it is the
              Hooks and bindings that execute many times as their dependencies update.
            </p>
            <p>
              Solid follows the same philosophy as React with unidirectional data flow, read/write
              segregation, and immutable interfaces. It just has a completely different
              implementation that forgoes using a Virtual DOM.
            </p>
            <Link class="button inline-block mt-5 text-solid-dark" href="/docs/0.17.0/components">
              Read the docs »
            </Link>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 mt-10 px-10 py-10">
        <div class="px-10 py-10">
          <h2 class="text-3xl text-solid font-bold">Fastest and smallest.</h2>
          <h2 class="text-2xl font-bold text-gray-500 mt-2">
            Solid performs consistently within the top three UI frameworks for the past few years.
          </h2>
          <a
            target="_blank"
            rel="noopener"
            href="https://bundlephobia.com/result?p=solid-js@0.22.7"
            class="detail inline-block rounded-md border-gray-300 border mr-3 mt-5 px-5 py-5"
          >
            <strong class="font-semibold">7.3kb</strong>
            <span class="block text-sm">Minified + Gzipped</span>
          </a>
          <a
            target="_blank"
            rel="noopener"
            href="https://bundlephobia.com/result?p=solid-js@0.22.7"
            class="detail inline-block rounded-sm border-gray-300 border mr-3 mt-5 px-5 py-5"
          >
            <strong class="font-semibold">4.5kb+</strong>
            <span class="block text-sm">Github Stars</span>
          </a>
          <a
            target="_blank"
            rel="noopener"
            href="https://github.com/ryansolid/solid/stargazers"
            class="detail inline-block rounded-sm border-gray-300 border mt-5 px-5 py-5"
          >
            <strong class="font-semibold">4.5kb+</strong>
            <span class="block text-sm">Github Stars</span>
          </a>
        </div>
      </div>
      <div class="my-10 py-10 px-12">
        <div class="grid grid-cols-12">
          <div class="col-span-5 flex flex-col justify-center">
            <h4 class="text-3xl font-bold text-solid mb-9">It's familiar...</h4>
            <p class="mb-4">
              While a new UI library is supposed to jump out and break the mould. Solid doesn't
              stand out when it comes to API's or developer experience. If you've developed with
              React Hooks before Solid should seem very natural. In fact, more natural as Solid's
              model is much simpler with no Hook rules. Every Component executes once and it is the
              Hooks and bindings that execute many times as their dependencies update.
            </p>
            <p>
              Solid follows the same philosophy as React with unidirectional data flow, read/write
              segregation, and immutable interfaces. It just has a completely different
              implementation that forgoes using a Virtual DOM.
            </p>
            <Link class="button inline-block mt-5 text-solid-dark" href="/docs/0.17.0/components">
              Read the docs »
            </Link>
          </div>
          <Repl
            height={500}
            isInteractive
            class="rounded-lg col-end-13 col-span-6 overflow-hidden shadow-2xl"
          >
            <ReplTab name="main">
              {`
                import { createState, onCleanup } from "solid-js";
                import { render } from "solid-js/web";

                const CountingComponent = () => {
                  const [state, setState] = createState({ counter: 0 });
                  const interval = setInterval(
                    () => setState({ counter: state.counter + 1 }),
                    1000
                  );
                  onCleanup(() => clearInterval(interval));
                  return <div>Count value is {state.counter}</div>;
                };

                render(() => <CountingComponent />, document.getElementById("app"));
              `}
            </ReplTab>
          </Repl>
        </div>
      </div>
      <div class="bg-gray-50 mt-10 px-10 py-10">
        <div class="px-10 py-10">
          <h2 class="text-3xl font-bold text-solid">Fully loaded with all features.</h2>
          <h2 class="text-2xl font-bold text-gray-500 mb-4">
            Solid supports most React features and expands on aspects to increase DX.
          </h2>
          <div class="detail inline-block rounded-md border-gray-300 border mr-3 mt-3 px-5 py-5">
            <span class="block text-sm">Fragments</span>
          </div>
          <div class="detail inline-block rounded-md border-gray-300 border mr-3 mt-3 px-5 py-5">
            <span class="block text-sm">Portals</span>
          </div>
          <div class="detail inline-block rounded-md border-gray-300 border mr-3 mt-3 px-5 py-5">
            <span class="block text-sm">Context</span>
          </div>
          <div class="detail inline-block rounded-md border-gray-300 border mr-3 mt-3 px-5 py-5">
            <span class="block text-sm">Suspense</span>
          </div>
          <div class="detail inline-block rounded-md border-gray-300 border mr-3 mt-3 px-5 py-5">
            <span class="block text-sm">Error Boundaries</span>
          </div>
          <div class="detail inline-block rounded-md border-gray-300 border mr-3 mt-3 px-5 py-5">
            <span class="block text-sm">Lazy Components</span>
          </div>
          <div class="detail inline-block rounded-md border-gray-300 border mr-3 mt-3 px-5 py-5">
            <span class="block text-sm">Async & Concurrent Rendering</span>
          </div>
          <div class="detail inline-block rounded-md border-gray-300 border mr-3 mt-3 px-5 py-5">
            <span class="block text-sm">Implicit Delegation</span>
          </div>
          <div class="detail inline-block rounded-md border-gray-300 border mr-3 mt-3 px-5 py-5">
            <span class="block text-sm">SSR & Hydration</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
