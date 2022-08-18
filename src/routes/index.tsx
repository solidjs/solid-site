import {
  Component,
  createSignal,
  onMount,
  For,
  Suspense,
  Show,
  createMemo,
  createEffect,
} from 'solid-js';
import { Link, useRouteData, useIsRouting } from '@solidjs/router';
import { useI18n } from '@solid-primitives/i18n';
import { createViewportObserver } from '@solid-primitives/intersection-observer';
import iconBlocks1 from '~/assets/icons/blocks1.svg';
import iconBlocks2 from '~/assets/icons/blocks2.svg';
import flag from '~/assets/icons/flag.svg';
import sandbox from '~/assets/icons/sandbox.svg';
import performant from '~/assets/icons/performant.svg';
import powerful from '~/assets/icons/powerful.svg';
import pragmatic from '~/assets/icons/pragmatic.svg';
import productive from '~/assets/icons/productive.svg';
import { shoppingCart } from 'solid-heroicons/outline';
import { Icon } from 'solid-heroicons';
import Footer from '~/components/Footer';
import Benchmarks, { GraphData } from '~/components/Benchmarks';
import { useRouteReadyState } from '~/utils/routeReadyState';
import Repl from '~/components/ReplTab';

const strength_icons: { [key: string]: string } = {
  performant,
  powerful,
  pragmatic,
  productive,
};

const Home: Component = () => {
  const isRouting = useIsRouting();
  const data = useRouteData<{ benchmarks: GraphData[] }>();
  const [t] = useI18n();
  const [loadRepl, setLoadRepl] = createSignal(false);
  const [observeInteraction] = createViewportObserver({ threshold: 0.4 });
  let playgroundRef!: HTMLElement;

  onMount(() => {
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
    <div class="flex flex-col">
      <div class="px-0 lg:px-12 container flex flex-col lg:space-y-10 md:pt-10 md:bg-blocks-one bg-contain bg-no-repeat bg-left-top md:dark:bg-blocks-one-dark">
        <a
          href="/store"
          class="flex items-center space-x-3 justify-center text-center text-solid-medium dark:bg-solid-light/40 dark:text-white m-5 md:mx-0 hover:text-solid-dark transition duration-500 bg-slate-200/50 max-width-[300px] rounded-lg p-5 text-lg"
        >
          <Icon class="w-10" stroke-width={1.5} path={shoppingCart} />
          <div>
            Visit the new <b>Solid Store</b> for stickers, t-shirts and more!
          </div>
        </a>
        <section class="grid sm:grid-cols-2 lg:grid-cols-4 space-y-4 lg:space-y-0 lg:space-x-4 rounded-lg">
          <For each={t('home.strengths')}>
            {(strength: { icon: string; label: string; description: string }) => (
              <div class="px-10 py-4 mt-4 md:py-10 border-b border-0 dark:border-solid-darkLighterBg md:border-r lg:border-b-0 lg:ml-4 lg:mt-0 last:border-none">
                <img
                  class="w-12 mb-5 dark:brightness-150"
                  src={strength_icons[strength.icon]}
                  alt={strength.label}
                />
                <h3 class="text-xl mb-2 font-semibold">{strength.label}</h3>
                <p class="text-base">{strength.description}</p>
              </div>
            )}
          </For>
        </section>
      </div>
      <div class="lg:my-10 px-0 lg:px-12 container flex flex-col lg:space-y-10">
        <section class="border-2 m-5 lg:m-0 border-gray-200 dark:border-solid-darkLighterBg rounded-lg defer">
          <ul class="flex flex-col md:flex-row justify-center w-full">
            <For each={t('home.facts')}>
              {(fact: { label: string; detail: string; link: string }) => {
                const d = (
                  <>
                    <strong class="font-semibold mr-1">{fact.label}</strong>
                    <span class="flex items-center text-sm">{fact.detail}</span>
                  </>
                );
                return (
                  <li
                    class="transition border-gray-100 dark:border-solid-darkLighterBg border-r last:border-r-0"
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
                      name: 'main.jsx',
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
              class={`button inline-block mt-8 text-solid-default dark:text-solid-darkdefault font-semibold hover:text-gray-500 dark:hover:text-gray-300 ${chevron()}`}
              href={t('home.example.link')}
            >
              {t('home.example.link_label')}
            </Link>
          </div>
        </section>
        <section class="dark:bg-solid-darkLighterBg bg-solid-lightgray py-16 grid grid-cols-1 lg:grid-cols-2 md:px-5 lg:px-16 defer rounded-br-6xl lg:bg-blocks-three bg-no-repeat bg-contain bg-right rtl:bg-left">
          <div
            class="px-10 py-4 2xl:bg-opacity-0 bg-opacity-80 rounded-lg"
            classList={{ 'xl:bg-opacity-0': t('global.dir', {}, 'ltr') === 'ltr' }}
          >
            <img class="w-16" src={sandbox} alt="" />
            <h2 class="text-3xl mt-8 mb-5 text-solid font-semibold">
              {t('home.reactivity.headline')}
            </h2>
            <p class="text-2xl mt-2">{t('home.reactivity.subheadline')}</p>
            <p class="mt-6 leading-7">{t('home.reactivity.copy')}</p>
            <a
              class={`button inline-block mt-8 text-solid-default dark:text-solid-darkdefault font-semibold hover:text-gray-500 dark:hover:text-gray-300 ${chevron()}`}
              href={t('home.reactivity.link')}
            >
              {t('home.reactivity.link_label')}
            </a>
          </div>
        </section>
        <section class="py-20 px-10 lg:px-10 flex flex-col gap-x-32 space-y-10 lg:space-y-0 lg:flex-row">
          <div class="flex flex-wrap items-center flex-1 rtl:ml-10">
            <Benchmarks list={data.benchmarks} />
          </div>
          <div class="flex flex-col justify-around flex-1 bg-no-repeat">
            <img class="w-20" src={iconBlocks2} alt="" />
            <h2 class="mt-6 text-3xl font-semibold text-solid">
              {t('home.performance.headline.0')}
            </h2>
            <h2 class="m3-6 text-2xl font-semibold text-solid">
              {t('home.performance.headline.1')}
            </h2>
            <p class="leading-7 mt-9">{t('home.performance.copy')}</p>
            <a
              class={`button inline-block py-3 text-solid-default dark:text-solid-darkdefault font-semibold hover:text-gray-500 dark:hover:text-gray-300 ${chevron()}`}
              href={t('home.performance.link')}
            >
              {t('home.performance.link_label')}
            </a>
          </div>
        </section>
        <section class="dark:bg-solid-darkLighterBg bg-solid-lightgray rounded-3xl grid md:grid-cols-2 py-20 px-10 lg:px-20 md:space-x-12">
          <div class="gridflex flex-wrap content-center">
            <h2 class="text-2xl font-semibold">
              <img class="w-10 mb-5 block dark:invert" src={flag} alt="" />
              {t('home.features.headline')}
            </h2>
            <p class="text-xl mt-4">{t('home.features.copy')}</p>
          </div>
          <ul class="flex flex-wrap">
            <For each={t('home.features.list')}>
              {(feature: string) => (
                <li class="feature-block border-gray-300 dark:border-gray-700 w-full md:w-auto mr-3 mt-3 px-5 py-3">
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
