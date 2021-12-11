import {
  Component,
  createSignal,
  lazy,
  onMount,
  For,
  Suspense,
  Show,
  createMemo,
  createEffect,
} from 'solid-js';
import { Link, useData, useIsRouting } from 'solid-app-router';
import { useI18n } from '@solid-primitives/i18n';
import { createViewportObserver } from '@solid-primitives/intersection-observer';
import iconBlocks1 from '../assets/icons/blocks1.svg';
import iconBlocks2 from '../assets/icons/blocks2.svg';
import flag from '../assets/icons/flag.svg';
import sandbox from '../assets/icons/sandbox.svg';
import performant from '../assets/icons/performant.svg';
import powerful from '../assets/icons/powerful.svg';
import pragmatic from '../assets/icons/pragmatic.svg';
import productive from '../assets/icons/productive.svg';
import Footer from '../components/Footer';
import Benchmarks, { GraphData } from '../components/Benchmarks';
import { useRouteReadyState } from '../utils/routeReadyState';

const Repl = lazy(() => import('../components/ReplTab'));

const strength_icons: { [key: string]: string } = {
  performant,
  powerful,
  pragmatic,
  productive,
};

const Home: Component<{}> = () => {
  const isRouting = useIsRouting();
  const data = useData<{ benchmarks: Array<GraphData> }>();
  const [t] = useI18n();
  const [loadRepl, setLoadRepl] = createSignal(false);
  const [observeInteraction] = createViewportObserver({ threshold: 0.4 });
  let playgroundRef!: HTMLElement;

  onMount(() => {
    // @ts-ignore
    observeInteraction(playgroundRef, (entry) => entry.isIntersecting && setLoadRepl(true));
  });

  createEffect(() => {
    if (isRouting()) {
      setLoadRepl(false);
    }
  });

  useRouteReadyState();

  const chevron = createMemo(() => {
    const direction = t('global.dir', {}, 'ltr') == 'rtl' ? 'chevron-left' : 'chevron-right';
    return `chevron ${direction}`;
  });

  return (
    <div class="dark:bg-solid-gray flex flex-col md:pt-8">
      <div class="lg:my-2 px-0 lg:px-12 container flex flex-col lg:space-y-10 md:pt-10 bg-blocks-one bg-contain bg-no-repeat bg-left-top">
        <section class="grid sm:grid-cols-2 lg:grid-cols-4 m-5 lg:m-0 space-y-4 lg:space-y-0 lg:space-x-4 rounded-lg">
          <For each={t('home.strengths')}>
            {(strength: { icon: string; label: string; description: string }) => (
              <div class="px-8 py-4 mt-4 md:py-10 border-b border-0 md:border-r lg:border-b-0 lg:ml-4 lg:mt-0 last:border-none">
                <img class="w-12 mb-5" src={strength_icons[strength.icon]} alt={strength.label} />
                <h3 class="text-xl mb-2 font-semibold">{strength.label}</h3>
                <p class="text-base">{strength.description}</p>
              </div>
            )}
          </For>
        </section>
      </div>
      <div class="lg:my-10 px-0 lg:px-12 container flex flex-col lg:space-y-10">
        <section class="border-2 m-5 lg:m-0 border-gray-200 text-black flex rounded-lg defer">
          <ul class="flex flex-col md:flex-row justify-center w-full">
            <For each={t('home.facts')}>
              {(fact: { label: string; detail: string; link: string }) => {
                const d = (
                  <>
                    <strong class="font-semibold mr-1">{fact.label}</strong>
                    <span class="block text-sm">{fact.detail}</span>
                  </>
                );
                return (
                  <li
                    class="transition border-gray-100 border-r"
                    classList={{
                      'hover:bg-solid-dark': !!fact.link,
                      'hover:text-white': !!fact.link,
                    }}
                  >
                    {fact.link ? (
                      <a
                        target="_blank"
                        rel="noopener"
                        href={fact.link}
                        class="flex md:inline-block p-3 justify-center border-b md:border-none md:px-5 md:py-5"
                      >
                        {d}
                      </a>
                    ) : (
                      <div class="flex md:inline-block p-3 justify-center border-b md:border-none md:px-5 md:py-5">
                        {d}
                      </div>
                    )}
                  </li>
                );
              }}
            </For>
          </ul>
        </section>
        <section
          class="py-20 px-8 lg:px-15 flex flex-col lg:flex-row lg:space-x-32"
          ref={playgroundRef}
        >
          <div
            dir="ltr"
            style="height: 70vh; max-height: 600px; min-height: 475px; width: 100%;"
            class="rounded-lg overflow-hidden flex-1 shadow-2xl order-2 lg:order-1 rtl:order-2 mt-10 lg:mt-0"
          >
            <Show when={loadRepl()}>
              <Suspense
                fallback={
                  <div class="flex h-full justify-center items-center">Starting playground...</div>
                }
              >
                <Repl
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
          <div class="flex flex-col justify-center flex-1 order-1 lg:order-2 rtl:order-1">
            <img class="w-20" src={iconBlocks1} alt="" />
            <h3 class="text-3xl mt-6 font-semibold leading-10 text-solid">
              {/* {t('home.example.headline')} */}
              Solid simplicity. <b>Friendlier</b> than your average framework.
            </h3>
            {/* <For each={t('home.example.copy')}>
              {(copy: string) => <p class="mt-9 leading-7">{copy}</p>}
            </For>
             */}
             <p class="mt-9 leading-7">
              Solid provides an incredibly accessible developer experience. If you happen to know React, Vue or 
              Svelte then you would find Solid's tooling and API refreshing and satisfying. It has no restrictive
              hook rules, no virtual DOM and no radical and unfamiliar syntax to describe its templates.
            </p>
            <p class="mt-9 leading-7">
              It stands on the shoulders of giants, particularly React and Knockout. If you've developed with React Hooks before, Solid should seem very natural. In fact, more natural as Solid's model is much simpler with no Hook rules. Every Component executes once and it is the Hooks and bindings that execute many times as their dependencies update.
            </p>
            <Link
              class={`button inline-block mt-8 text-solid-default font-semibold hover:text-gray-500 ${chevron()}`}
              href={t('home.example.link')}
            >
              {t('home.example.link_label')}
            </Link>
          </div>
        </section>
        <section class="dark:bg-gray-500 bg-gray-50 py-16 grid grid-cols-1 lg:grid-cols-2 px-5 lg:px-16 defer rounded-br-6xl lg:bg-blocks-three bg-no-repeat bg-contain bg-right rtl:bg-right">
          <div
            class="px-9 py-4 bg-gray-50 2xl:bg-opacity-0 bg-opacity-80 rounded-lg"
            classList={{ 'xl:bg-opacity-0': t('global.dir', {}, 'ltr') === 'ltr' }}
          >
            <h2 class="text-3xl mt-8 mb-5 text-solid font-semibold">
              Primitives <b>not</b> frameworks!
            </h2>
            <p class="mb-3 leading-7">
              The world may not need another framework so we designed Solid with the most minimal yet efficient
              reactive runtime and exposed it via extremely well designed yet simple building blocks. Think of it as reactive sugar between the DOM.
              Four easy hooks (Primary Primitives) start you on modelling simple and complex apps. As your
              needs grow leverage its extended Secondary Primitives let you do even more.
            </p>
            <p class="leading-7">
              No complex DSLs to learn, no Virtual DOM, no overstated or involved and tedious patterns...just
              clean and concise JSX with full Typescript support.
            </p>
            <a
              class={`button inline-block mt-8 text-solid-default font-semibold hover:text-gray-500 ${chevron()}`}
              href={t('home.reactivity.link')}
            >
              Start the tutorial
            </a>
          </div>
        </section>
        <section class="dark:bg-gray-500 bg-gray-50 py-16 grid grid-cols-1 lg:grid-cols-2 px-5 lg:px-16 defer rounded-br-6xl lg:bg-blocks-three bg-no-repeat bg-contain bg-right rtl:bg-left">
          <div
            class="px-9 py-4 bg-gray-50 2xl:bg-opacity-0 bg-opacity-80 rounded-lg"
            classList={{ 'xl:bg-opacity-0': t('global.dir', {}, 'ltr') === 'ltr' }}
          >
            <img class="w-16" src={sandbox} alt="" />
            <h2 class="text-3xl mt-8 mb-5 text-solid font-semibold">
              {t('home.reactivity.headline')}
            </h2>
            <p class="text-2xl mt-2">{t('home.reactivity.subheadline')}</p>
            <p class="mt-6 leading-7">{t('home.reactivity.copy')}</p>
            <a
              class={`button inline-block mt-8 text-solid-default font-semibold hover:text-gray-500 ${chevron()}`}
              href={t('home.reactivity.link')}
            >
              {t('home.reactivity.link_label')}
            </a>
          </div>
        </section>
        <section class="py-20 px-10 lg:px-10 flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:space-x-32 rtl:space-x-0">
          <div class="flex flex-wrap items-center flex-1 rtl:ml-10">
            <Benchmarks list={data.benchmarks} />
          </div>
          <div class="flex flex-col justify-center flex-1 bg-no-repeat">
            <img class="w-20" src={iconBlocks2} alt="" />
            <h2 class="mt-6 text-3xl font-semibold text-solid">
              {t('home.performance.headline')[0]}
            </h2>
            <h2 class="m3-6 text-2xl font-semibold text-solid">
              {t('home.performance.headline')[1]}
            </h2>
            <p class="leading-7 mt-9">{t('home.performance.copy')}</p>
            <a
              class={`button inline-block mt-8 text-solid-default font-semibold hover:text-gray-500 ${chevron()}`}
              href={t('home.performance.link')}
            >
              {t('home.performance.link_label')}
            </a>
          </div>
        </section>
        <section class="dark:bg-gray-500 bg-solid-lightgray rounded-lg grid md:grid-cols-2 py-20 px-10 lg:px-20 md:space-x-12">
          <div class="gridflex flex-wrap content-center">
            <h2 class="text-2xl font-semibold">
              <img class="w-10 mb-5 block" src={flag} alt="" />
              {t('home.features.headline')}
            </h2>
            <p class="text-xl mt-4">{t('home.features.copy')}</p>
          </div>
          <ul class="flex flex-wrap">
            <For each={t('home.features.list')}>
              {(feature: string) => (
                <li class="feature-block border-gray-300 w-full md:w-auto mr-3 mt-3 px-5 py-3">
                  <span class="block text-sm">{feature}</span>
                </li>
              )}
            </For>
          </ul>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
