import { Link } from 'solid-app-router';
import { Component, For, Show, Switch, Match, createSignal, createMemo } from 'solid-js';

import Nav from '../components/Nav';
import Header from '../components/Header';
import Markdown from '../components/Markdown';

import downloadArrow from '../assets/download-arrow.svg';

const version_list = [
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
  const [sections, setSections] = createSignal<{ id: string; title: string }[]>([]);
  const [showVersions, setShowVersions] = createSignal<boolean>(false);
  const current_docs = createMemo(() => {
    for (const file of version_list) {
      if (
        (props.version === 'latest' && file.latest === true) ||
        file.version === props.version.replace('v', '')
      ) {
        return file;
      }
    }
    return null;
  });
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
                {current_docs().latest === true
                  ? `Latest version (v${current_docs().version})`
                  : `Version (${current_docs().version})`}
              </div>
              <Show when={showVersions() === true}>
                <For each={version_list}>
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
              <For each={current_docs().files}>
                {(file) => (
                  <li>
                    <Link
                      class="block uppercase text-solid-medium border-b px-2 transition pb-3 text-sm my-4 hover:text-gray-400 grid grid-cols-6"
                      href={`/docs/${
                        current_docs().latest === true ? 'latest' : `v${current_docs().version}`
                      }/${file}`}
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
                    <Show when={props.loading === false && props.params.page === file}>
                      <For each={sections()}>
                        {(section) => (
                          <a
                            class="block px-5 border-b border-gray-100 pb-3 text-sm my-4 break-words"
                            classList={{
                              'text-solid hover:text-solid-dark': `#${section.id}` === props.hash,
                              'hover:text-gray-400': `#${section.id}` !== props.hash,
                            }}
                            href={`#${section.id}`}
                            children={section.title}
                          />
                        )}
                      </For>
                    </Show>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </div>
        <div class="col-span-9 p-5">
          <Show when={current_docs().latest !== true}>
            <div
              class="sticky p-5 bg-solid-gray text-white z-50 rounded-sm mb-8"
              style={{ top: '5.5rem' }}
            >
              <strong>Important:</strong> This documentation is for an older version{' '}
              {current_docs().version} of Solid.js which may be different than the latest.&nbsp;{' '}
              <a href="/docs/latest/api" class="text-gray-300">
                Click here
              </a>{' '}
              to view the latest version.
            </div>
          </Show>
          <Switch fallback={'Failed to load markdown...'}>
            <Match when={props.loading}>Loading documentation...</Match>
            <Match when={props.markdown}>
              {(body) => <Markdown onLoadSections={setSections}>{body}</Markdown>}
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Docs;
