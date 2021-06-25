import { Component, lazy, Suspense } from 'solid-js';
import { Link } from 'solid-app-router';
import logo from '../assets/logo.svg';
import performant from '../assets/icons/performant.svg';
import iconBlocks1 from '../assets/icons/blocks1.svg';
import iconBlocks2 from '../assets/icons/blocks2.svg';
import flag from '../assets/icons/flag.svg';
import sandbox from '../assets/icons/sandbox.svg';
import powerful from '../assets/icons/powerful.svg';
import pragmatic from '../assets/icons/pragmatic.svg';
import productive from '../assets/icons/productive.svg';
import wordmark from '../assets/wordmark.svg';

import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Benchmarks, { GraphData } from '../components/Benchmarks';

const OldRepl = lazy(() => import('../components/ReplTab'));

interface HomepageProps {
  benchmarks: Array<GraphData>;
}

const Home: Component<HomepageProps> = (props) => (
  <div class="flex flex-col">
    <h1 class="sr-only">SolidJS homepage</h1>

    <header class="mx-3 rounded-br-3xl rounded-bl-3xl bg-gradient-to-r from-solid-light via-solid-medium to-solid-default text-white">
      <div class="bg-hero bg-no-repeat bg-right px-10">
        <section class="px-3 lg:px-12 container space-y-10 lg:pb-20 lg:pt-52 py-10">
          <div class="flex flex-col justify-center lg:justify-start lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <img class="w-28  lg:w-48" src={logo} alt="Solid logo" />
            <img class="w-32  lg:w-52" src={wordmark} alt="Solid wordmark" />
          </div>
          <h2 class="font-semibold text-3xl text-center lg:text-left lg:text-4xl leading-loose">
            A declarative, efficient, and flexible JavaScript library for building user interfaces.
          </h2>
        </section>
      </div>
    </header>

    <Nav />

    <div class="lg:my-10 px-0 lg:px-12 container flex flex-col lg:space-y-10 bg-blocks-one bg-no-repeat bg-left-top">
      <div class="my-10 p-10 max-w-4xl m-auto text-center text-2xl">
        <b class="inline font-semibold text-solid">Solid is a purely reactive library. </b>
        It was designed from the ground up with a reactive core. It's influenced by reactive
        principles developed by previous libraries.
      </div>

      <section class="flex flex-col= lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 border border-4 rounded-lg">
        <div class="px-8 py-10 border-r">
          <img class="w-12 mb-5" src={performant} />
          <h3 class="text-xl mb-2 font-semibold">Performant</h3>
          <p class="text-base">
            Consistently tops recognized UI speed and memory utilization benchmarks.
          </p>
        </div>

        <div class="px-8 py-10 border-r">
          <img class="w-12 mb-5" src={powerful} />
          <h3 class="text-xl mb-2 font-semibold">Powerful</h3>
          <p class="text-base">
            Composable reactive primitives married with the flexibility of JSX.
          </p>
        </div>

        <div class="px-8 py-10 border-r">
          <img class="w-12 mb-5" src={pragmatic} />
          <h3 class="text-xl mb-2 font-semibold">Pragmatic</h3>
          <p class="text-base">A sensible and tailored API makes developing fun and simple.</p>
        </div>

        <div class="px-8 py-10">
          <img class="w-12 mb-5" src={productive} />
          <h3 class="text-xl mb-2 font-semibold">Productive</h3>
          <p class="text-base">
            Ergonomics and familiarity make building simple or complex things a breeze.
          </p>
        </div>
      </section>
    </div>

    <div class="lg:my-10 px-0 lg:px-12 container flex flex-col lg:space-y-10">
      <section class="bg-solid-lightgray border border-gray-200 text-black flex rounded-lg defer">
        <ul class="flex justify-center w-full">
          <li class="hover:bg-solid-dark hover:text-white transition">
            <a
              target="_blank"
              rel="noopener"
              href="https://bundlephobia.com/result?p=solid-js@0.22.7"
              class="inline-block px-5 py-5"
            >
              <strong class="font-semibold">7.3kb</strong>
              <span class="block text-sm">Minified + Gzipped</span>
            </a>
          </li>

          <li class="hover:bg-solid-dark hover:text-white transition">
            <a
              target="_blank"
              rel="noopener"
              href="https://bundlephobia.com/result?p=solid-js@0.22.7"
              class="inline-block px-5 py-5"
            >
              <strong class="font-semibold">6k+</strong>
              <span class="block text-sm">Github Stars</span>
            </a>
          </li>

          <li class="hover:bg-solid-dark hover:text-white transition">
            <a
              target="_blank"
              rel="noopener"
              href="https://github.com/ryansolid/solid/stargazers"
              class="inline-block px-5 py-5"
            >
              <strong class="font-semibold">4+ years</strong>
              <span class="block text-sm">In development</span>
            </a>
          </li>

          <li class="hover:bg-solid-dark hover:text-white transition">
            <a
              target="_blank"
              rel="noopener"
              href="https://github.com/ryansolid/solid/stargazers"
              class="inline-block px-5 py-5"
            >
              <strong class="font-semibold">TypeScript</strong>
              <span class="block text-sm">Support</span>
            </a>
          </li>

          <li class="hover:bg-solid-dark hover:text-white transition">
            <a
              target="_blank"
              rel="noopener"
              href="https://krausest.github.io/js-framework-benchmark/2021/table_chrome_91.0.4472.77.html"
              class="inline-block px-5 py-5"
            >
              <strong class="font-semibold">Top Rated</strong>
              <span class="block text-sm">In Performance</span>
            </a>
          </li>
        </ul>
      </section>

      <section class="py-20 px-8 lg:px-15 flex flex-col lg:flex-row lg:space-x-32">
        <div
          style="height:600px; width:100%;"
          class="rounded-lg overflow-hidden flex-1 shadow-2xl order-2 lg:order-1 mt-10 lg:mt-0"
        >
          <Suspense fallback={'Loading...'}>
            <OldRepl
              tabs={[
                {
                  name: 'main1',
                  type: 'tsx',
                  source: `import { render } from "solid-js/web";
import { onCleanup } from "solid-js";
import { createStore } from "solid-js/store";

const CountingComponent = () => {
  const [state, setState] = createStore({ counter: 0 });
  const interval = setInterval(
    () => setState({ counter: state.counter + 1 }),
    1000
  );
  onCleanup(() => clearInterval(interval));
  return <div>Count value is {state.counter}</div>;
};

render(() => <CountingComponent />, document.getElementById("app"));`,
                },
              ]}
            />
          </Suspense>
        </div>

        <div class="flex flex-col justify-center flex-1 order-1 lg:order-2">
          <img class="w-20" src={iconBlocks1} />
          <h3 class="text-3xl mt-6 font-semibold leading-10 text-solid">
            It's familiar and modern
          </h3>

          <p class="mt-9 leading-7">
            Solid stands on the shoulders of giants, particularly React and Knockouts. If you've
            developed with React Hooks before Solid should seem very natural. In fact, more natural
            as Solid's model is much simpler with no Hook rules. Every Component executes once and
            it is the Hooks and bindings that execute many times as their dependencies update.
          </p>

          <p class="mt-4 leading-7">
            Solid follows the same philosophy as React with unidirectional data flow, read/write
            segregation, and immutable interfaces. It just has a completely different implementation
            that forgoes using a Virtual DOM.
          </p>

          <Link
            class="button inline-block mt-8 text-solid-default font-semibold hover:text-gray-500"
            href="/docs/latest/components"
          >
            View Docs
          </Link>
        </div>
      </section>

      <section class="bg-gray-50 py-20 grid grid-cols-2 px-5 lg:px-20 defer rounded-br-6xl bg-blocks-three bg-no-repeat bg-contain bg-right">
        <div>
          <img class="w-12" src={sandbox} />
          <h2 class="text-3xl mt-8 text-solid font-semibold">
            Fine-grained means you do more with less.
          </h2>

          <p class="text-2xl mt-2">
            Every part of Solid is built on fine-grained reactivity from its simple primitives to
            the JavaScript expressions in your JSX views.
          </p>
          <p class="mt-6 leading-7">
            This unlocks complete control over what gets updated and when, even at the DOM binding
            level. With <strong>no Virtual DOM</strong> or extensive diffing, the framework never
            does more work than you want it to.
          </p>
          <Link
            class="button inline-block mt-8 text-solid-default font-semibold hover:text-gray-500"
            href="https://playground.solidjs.com/?hash=271025478"
          >
            See it in action
          </Link>
        </div>
      </section>

      <section class="py-20 px-8 lg:px-10 flex flex-col lg:flex-row lg:space-x-32 ">
        <div class="flex flex-wrap items-center flex-1">
          <Benchmarks list={props.benchmarks} />
        </div>

        <div class="flex flex-col justify-center flex-1 bg-no-repeat">
          <img class="w-20" src={iconBlocks2} />
          <h2 class="mt-6 text-3xl font-semibold text-solid">Performance focused</h2>
          <p class="leading-7 mt-9">
            It's no secret that Solid consistently performs as the top rated JS framework in the
            world on the client side and especially server-side. The strength of fine-grained
            reactivity as an approach shines on all notable benchmarks. While performance may not be
            your focus, the end-user's experience is always a focus. Solid's performance edge means
            that you can scale without concern.
          </p>
          <Link
            class="button inline-block mt-8 text-solid-default font-semibold hover:text-gray-500"
            href="https://ryansolid.medium.com/solidjs-the-tesla-of-javascript-ui-frameworks-6a1d379bc05e"
          >
            Read more
          </Link>
        </div>
      </section>

      <section class="bg-solid-lightgray text-black rounded-br-6xl grid grid-cols-2 flex py-20 px-8 lg:px-20 space-x-39">
        <div class="flex flex-wrap content-center">
          <h2 class="text-2xl font-semibold">
            <img class="w-10 mb-5 block" src={flag} />
            Fully loaded with all features.
          </h2>
          <p class="text-xl mt-4">
            Solid supports all common and expected library features and expands on aspects to
            increase DX.
          </p>
        </div>
        <ul class="flex flex-wrap">
          <li class="feature-block border-gray-300 mr-3 mt-3 px-5 py-3">
            <span class="block text-sm">Fragments</span>
          </li>

          <li class="feature-block border-gray-300 mr-3 mt-3 px-5 py-3">
            <span class="block text-sm">Portals</span>
          </li>

          <li class="feature-block border-gray-300 mr-3 mt-3 px-5 py-3">
            <span class="block text-sm">Context</span>
          </li>

          <li class="feature-block border-gray-300 mr-3 mt-3 px-5 py-3">
            <span class="block text-sm">Suspense</span>
          </li>

          <li class="feature-block border-gray-300 mr-3 mt-3 px-5 py-3">
            <span class="block text-sm">Error Boundaries</span>
          </li>

          <li class="feature-block border-gray-300 mr-3 mt-3 px-5 py-3">
            <span class="block text-sm">Lazy Components</span>
          </li>

          <li class="feature-block border-gray-300 mr-3 mt-3 px-5 py-3">
            <span class="block text-sm">Async & Concurrent Rendering</span>
          </li>

          <li class="feature-block border-gray-300 mr-3 mt-3 px-5 py-3">
            <span class="block text-sm">Implicit Delegation</span>
          </li>

          <li class="feature-block border-gray-300 mr-3 mt-3 px-5 py-3">
            <span class="block text-sm">SSR & Hydration</span>
          </li>
        </ul>
      </section>
    </div>

    <Footer />
  </div>
);

export default Home;
