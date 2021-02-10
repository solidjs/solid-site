import { Link } from 'solid-app-router';
import { Component, For, Show, Switch, Match, createSignal, createMemo } from 'solid-js';

import Nav from '../components/Nav';
import Header from '../components/Header';
import Markdown, { Section } from '../components/Markdown';

import downloadArrow from '../assets/download-arrow.svg';

const versions = [
  {
    version: '0.23.0',
    latest: true,
    files: [
      'getstarted',
      'api',
      'comparison',
      'components',
      'context',
      'faq',
      'reactivity',
      'rendering',
      'state',
      'storybook',
      'styling',
      'suspense',
      'troubleshooting',
    ],
  },
  {
    version: '0.22.0',
    latest: false,
    files: [
      'api',
      'comparison',
      'components',
      'context',
      'faq',
      'reactivity',
      'rendering',
      'state',
      'storybook',
      'styling',
      'suspense',
      'troubleshooting',
    ],
  },
  {
    version: '0.17.0',
    latest: false,
    files: [
      'api',
      'comparison',
      'components',
      'context',
      'faq',
      'reactivity',
      'rendering',
      'state',
      'storybook',
      'styling',
      'suspense',
      'troubleshooting',
    ],
  },
  {
    version: '0.16.0',
    latest: false,
    files: [
      'api',
      'comparison',
      'components',
      'context',
      'faq',
      'reactivity',
      'rendering',
      'state',
      'storybook',
      'styling',
      'suspense',
      'troubleshooting',
    ],
  },
];

const Docs: Component<{
  markdown: string;
  loading: boolean;
  version: string;
  params: Record<string, string>;
  hash: string;
}> = (props) => {
  const [showVersions, setShowVersions] = createSignal(false);
  const [hash, setHash] = createSignal(props.hash);
  const [sections, setSections] = createSignal<Section[]>([]);

  const currentDocs = createMemo(() =>
    versions.find((file) =>
      props.version === 'latest' ? file.latest : props.version.includes(file.version),
    ),
  );

  const version = () => (currentDocs().latest ? 'latest' : `v${currentDocs().version}`);

  return (
    <div class="flex flex-col relative">
      <Nav showLogo />
      <Header title="Documentation" />

      <div class="px-3 lg:px-12 container grid my-5 grid-cols-12 gap-4">
        <div class="col-span-3">
          <div
            class="flex flex-col py-5 sticky"
            style={{ top: '6rem', height: 'calc(100vh - 80px - 2.5rem)' }}
          >
            <div class="border rounded-md">
              <div
                class="p-3 transition cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSections([]);
                  setShowVersions(!showVersions());
                }}
              >
                {currentDocs().latest
                  ? `Latest version (v${currentDocs().version})`
                  : `Version (${currentDocs().version})`}
              </div>

              <Show when={showVersions() === true}>
                <For each={versions}>
                  {(item) => (
                    <a
                      class="block py-2 px-4 border-t hover:text-gray-500"
                      href={`/docs/v${item.version}/${item.files[0]}`}
                    >
                      v{item.version}
                    </a>
                  )}
                </For>
              </Show>
            </div>
            <ul class="overflow-auto flex-1 mt-3">
              <For each={currentDocs().files}>
                {(file) => (
                  <li>
                    <Link
                      class="uppercase text-solid-medium border-b px-2 transition pb-3 text-sm my-4 hover:text-gray-400 grid grid-cols-6"
                      href={`/docs/${version()}/${file}`}
                    >
                      <span class="col-span-5">{file}</span>
                      <img
                        class="col-span-1 col-end-8 w-3 transform"
                        classList={{
                          'rotate-180': props.params.page === file,
                        }}
                        src={downloadArrow}
                      />
                    </Link>

                    <Show when={!props.loading && props.params.page === file}>
                      <ul>
                        <For each={sections()}>
                          {(section) => (
                            <li>
                              <a
                                class="block px-5 border-b border-gray-100 pb-3 text-sm my-4 break-words"
                                classList={{
                                  'text-solid hover:text-solid-dark': `#${section.id}` === hash(),
                                  'hover:text-gray-400': `#${section.id}` !== hash(),
                                }}
                                href={`#${section.id}`}
                                children={section.title}
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
          </div>
        </div>

        <div class="col-span-9 p-5">
          <Show when={!currentDocs().latest}>
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
          </Show>

          <Switch fallback={'Failed to load markdown...'}>
            <Match when={props.loading}>Loading documentation...</Match>
            <Match when={props.markdown}>
              {(body) => (
                <Markdown onLoadSections={setSections} onSectionChange={setHash} children={body} />
              )}
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Docs;
