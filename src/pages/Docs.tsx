import { Link } from 'solid-app-router';
import { Component, For, Show, Switch, Match, createSignal, createMemo } from 'solid-js';

import Nav from '../components/Nav';
import Header from '../components/Header';
import Markdown from '../components/Markdown';

const files = [
  {
    version: 'latest',
    latest: true,
    files: [
      'api',
      'comparison',
      'components',
      'context',
      'faq',
      'reactivity',
      'rendering',
      'resour',
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
  const current_docs = createMemo(() => {
    for (const file of files) {
      if ((props.version === 'latest' && file.latest === true) || file.version === props.version) {
        return file;
      }
    }
    return null;
  });

  return (
    <div class="flex flex-col relative">
      <Nav showLogo />
      <Header title="Documentation" />
      <div class="container grid my-10 grid-cols-12 gap-4">
        <div class="col-span-3">
          <div
            class="py-5 sticky flex flex-col"
            style={{ top: '8rem', height: 'calc(100vh - 80px - 2.5rem)' }}
          >
            <div class="border rounded-md text-md p-3 mb-4">Version {current_docs().version}</div>

            <ul class="overflow-auto flex-1">
              <For each={current_docs().files}>
                {(file) => (
                  <li>
                    <Link
                      class="block uppercase text-solid-medium border-b px-2 transition pb-3 text-sm my-4 hover:text-gray-400"
                      href={`/docs/${current_docs().version}/${file}`}
                      children={file}
                    />

                    <Show when={props.params.page === file}>
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
          <Switch fallback={'Failed to load markdown...'}>
            <Match when={props.loading}>Loading...</Match>
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
