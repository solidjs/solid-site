import {
  Component,
  For,
  Show,
  Switch,
  Match,
  createEffect,
  createSignal,
  Accessor,
} from 'solid-js';
import { useRouteData } from 'solid-app-router';
import createThrottle from '@solid-primitives/throttle';
import createScrollPosition from '@solid-primitives/scroll';
import { chevronRight } from 'solid-heroicons/solid';
import { Icon } from 'solid-heroicons';
import Dismiss from 'solid-dismiss';

import Footer from '../components/Footer';
import { routeReadyState, useRouteReadyState } from '../utils/routeReadyState';

const SectionButton: Component<{
  href: string;
  title: string;
  children?: any;
  class: string;
  classList: { [k: string]: boolean | undefined };
}> = (props) => (
  <li>
    <a class={props.class} classList={props.classList} href={props.href} target="_self">
      {props.title}
    </a>
    {props.children}
  </li>
);

const Sidebar: Component<{
  items: Section[] | undefined;
  current: Accessor<string | null>;
  hash: string | undefined;
}> = (props) => (
  <ul class="lg:pl-10 overflow-auto pt-10 flex dark:text-white flex-col flex-1">
    <For each={props.items}>
      {(firstLevel: Section) => (
        <SectionButton
          title={firstLevel.title}
          class={
            `text-left w-full dark:text-white border-b border-gray-200 dark:border-gray-500 hover:text-gray-400 transition ` +
            `flex flex-wrap content-center justify-between space-x-2 text-xl p-2 py-2 mb-8`
          }
          classList={{
            'font-semibold text-solid-medium dark:text-solid-darkdefault':
              props.current() == firstLevel.slug,
          }}
          href={`#${firstLevel.slug}`}
        >
          <ul>
            <For each={firstLevel.children!}>
              {(secondLevel, index) => (
                <SectionButton
                  title={secondLevel.title}
                  class="block pl-2 text-gray-500 dark:text-gray-300 py-1 text-md font-semibold my-2 break-words"
                  classList={{
                    'text-solid hover:text-solid-dark dark:hover:text-solid-light':
                      `#${secondLevel.slug}` === props.hash,
                    'hover:text-gray-400 dark:hover:text-gray-400':
                      `#${secondLevel.slug}` !== props.hash,
                    'pb-2': index() == firstLevel.children!.length - 1,
                  }}
                  href={`#${secondLevel.slug}`}
                >
                  <Show when={secondLevel.children && secondLevel.children.length !== 0}>
                    <ul class="my-5">
                      <For each={secondLevel.children!}>
                        {(thirdLevel) => (
                          <SectionButton
                            href={`#${thirdLevel.slug}`}
                            title={thirdLevel.title}
                            class="block ml-6 font-semibold text-gray-400 pb-2 text-sm my-2 break-words"
                            classList={{
                              'text-solid hover:text-solid-dark dark:hover:text-solid-dark':
                                `#${thirdLevel.slug}` === props.hash,
                              'hover:text-gray-500 dark:hover:text-gray-300':
                                `#${thirdLevel.slug}` !== props.hash,
                            }}
                          />
                        )}
                      </For>
                    </ul>
                  </Show>
                </SectionButton>
              )}
            </For>
          </ul>
        </SectionButton>
      )}
    </For>
  </ul>
);

const Docs: Component<{ hash?: string }> = (props) => {
  const data = useRouteData<DocData>();
  const [current, setCurrent] = createSignal<string | null>(null);
  const [toggleSections, setToggleSections] = createSignal(false);
  const scrollPosition = createScrollPosition();

  const sections: () => Section[] | undefined = () => {
    if (data.doc.sections.length == 1) {
      return data.doc.sections[0].children;
    }
    return data.doc.sections;
  };

  // Determine the section based on title positions
  const [determineSection] = createThrottle((position: number) => {
    let prev = sections()![0];
    const pos = position + 500;
    for (let i = 0; i > sections()!.length; i += 1) {
      const el = document.getElementById(sections()![i].slug)!;
      if (pos < el.offsetTop + el.clientHeight) {
        break;
      }
      prev = sections()![i];
    }
    setCurrent(prev.slug);
  }, 250);
  let menuButton!: HTMLButtonElement;

  // Upon loading finish bind observers
  createEffect(() => {
    if (!data.loading) {
      if (globalThis.location.hash !== '') {
        const anchor = document.getElementById(globalThis.location.hash.replace('#', ''));
        anchor && anchor!.scrollIntoView(true);
      }
    }
  });
  createEffect(() => determineSection(scrollPosition() || 0));

  useRouteReadyState();

  return (
    <div dir="ltr" class="lg:bg-doc dark:lg:bg-darkDoc flex min-h-screen flex-auto relative">
      <Show when={data.doc}>
        <div class="flex container">
          <div class="absolute z-20 left-0 h-full lg:static lg:w-3/12 bg-gray-100 dark:bg-gray-900 rounded-br-lg">
            <button
              class={`fixed lg:hidden top-20 right-3 text-white rounded-lg transition duration-500 bg-solid-medium reveal-delay ${
                !sections()!.length ? 'hidden' : ''
              }`}
              classList={{
                'rotate-90': toggleSections(),
                'opacity-0': routeReadyState().routeChanged,
              }}
              ref={menuButton}
            >
              <Icon class="h-7 w-7" path={chevronRight} />
            </button>
            <Dismiss
              show
              class="w-0 lg:w-auto lg:col-span-3 sticky top-[4rem]"
              menuButton={menuButton}
              open={toggleSections}
              setOpen={setToggleSections}
            >
              <div
                class={
                  'w-[85vw] overflow-auto p-10 shadow-2xl border-2 bg-white dark:bg-solid-darkbg border-gray-100 ' +
                  'dark:bg-solid-darkLighterBg fixed left-0 top-14 lg:bg-transparent lg:translate-x-0 lg:duration-0 transition-transform ' +
                  'duration-300 max-w-md lg:w-auto lg:border-0 lg:shadow-none lg:p-0 lg:flex-col lg:top-12 ' +
                  'relative lg:flex z-50'
                }
                classList={{
                  '-translate-x-full shadow-none': !toggleSections(),
                  'translate-x-0 shadow-2xl': toggleSections(),
                }}
                style={{ height: 'calc(100vh - 4rem)', top: 0 }}
              >
                <Sidebar items={sections()} current={current} hash={props.hash} />
              </div>
            </Dismiss>
          </div>
          <div class="w-full lg:w-9/12 p-5 md:p-10 bg-white dark:bg-solid-darkbg">
            <Switch fallback={'Failed to load markdown...'}>
              <Match when={data.loading}>Loading documentation...</Match>
              <Match when={data.doc}>
                <Show when={data.langAvailable}>
                  <div class="bg-yellow-100 dark:bg-yellow-900 p-5 rounded-lg text-sm">
                    Unfortunately our docs are not currently available in your language. We
                    encourage you to support Solid by{' '}
                    <a
                      class="underline"
                      target="_blank"
                      href="https://github.com/solidjs/solid-docs/blob/main/README.md#support"
                    >
                      helping with on-going translation efforts
                    </a>
                    .
                  </div>
                </Show>
                <div
                  class="prose dark:prose-invert lg:px-8 prose-solid max-w-full"
                  innerHTML={data.doc.html || data.doc.content}
                />
              </Match>
            </Switch>
          </div>
        </div>
      </Show>
      <Footer />
    </div>
  );
};

export default Docs;
