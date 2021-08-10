import { Component, createSignal, lazy, onMount, Suspense, Show, onCleanup } from 'solid-js';
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

const Home: Component<HomepageProps> = (props) => {
  let playgroundSection!: HTMLElement;
  let observer: IntersectionObserver;
  const [loadRepl, setLoadRepl] = createSignal(false);

  onMount(() => {
    observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setLoadRepl(true));
    observer.observe(playgroundSection);
  });

  onCleanup(() => observer.disconnect());

  return (
    <div class="flex flex-col">
      <h1 class="sr-only">SolidJS homepage</h1>

      <header class="mx-3 rounded-br-3xl rounded-bl-3xl bg-gradient-to-r from-solid-light via-solid-medium to-solid-default text-white">
        <div class="md:bg-hero bg-no-repeat bg-right px-10">
          <section class="px-3 lg:px-12 container space-y-10 lg:pb-20 lg:pt-52 py-10">
            <div class="flex items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <img class="w-28 h-30 lg:w-48" src={logo} alt="Solid logo" />
              <img class="w-32 h-15 lg:w-52" src={wordmark} alt="Solid wordmark" />
            </div>
            <h2 class="lg:font-semibold text-3xl text-left lg:text-4xl leading-snug xl:max-w-4xl">
              A declarative, efficient and flexible JavaScript library for building user interfaces.
            </h2>
          </section>
        </div>
      </header>

      <Nav />

      <div class="lg:my-2 px-0 lg:px-12 container flex flex-col lg:space-y-10 bg-blocks-one bg-no-repeat bg-left-top">
        <div class="my-10 p-10 max-w-4xl m-auto text-2xl">
          <strong class="inline font-semibold text-solid">
            Solid is a purely reactive library.{' '}
          </strong>
          It was designed from the ground up with a reactive core and built on hardened tooling in a
          growing ecosystem.
        </div>

        <section class="grid sm:grid-cols-2 lg:grid-cols-4 m-5 lg:m-0 space-y-4 lg:space-y-0 lg:space-x-4 border-4 rounded-lg">
          <div class="px-8 py-4 mt-4 md:py-10 border-b border-0 md:border-r lg:border-b-0 lg:ml-4 lg:mt-0">
            <img class="w-12 mb-5" src={performant} alt="speed" />
            <h3 class="text-xl mb-2 font-semibold">Performant</h3>
            <p class="text-base">
              Consistently tops recognized UI speed and memory utilization benchmarks.
            </p>
          </div>

          <div class="px-8 py-4 md:py-10 border-b border-0 md:border-r lg:border-b-0">
            <img class="w-12 mb-5" src={powerful} alt="powerful" />
            <h3 class="text-xl mb-2 font-semibold">Powerful</h3>
            <p class="text-base">
              Composable reactive primitives married with the flexibility of JSX.
            </p>
          </div>

          <div class="px-8 py-4 md:py-10 border-b border-0 md:border-r lg:border-b-0">
            <img class="w-12 mb-5" src={pragmatic} alt="pragmatic" />
            <h3 class="text-xl mb-2 font-semibold">Pragmatic</h3>
            <p class="text-base">A sensible and tailored API makes developing fun and simple.</p>
          </div>

          <div class="px-8 py-4 md:py-10">
            <img class="w-12 mb-5" src={productive} alt="productive" />
            <h3 class="text-xl mb-2 font-semibold">Productive</h3>
            <p class="text-base">
              Ergonomics and familiarity make building simple or complex things a breeze.
            </p>
          </div>
        </section>
      </div>

      <div class="lg:my-10 px-0 lg:px-12 container flex flex-col lg:space-y-10">
        <section class="bg-solid-lightgray m-5 lg:m-0 border border-gray-200 text-black flex rounded-lg defer">
          <ul class="flex flex-col md:flex-row justify-center w-full">
            <li class="hover:bg-solid-dark hover:text-white transition">
              <a
                target="_blank"
                rel="noopener"
                href="https://bundlephobia.com/result?p=solid-js@1.0.0"
                class="flex md:inline-block p-3 justify-center border-b md:border-none md:px-5 md:py-5"
              >
                <strong class="font-semibold mr-1">6kb</strong>
                <span class="block text-sm">Minified + Gzipped</span>
              </a>
            </li>

            <li class="hover:bg-solid-dark hover:text-white transition">
              <a
                target="_blank"
                rel="noopener"
                href="https://star-history.t9t.io/#solidjs/solid"
                class="flex md:inline-block p-3 justify-center border-b md:border-none md:px-5 md:py-5"
              >
                <strong class="font-semibold mr-1">9.8k+</strong>
                <span class="block text-sm">Github Stars</span>
              </a>
            </li>

            <li class="hover:bg-solid-dark hover:text-white transition">
              <div class="flex md:inline-block p-3 justify-center border-b md:border-none md:px-5 md:py-5">
                <strong class="font-semibold mr-1">5+ years</strong>
                <span class="block text-sm">In development</span>
              </div>
            </li>

            <li class="hover:bg-solid-dark hover:text-white transition">
              <div class="flex md:inline-block p-3 justify-center border-b md:border-none md:px-5 md:py-5">
                <strong class="font-semibold mr-1">TypeScript</strong>
                <span class="block text-sm">Support</span>
              </div>
            </li>

            <li class="hover:bg-solid-dark hover:text-white transition">
              <a
                target="_blank"
                rel="noopener"
                href="https://krausest.github.io/js-framework-benchmark/2021/table_chrome_91.0.4472.77.html"
                class="flex md:inline-block p-3 justify-center border-b md:border-none md:px-5 md:py-5"
              >
                <strong class="font-semibold mr-1">Top Rated</strong>
                <span class="block text-sm">In performance</span>
              </a>
            </li>

            <li class="hover:bg-solid-dark hover:text-white transition">
              <a
                target="_blank"
                rel="noopener"
                href="https://github.com/snowpackjs/astro/tree/main/examples/framework-solid"
                class="flex md:inline-block p-3 justify-center border-b md:border-none md:px-5 md:py-5"
              >
                <strong class="font-semibold mr-1">Astro</strong>
                <span class="block text-sm">Support</span>
              </a>
            </li>
          </ul>
        </section>

        <section
          class="py-20 px-8 lg:px-15 flex flex-col lg:flex-row lg:space-x-32"
          ref={playgroundSection}
        >
          <div
            style="height:600px; width:100%;"
            class="rounded-lg overflow-hidden flex-1 shadow-2xl order-2 lg:order-1 mt-10 lg:mt-0"
          >
            <Show when={loadRepl()}>
              <Suspense fallback={'Loading...'}>
                <OldRepl
                  tabs={[
                    {
                      name: 'main1',
                      type: 'tsx',
                      source: `import { render } from "solid-js/web";
import { onCleanup, createSignal } from "solid-js";

const CountingComponent = () => {
  const [count, setCount] = createSignal(0);
  const interval = setInterval(
    () => setCount(count => count + 1),
    1000
  );
  onCleanup(() => clearInterval(interval));
  return <div>Count value is {count()}</div>;
};

render(() => <CountingComponent />, document.getElementById("app"));`,
                    },
                  ]}
                />
              </Suspense>
            </Show>
          </div>

          <div class="flex flex-col justify-center flex-1 order-1 lg:order-2">
            <img class="w-20" src={iconBlocks1} alt="" />
            <h3 class="text-3xl mt-6 font-semibold leading-10 text-solid">
              It's familiar and modern
            </h3>

            <p class="mt-9 leading-7">
              Solid stands on the shoulders of giants, particularly React and Knockout. If you've
              developed with React Hooks before Solid should seem very natural. In fact, more
              natural as its model is much simpler with no Hook rules. Every Component executes
              once while Hooks (called primitives in Solid) and bindings can execute many times over
              as their dependencies update.
            </p>

            <p class="mt-4 leading-7">
              Solid follows the same philosophy as React with unidirectional data flow, read/write
              segregation, and immutable interfaces. It just has a completely different
              implementation that forgoes using a Virtual DOM.
            </p>

            <Link
              class="button inline-block mt-8 text-solid-default chevron chevron-right font-semibold hover:text-gray-500"
              href="/docs/latest#component-apis"
            >
              View Docs
            </Link>
          </div>
        </section>

        <section class="bg-gray-50 py-20 grid grid-cols-1 lg:grid-cols-2 px-5 lg:px-20 defer rounded-br-6xl lg:bg-blocks-three bg-no-repeat bg-contain bg-right">
          <div class="px-5">
            <img class="w-16" src={sandbox} alt="" />
            <h2 class="text-3xl mt-8 mb-5 text-solid font-semibold">
              Fine-grained reactivity means you do more with less.
            </h2>

            <p class="text-2xl mt-2">
              Every part of Solid is built on simple primitives to the JavaScript expressions in
              your JSX views.
            </p>
            <p class="mt-6 leading-7">
              This unlocks complete control over what gets updated and when, even at the DOM binding
              level. Moving <strong>beyond a costly Virtual DOM</strong>, Solid never does more work
              than you need it to.
            </p>
            <a
              class="button inline-block mt-8 text-solid-default chevron chevron-right font-semibold hover:text-gray-500"
              href="https://playground.solidjs.com/?hash=271025478"
            >
              See it in action
            </a>
          </div>
        </section>

        <section class="py-20 px-8 lg:px-10 flex flex-col lg:flex-row lg:space-x-32 space-y-10 ">
          <div class="flex flex-wrap items-center flex-1">
            <Benchmarks list={props.benchmarks} />
          </div>

          <div class="flex flex-col justify-center flex-1 bg-no-repeat">
            <img class="w-20" src={iconBlocks2} alt="" />
            <h2 class="mt-6 text-3xl font-semibold text-solid">Performance focused</h2>
            <h2 class="m3-6 text-2xl font-semibold text-solid">on both client and server</h2>
            <p class="leading-7 mt-9">
              The strength of fine-grained reactivity as an approach shines on all notable
              benchmarks. While performance may not be your focus, the end-user's experience is
              always a concern. Think of Solid's performance gain as a free win{' '}
              <i>without extra development complexity</i>. It's about being fast without trying.
            </p>
            <a
              class="button inline-block mt-8 text-solid-default chevron chevron-right font-semibold hover:text-gray-500"
              href="https://ryansolid.medium.com/solidjs-the-tesla-of-javascript-ui-frameworks-6a1d379bc05e"
            >
              Read Full Article
            </a>
          </div>
        </section>

        <section class="bg-solid-lightgray text-black rounded-lg grid md:grid-cols-2 py-20 px-8 lg:px-20 space-x-39">
          <div class="gridflex flex-wrap content-center">
            <h2 class="text-2xl font-semibold">
              <img class="w-10 mb-5 block" src={flag} alt="" />
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

            <li class="feature-block border-gray-300 mr-3 mt-3 px-5 py-3">
              <span class="block text-sm">Directives</span>
            </li>
          </ul>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
