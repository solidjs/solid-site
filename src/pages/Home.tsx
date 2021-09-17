import { Component, createSignal, lazy, onMount, For, Suspense, Show, createMemo } from 'solid-js';
import { Link, useData } from 'solid-app-router';
import { useI18n } from '@solid-primitives/i18n';
import { createViewportObserver } from '@solid-primitives/intersection-observer';
import logo from '../assets/logo.svg';
import iconBlocks1 from '../assets/icons/blocks1.svg';
import iconBlocks2 from '../assets/icons/blocks2.svg';
import flag from '../assets/icons/flag.svg';
import sandbox from '../assets/icons/sandbox.svg';
import performant from '../assets/icons/performant.svg';
import powerful from '../assets/icons/powerful.svg';
import pragmatic from '../assets/icons/pragmatic.svg';
import productive from '../assets/icons/productive.svg';
import wordmark from '../assets/wordmark.svg';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Benchmarks, { GraphData } from '../components/Benchmarks';

const Repl = lazy(() => import('../components/ReplTab'));

const strength_icons: { [key: string]: string } = {
  performant,
  powerful,
  pragmatic,
  productive,
};

const Home: Component<{}> = () => {
  const data = useData<{ benchmarks: Array<GraphData> }>();
  const [t] = useI18n();
  const [loadRepl, setLoadRepl] = createSignal(false);
  const [observeInteraction] = createViewportObserver([], 0.5);
  let playgroundRef!: HTMLElement;
  onMount(() => {
    // @ts-ignore
    observeInteraction(playgroundRef, (entry) => entry.isIntersecting && setLoadRepl(true));
  });
  const chevron = createMemo(() => t('global.dir', {}, 'ltr') == 'rtl' ? 'chevron-left' : 'chevron-right');
  return (
    <div class="dark:bg-solid-gray flex flex-col">
      <h1 class="sr-only">SolidJS homepage</h1>
      <header class="mx-2 rounded-br-3xl rounded-bl-3xl bg-gradient-to-r from-solid-light via-solid-medium to-solid-default text-white">
        <div class="md:bg-hero dark:from-bg-gray-700 bg-no-repeat bg-right rtl:bg-left px-10">
          <section class="px-3 lg:px-12 container space-y-10 lg:pb-20 lg:pt-52 py-10">
            <div class="flex items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <img class="w-28 h-30 lg:w-48" src={logo} alt="Solid logo" />
              <img class="w-52 h-15 lg:w-80" src={wordmark} alt="Solid wordmark" />
            </div>
            <h2 class="lg:font-semibold text-3xl text-left lg:text-4xl leading-snug xl:max-w-4xl">
              {t('home.hero')}
            </h2>
          </section>
        </div>
      </header>
      <Nav />
      <div class="lg:my-2 px-0 lg:px-12 container flex flex-col lg:space-y-10 bg-blocks-one bg-no-repeat bg-left-top">
        <div class="my-10 p-10 max-w-4xl m-auto text-2xl">{t('home.info')}</div>
        <section class="grid sm:grid-cols-2 lg:grid-cols-4 m-5 lg:m-0 space-y-4 lg:space-y-0 lg:space-x-4 border-4 rounded-lg">
          <For each={t('home.strengths')}>
            {(strength: { icon: string; label: string; description: string }) => (
              <div class="px-8 py-4 mt-4 md:py-10 border-b border-0 md:border-r lg:border-b-0 lg:ml-4 lg:mt-0">
                <img class="w-12 mb-5" src={strength_icons[strength.icon]} alt={strength.label} />
                <h3 class="text-xl mb-2 font-semibold">{strength.label}</h3>
                <p class="text-base">{strength.description}</p>
              </div>
            )}
          </For>
        </section>
      </div>
      <div class="lg:my-10 px-0 lg:px-12 container flex flex-col lg:space-y-10">
        <section class="bg-solid-lightgray m-5 lg:m-0 border border-gray-200 text-black flex rounded-lg defer">
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
                  <li class="hover:bg-solid-dark hover:text-white transition">
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
            style="height:600px; width:100%;"
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
              {t('home.example.headline')}
            </h3>
            <For each={t('home.example.copy')}>
              {(copy: string) => <p class="mt-9 leading-7">{copy}</p>}
            </For>
            <Link
              class={`button inline-block mt-8 text-solid-default chevron font-semibold hover:text-gray-500 ${chevron()}`}
              href={t('home.example.link')}
            >
              {t('home.example.link_label')}
            </Link>
          </div>
        </section>
        <section class="dark:bg-gray-500 bg-gray-50 py-20 grid grid-cols-1 lg:grid-cols-2 px-5 lg:px-20 defer rounded-br-6xl lg:bg-blocks-three bg-no-repeat bg-contain bg-right rtl:bg-left">
          <div class="px-5">
            <img class="w-16" src={sandbox} alt="" />
            <h2 class="text-3xl mt-8 mb-5 text-solid font-semibold">
              {t('home.reactivity.headline')}
            </h2>
            <p class="text-2xl mt-2">{t('home.reactivity.subheadline')}</p>
            <p class="mt-6 leading-7">{t('home.reactivity.copy')}</p>
            <a
              class={`button inline-block mt-8 text-solid-default font-semibold chevron hover:text-gray-500 ${chevron()}`}
              href={t('home.reactivity.link')}
            >
              {t('home.reactivity.link_label')}
            </a>
          </div>
        </section>
        <section class="py-20 px-8 lg:px-10 flex flex-col lg:flex-row lg:space-x-32 rtl:space-x-0 space-y-10">
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
        <section class="dark:bg-gray-500 bg-solid-lightgray rounded-lg grid md:grid-cols-2 py-20 px-8 lg:px-20 space-x-12">
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
                <li class="feature-block border-gray-300 mr-3 mt-3 px-5 py-3">
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
