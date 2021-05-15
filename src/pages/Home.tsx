import { Component } from 'solid-js';
import { Link } from 'solid-app-router';
import { Repl, ReplTab } from 'solid-repl';

import Nav from '../components/Nav';
import logo from '../assets/logo.svg';
import wordmark from '../assets/wordmark.svg';
import Footer from '../components/Footer';

const Home: Component = () => (
  <div class="flex flex-col">
    <h1 class="sr-only">SolidJS homepage</h1>

    <header class="bg-gradient-to-r from-solid-light via-solid-medium to-solid-default text-white">
      <section class="px-3 lg:px-12 container space-y-10 lg:pb-20 lg:pt-52 py-10">
        <div class="flex flex-col justify-center lg:justify-start lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <img class="w-28  lg:w-48" src={logo} alt="Solid logo" />
          <img class="w-32  lg:w-52" src={wordmark} alt="Solid wordmark" />
        </div>

        <h2 class="font-bold text-2xl text-center lg:text-left lg:text-5xl leading-snug">
          The next generation fine-grained <u>reactive</u> Javascript UI library.
        </h2>
      </section>
    </header>

    <Nav />

    <div class="lg:my-10 px-0 lg:px-12 container flex flex-col lg:space-y-10">
      <section class="flex flex-col py-10 px-8 lg:px-20 lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        <div>
          <h3 class="text-xl mb-2 font-semibold">Performant</h3>
          <p class="text-gray-500 text-base">
            Consistently tops recognized UI speed and memory utilization benchmarks.
          </p>
        </div>

        <div>
          <h3 class="text-xl mb-2 font-semibold">Powerful</h3>
          <p class="text-gray-500 text-base">
            Composable reactive primitives married with the flexibility of JSX.
          </p>
        </div>

        <div>
          <h3 class="text-xl mb-2 font-semibold">Pragmatic</h3>
          <p class="text-gray-500 text-base">
            A sensible and tailored API makes developing fun and simple.
          </p>
        </div>

        <div>
          <h3 class="text-xl mb-2 font-semibold">Productive</h3>
          <p class="text-gray-500 text-base">
            Ergonomics and familiarity make building simple or complex things a breeze.
          </p>
        </div>
      </section>

      <section class="bg-gray-50 py-20 px-8 lg:px-20 defer">
        <h2 class="text-3xl font-bold text-solid">A purely reactive library.</h2>

        <p class="text-2xl font-bold text-gray-500 mt-2">
          Solid was designed from the ground up with a reactive core. It's influenced by reactive
          principles developed by previous libraries.
        </p>

        <ul class="flex flex-wrap mt-5">
          <li class="mt-3 mr-3">
            <a
              target="_blank"
              rel="noopener"
              href="https://bundlephobia.com/result?p=solid-js@0.22.7"
              class="inline-block rounded-md border-gray-300 hover:border-gray-400 border px-5 py-5"
            >
              <strong class="font-semibold">7.3kb</strong>
              <span class="block text-sm">Minified + Gzipped</span>
            </a>
          </li>

          <li class="mt-3 mr-3">
            <a
              target="_blank"
              rel="noopener"
              href="https://bundlephobia.com/result?p=solid-js@0.22.7"
              class="inline-block rounded-sm border-gray-300 hover:border-gray-400 border px-5 py-5"
            >
              <strong class="font-semibold">4.5kb+</strong>
              <span class="block text-sm">Github Stars</span>
            </a>
          </li>

          <li class="mt-3 mr-3">
            <a
              target="_blank"
              rel="noopener"
              href="https://github.com/ryansolid/solid/stargazers"
              class="inline-block rounded-sm border-gray-300 hover:border-gray-400 border px-5 py-5"
            >
              <strong class="font-semibold">4+ years</strong>
              <span class="block text-sm">In development</span>
            </a>
          </li>

          <li class="mt-3 mr-3">
            <a
              target="_blank"
              rel="noopener"
              href="https://github.com/ryansolid/solid/stargazers"
              class="inline-block rounded-sm border-gray-300 hover:border-gray-400 border px-5 py-5"
            >
              <strong class="font-semibold">TypeScript</strong>
              <span class="block text-sm">Support</span>
            </a>
          </li>
        </ul>
      </section>

      <section class="py-20 px-8 lg:px-20 flex flex-col lg:flex-row lg:space-x-32">
        <Repl
          title="Interactive Example"
          height={600}
          isInteractive
          class="rounded-lg overflow-hidden flex-1 shadow-2xl order-2 lg:order-1 mt-10 lg:mt-0"
        >
          <ReplTab name="main">
            {`
              import { render } from "solid-js/web";
              import { createState, onCleanup } from "solid-js";

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

        <div class="flex flex-col justify-center flex-1 order-1 lg:order-2">
          <h3 class="text-3xl font-bold leading-10 text-solid">It's familiar...</h3>

          <p class="mt-9 leading-7">
            While a new UI library is supposed to jump out and break the mould. Solid doesn't stand
            out when it comes to API's or developer experience. If you've developed with React Hooks
            before Solid should seem very natural. In fact, more natural as Solid's model is much
            simpler with no Hook rules. Every Component executes once and it is the Hooks and
            bindings that execute many times as their dependencies update.
          </p>

          <p class="mt-4">
            Solid follows the same philosophy as React with unidirectional data flow, read/write
            segregation, and immutable interfaces. It just has a completely different implementation
            that forgoes using a Virtual DOM.
          </p>

          <Link
            class="button inline-block mt-5 text-solid-dark hover:underline"
            href="/docs/latest/components"
          >
            Read the docs »
          </Link>
        </div>
      </section>

      <section class="bg-gray-50 py-20 px-8 lg:px-20 defer">
        <h2 class="text-3xl text-solid font-bold">Fine-grained means you do more with less.</h2>

        <p class="text-2xl font-bold text-gray-500 mt-2">
          Every part of Solid is built on fine-grained reactivity from its simple primitives to the
          JavaScript expressions in your JSX views.
        </p>

        <p class="text-gray-500 mt-6">
          This unlocks complete control over what gets updated and when, even at the DOM binding
          level. With <strong>no Virtual DOM</strong> or extensive diffing, the framework never does
          more work than you want it to.
        </p>

        <a
          class="mt-3 block text-solid text-sm hover:underline"
          target="_blank"
          rel="noopener"
          href="https://playground.solidjs.com/?hash=271025478"
        >
          See it in action
        </a>
      </section>

      <section class="py-20 px-8 lg:px-20 flex flex-col lg:flex-row lg:space-x-32">
        <div class="flex flex-col justify-center flex-1">
          <h2 class="text-3xl font-bold text-solid">It's modern and dependable...</h2>

          <p class="leading-7 mt-9">
            While a new UI library is supposed to jump out and break the mould. Solid doesn't stand
            out when it comes to API's or developer experience. If you've developed with React Hooks
            before Solid should seem very natural. In fact, more natural as Solid's model is much
            simpler with no Hook rules. Every Component executes once and it is the Hooks and
            bindings that execute many times as their dependencies update.
          </p>

          <Link class="mr-auto mt-5 text-solid-dark hover:underline" href="/docs/latest/components">
            Read the docs »
          </Link>
        </div>

        <Repl
          title="Interactive Example"
          height={500}
          isInteractive
          class="rounded-lg overflow-hidden shadow-2xl mt-10 lg:mt-0 flex-1"
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
      </section>

      <section class="bg-gray-50 py-20 px-8 lg:px-20">
        <h2 class="text-3xl font-bold text-solid">Fully loaded with all features.</h2>

        <p class="text-2xl font-bold text-gray-500">
          Solid supports most React features and expands on aspects to increase DX.
        </p>

        <ul class="flex flex-wrap mt-4">
          <li class="rounded-md border-gray-300 border mr-3 mt-3 px-5 py-5">
            <span class="block text-sm">Fragments</span>
          </li>

          <li class="rounded-md border-gray-300 border mr-3 mt-3 px-5 py-5">
            <span class="block text-sm">Portals</span>
          </li>

          <li class="rounded-md border-gray-300 border mr-3 mt-3 px-5 py-5">
            <span class="block text-sm">Context</span>
          </li>

          <li class="rounded-md border-gray-300 border mr-3 mt-3 px-5 py-5">
            <span class="block text-sm">Suspense</span>
          </li>

          <li class="rounded-md border-gray-300 border mr-3 mt-3 px-5 py-5">
            <span class="block text-sm">Error Boundaries</span>
          </li>

          <li class="rounded-md border-gray-300 border mr-3 mt-3 px-5 py-5">
            <span class="block text-sm">Lazy Components</span>
          </li>

          <li class="rounded-md border-gray-300 border mr-3 mt-3 px-5 py-5">
            <span class="block text-sm">Async & Concurrent Rendering</span>
          </li>

          <li class="rounded-md border-gray-300 border mr-3 mt-3 px-5 py-5">
            <span class="block text-sm">Implicit Delegation</span>
          </li>

          <li class="rounded-md border-gray-300 border mr-3 mt-3 px-5 py-5">
            <span class="block text-sm">SSR & Hydration</span>
          </li>
        </ul>
      </section>
    </div>

		<Footer />
  </div>
);

export default Home;
