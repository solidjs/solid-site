import { Component, For, Show, Switch, Match, createEffect, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useRouter } from 'solid-app-router';
import { chevronDown, chevronRight } from '@amoutonbrady/solid-heroicons/solid';
import { createViewportObserver } from '@solid-primitives/intersection-observer';
import createThrottle from '@solid-primitives/throttle';

import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Section } from '../../scripts/types';
import { Icon } from '@amoutonbrady/solid-heroicons';

const Docs: Component<{
  doc: { content: string; sections: Section[] };
  hash: string;
  loading: boolean;
  version: string;
  lang: string;
}> = (props) => {
  // @ts-ignore
  const [, { push }] = useRouter();
  const [current, setCurrent] = createSignal<string | null>(null);
  const [section, setSection] = createStore<Record<string, boolean>>({});
  const [toggleSections, setToggleSections] = createSignal(false);
  const [observeInteraction] = createViewportObserver([], 0.5);
  // Determine the section based on title positions
  const [determineSection] = createThrottle((entry: IntersectionObserverEntry) => {
    if (entry.intersectionRatio == 0) {
      return;
    }
    let prev = props.doc.sections[0];
    for (let i in props.doc.sections) {
      const el = document.getElementById(props.doc.sections[i].slug)!;
      if (entry.boundingClientRect.top < el.getBoundingClientRect().top) {
        break;
      }
      prev = props.doc.sections[i];
    }
    setCurrent(prev.slug);
  }, 75);
  // Upon loading finish bind observers
  createEffect(() => {
    if (!props.loading) {
      props.doc.sections.forEach((section) => {
        // @ts-ignore
        observeInteraction(document.getElementById(section.slug)!, determineSection);
      });
      if (globalThis.location.hash !== '') {
        const anchor = document.getElementById(globalThis.location.hash.replace('#', ''));
        anchor!.scrollIntoView(true);
      }
    }
  });
  const changeLang = (evt: Event) => {
    const lang = (evt.target as HTMLSelectElement).value;
    push(window.location.pathname + `?lang=${lang}`);
  };
  return (
    <div class="flex flex-col relative">
      <Nav showLogo />
      <Header title="Documentation" />
      <Show when={!props.loading}>
        <div class="lg:px-12 container my-5 lg:grid lg:grid-cols-12 gap-4">
          <button
            class="fixed lg:hidden top-20 right-3 text-white rounded-lg pl-1 pt-1 transition duration-500 bg-solid-medium"
            classList={{
              'rotate-90': toggleSections(),
            }}
            onClick={() => setToggleSections(!toggleSections())}
          >
            <Icon class="h-7 w-7" path={chevronRight} />
          </button>
          <div class="col-span-4 lg:col-span-3 relative">
            <div
              class={
                'py-5 h-5/6 w-5/6 rounded-r-lg rounded-br-lg overflow-auto z-20 p-10 shadow-2xl border-2 border-gray-100 bg-white fixed top-12 duration-300 transform ' +
                'max-w-md lg:border-0 lg:shadow-none lg:p-0 lg:flex-col ' +
                'lg:sticky lg:flex'
              }
              classList={{
                '-left-full': !toggleSections(),
                'left-0': toggleSections(),
              }}
              style={{ height: 'calc(100vh - 5rem)', top: '4rem' }}
            >
              <select
                style={{
                  'background-image': 'url(/img/icons/translate2.svg)',
                  'background-size': '20px',
                }}
                value={props.lang}
                onChange={changeLang}
                class="p-3 pl-4 rounded-md border-gray-200 pt-4 text-sm my-5 w-full"
              >
                <option value="en">English</option>
                <option value="zh-cn">中文</option>
                <option value="it">Italiano</option>
              </select>
              <ul class="overflow-auto flex flex-col flex-1">
                <For each={props.doc.sections}>
                  {(firstLevel: Section) =>
                    firstLevel.children?.length ? (
                      <li>
                        <button
                          type="button"
                          class="text-left w-full text-solid-medium border-b hover:text-gray-400 transition flex flex-wrap content-center justify-between space-x-2 text-sm p-2 py-4"
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
                            'h-full': section[firstLevel.title],
                          }}
                        >
                          <For each={firstLevel.children!}>
                            {(secondLevel) => (
                              <li onClick={() => setToggleSections(false)}>
                                <a
                                  class="block px-5 border-b border-gray-100 pb-3 text-sm my-4 break-words"
                                  classList={{
                                    'text-solid hover:text-solid-dark':
                                      `#${secondLevel.slug}` === props.hash,
                                    'hover:text-gray-400': `#${secondLevel.slug}` !== props.hash,
                                  }}
                                  href={`#${secondLevel.slug}`}
                                  children={secondLevel.title}
                                />
                              </li>
                            )}
                          </For>
                        </ul>
                      </li>
                    ) : (
                      <li>
                        <a
                          class="text-left w-full text-solid-medium border-b hover:text-gray-400 transition flex flex-wrap content-center justify-between space-x-2 text-sm p-2 py-4"
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
          </div>

          <div class="col-span-8 lg:col-span-9 px-10 lg:px-0">
            <Switch fallback={'Failed to load markdown...'}>
              <Match when={props.loading}>Loading documentation...</Match>
              <Match when={props.doc}>
                <div class="prose prose-solid max-w-full" innerHTML={props.doc.content} />
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
