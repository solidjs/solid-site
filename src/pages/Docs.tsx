import { Component, For, Show, Switch, Match, createState } from 'solid-js';

import Nav from '../components/Nav';
import Header from '../components/Header';
import { Section } from '../../scripts/types';
import arrowDown from '../assets/download-arrow.svg';
import Footer from '../components/Footer';

const Docs: Component<{
  doc: { content: string; sections: Section[] };
  hash: string;
  loading: boolean;
  version: string;
}> = (props) => {
  const [section, setSection] = createState<Record<string, boolean>>({});

  return (
    <div class="flex flex-col relative">
      <Nav showLogo />
      <Header title="Documentation" />

      <Show when={!props.loading}>
        <div class="px-3 lg:px-12 container grid my-5 grid-cols-12 gap-4">
          <div class="col-span-3">
            <div
              class="flex flex-col py-5 sticky"
              style={{ height: 'calc(100vh - 80px - 2.5rem)', top: '6rem' }}
            >
              <ul class="overflow-auto flex flex-col flex-1 mt-3">
                <For each={props.doc.sections}>
                  {(firstLevel: Section) => (
                    <li>
                      <button
                        type="button"
                        class="text-left block w-full text-solid-medium border-b hover:text-gray-400 transition"
                        onClick={() => setSection(firstLevel.title, (prev) => !prev)}
                      >
                        <a
                          class="flex justify-between space-x-2 text-sm p-2 py-4"
                          href={`#${firstLevel.slug}`}
                        >
                          <span class="flex-1 font-semibold">{firstLevel.title}</span>

                          <img
                            class="col-span-1 col-end-8 w-3 transform"
                            classList={{
                              'rotate-180': !!section[firstLevel.title],
                              hidden: !firstLevel.children.length,
                            }}
                            src={arrowDown}
                          />
                        </a>
                      </button>

                      <ul
                        class="overflow-hidden"
                        classList={{
                          'h-0': !section[firstLevel.title],
                        }}
                      >
                        <For each={firstLevel.children}>
                          {(secondLevel) => (
                            <li>
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
                  )}
                </For>
              </ul>
            </div>
          </div>

          <div class="col-span-9 px-10 mx-5">
            {/* <Show when={!currentDocs().latest}>
            <p
              class="sticky p-5 bg-solid-gray text-white z-50 rounded-sm mb-8"
              style={{ top: '5.5rem' }}
            >
              <strong>Important:</strong> <span>This documentation is for an older version</span>{' '}
              <span>({currentDocs().version})</span>{' '}
              <span>of Solid.js which may be different than the latest.</span>{' '}
              <Link href="/docs/latest/api" class="text-blue-200 hover:underline">
                Click here
              </Link>{' '}
              <span>to view the latest version.</span>
            </p>
          </Show> */}

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
