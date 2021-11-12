import { Component, For, Show, Switch, Match, createEffect, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useData } from 'solid-app-router';
import { chevronDown, chevronRight } from '@amoutonbrady/solid-heroicons/solid';
import { createViewportObserver } from '@solid-primitives/intersection-observer';
import { Icon } from '@amoutonbrady/solid-heroicons';
import createThrottle from '@solid-primitives/throttle';
import Dismiss from 'solid-dismiss';

import Footer from '../components/Footer';
import { routeReadyState, useRouteReadyState } from '../utils/routeReadyState';

const Docs: Component<{ hash?: string }> = (props) => {
  const data = useData<DocData>();
  const [current, setCurrent] = createSignal<string | null>(null);
  const [section, setSection] = createStore<Record<string, boolean>>({});
  const [toggleSections, setToggleSections] = createSignal(false);
  const [observeInteraction] = createViewportObserver({ threshold: 0.5 });

  // Determine the section based on title positions
  const [determineSection] = createThrottle((entry: IntersectionObserverEntry) => {
    if (entry.intersectionRatio == 0) {
      return;
    }
    let prev = data.doc.sections[0];
    for (let i in data.doc.sections) {
      const el = document.getElementById(data.doc.sections[i].slug)!;
      if (entry.boundingClientRect.top < el.getBoundingClientRect().top) {
        break;
      }
      prev = data.doc.sections[i];
    }
    setCurrent(prev.slug);
  }, 75);
  let menuButton!: HTMLButtonElement;

  useRouteReadyState();

  // Upon loading finish bind observers
  createEffect(() => {
    if (!data.loading) {
      data.doc.sections.forEach((section) => {
        // @ts-ignore
        observeInteraction(document.getElementById(section.slug)!, determineSection);
      });
      if (globalThis.location.hash !== '') {
        const anchor = document.getElementById(globalThis.location.hash.replace('#', ''));

        anchor && anchor!.scrollIntoView(true);
      }
    }
  });
  return (
    <div class="flex flex-col relative">
      <Show when={data.doc}>
        <div dir="ltr" class="lg:px-12 container my-5 lg:grid lg:grid-cols-12 gap-4">
          <button
            class="fixed lg:hidden top-20 right-3 text-white rounded-lg pl-1 pt-1 transition duration-500 bg-solid-medium reveal-delay"
            classList={{
              'rotate-90': toggleSections(),
              'opacity-0': routeReadyState().routeChanged,
            }}
            ref={menuButton}
          >
            <Icon class="h-7 w-7" path={chevronRight} />
          </button>
          <Dismiss
            class="col-span-4 lg:col-span-3 relative"
            menuButton={menuButton}
            open={toggleSections}
            setOpen={setToggleSections}
            show
          >
            <div
              class={
                'py-5 h-5/6 w-5/6 rounded-r-lg rounded-br-lg overflow-auto z-20 p-10 shadow-2xl border-2 border-gray-100 dark:bg-solid-gray bg-white fixed left-0 top-14 lg:translate-x-0 lg:duration-0 transition-transform duration-300 ' +
                'max-w-md lg:border-0 lg:shadow-none lg:p-0 lg:flex-col lg:top-12 ' +
                'lg:sticky lg:flex'
              }
              classList={{
                '-translate-x-full': !toggleSections(),
                'translate-x-0': toggleSections(),
              }}
              style={{ height: 'calc(100vh - 5rem)', top: '4rem' }}
            >
              <ul class="overflow-auto mt-5 flex dark:text-white flex-col flex-1">
                <For each={data.doc.sections}>
                  {(firstLevel: Section) =>
                    firstLevel.children?.length ? (
                      <li>
                        <button
                          type="button"
                          class="text-left w-full dark:text-white text-solid-medium border-b hover:text-gray-400 transition flex flex-wrap content-center justify-between space-x-2 text-sm p-2 py-4"
                          onClick={() => setSection(firstLevel.title, (prev) => !prev)}
                        >
                          <span
                            class="flex-1"
                            classList={{
                              'font-semibold': current() == firstLevel.slug,
                            }}
                          >
                            {firstLevel.title}
                          </span>
                          <Icon
                            class="opacity-50 h-5 w-7 transform transition origin-center"
                            classList={{
                              'rotate-180 opacity-100': !!section[firstLevel.title],
                              hidden: !firstLevel.children!.length,
                            }}
                            path={chevronDown}
                          />
                        </button>
                        <ul
                          class="overflow-hidden transition"
                          classList={{
                            'h-0': section[firstLevel.title] !== true,
                            invisible: section[firstLevel.title] !== true,
                            'h-full': section[firstLevel.title],
                          }}
                        >
                          <For each={firstLevel.children!}>
                            {(secondLevel) => (
                              <li onClick={() => setToggleSections(false)}>
                                <a
                                  class="block pl-5 border-b border-gray-100 text-gray-500  pb-3 text-sm my-4 break-words"
                                  classList={{
                                    'text-solid hover:text-solid-dark':
                                      `#${secondLevel.slug}` === props.hash,
                                    'hover:text-gray-400': `#${secondLevel.slug}` !== props.hash,
                                  }}
                                  href={`#${secondLevel.slug}`}
                                  children={secondLevel.title}
                                />
                                <Show when={secondLevel.children}>
                                  <ul>
                                    <For each={secondLevel.children!}>
                                      {(thirdLevel) => (
                                        <li>
                                          <a
                                            class="block ml-8 border-b border-gray-100 text-gray-400 pb-3 text-xs my-4 break-words"
                                            classList={{
                                              'text-solid hover:text-solid-dark':
                                                `#${thirdLevel.slug}` === props.hash,
                                              'hover:text-gray-400':
                                                `#${thirdLevel.slug}` !== props.hash,
                                            }}
                                            href={`#${thirdLevel.slug}`}
                                            children={`› ${thirdLevel.title}`}
                                          />
                                        </li>
                                      )}
                                    </For>
                                  </ul>
                                </Show>
                              </li>
                            )}
                          </For>
                        </ul>
                      </li>
                    ) : (
                      <li>
                        <a
                          class="text-left w-full dark:text-white text-solid-medium border-b hover:text-gray-400 transition flex flex-wrap content-center justify-between space-x-2 text-sm p-2 py-4"
                          classList={{
                            'font-semibold': current() == firstLevel.slug,
                            'text-solid hover:text-solid-dark':
                              `#${firstLevel.slug}` === props.hash,
                            'hover:text-gray-400': `#${firstLevel.slug}` !== props.hash,
                          }}
                          href={`#${firstLevel.slug}`}
                          children={firstLevel.title}
                        />
                      </li>
                    )
                  }
                </For>
              </ul>
            </div>
          </Dismiss>

          <div class="col-span-8 lg:col-span-9 px-10 lg:px-0">
            <Switch fallback={'Failed to load markdown...'}>
              <Match when={data.loading}>Loading documentation...</Match>
              <Match when={data.doc}>
                <Show when={data.langAvailable}>
                  <div class="bg-yellow-100 p-5 rounded-lg text-sm">
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
                  class="prose dark:text-white prose-solid max-w-full"
                  innerHTML={data.doc.content}
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
