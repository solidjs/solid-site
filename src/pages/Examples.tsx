import Repl from 'solid-repl/dist/repl';
import { A, useParams } from '@solidjs/router';
import { For, Component, createSignal, createEffect, batch, ErrorBoundary, Show } from 'solid-js';
import { ExamplesDataRoute } from './Examples.data';

import { compiler, formatter, linter } from '../components/setupRepl';
import { useRouteReadyState } from '../utils/routeReadyState';
import { useAppState } from '../AppContext';
import type { Tab } from 'solid-repl';
import { entries } from '@solid-primitives/utils';

const Examples: Component<{data: ExamplesDataRoute}> = (props) => {
  const data = props.data;
  const context = useAppState();
  const { t } = context;
  const params = useParams<{ id: string }>();
  const [tabs, setTabs] = createSignal<Tab[]>([]);
  const [current, setCurrent] = createSignal('');

  useRouteReadyState();

  let currentData: {
    name: string;
    source: string;
  }[] = [];

  createEffect(async () => {
    const exampleData = (await fetch(`${location.origin}/examples/${params.id}.json`).then((r) =>
      r.json(),
    )) as {
      files: {
        name: string;
        type: string;
        content: string | string[];
      }[];
      version?: string;
    };
    batch(() => {
      currentData = exampleData.files.map(
        (file: { name: string; type?: string; content: string | string[] }) => {
          return {
            name: file.name + (file.type ? `.${file.type}` : '.jsx'),
            source: Array.isArray(file.content) ? file.content.join('\n') : file.content,
          };
        },
      );
      setTabs([
        ...currentData,
        {
          name: 'import_map.json',
          source: `{
  "solid-js": "https://jspm.dev/solid-js",
  "solid-js/web": "https://jspm.dev/solid-js/web"
}`,
        },
      ]);
      setCurrent(currentData[0].name);
    });
  });

  return (
    <div class="flex flex-col relative">
      <div class="container my-10 w-[98vw] mx-auto">
        <div class="md:grid md:grid-cols-12 gap-6">
          <div class="md:col-span-4 lg:col-span-3 overflow-auto border dark:border-solid-darkLighterBg p-5 rounded md:h-[82vh]">
            {entries(data.list).map(([name, examples]) => (
              <>
                <h3 class="text-xl text-solid-default dark:border-solid-darkLighterBg dark:text-solid-darkdefault border-b-2 font-semibold border-solid pb-2">
                  {t(`examples.${name.toLowerCase() as Lowercase<typeof name>}`)}
                </h3>
                <div class="mb-10">
                  <For each={examples}>
                    {(example) => (
                      <A
                        dir="ltr"
                        href={`/examples/${example.id}`}
                        class="block my-4 space-y-2 text-sm py-3 pl-2 border-b hover:opacity-60 dark:border-solid-darkLighterBg"
                        activeClass="text-solid-light dark:text-solid-darkdefault"
                      >
                        <span>{example.name}</span>
                        <span>{example.id === params.id}</span>
                        <span class="block text-gray-500 text-xs dark:text-white/40 text-md">
                          {example.description}
                        </span>
                      </A>
                    )}
                  </For>
                </div>
              </>
            ))}
          </div>

          <div
            dir="ltr"
            class="h-[82vh] rounded-lg md:col-span-8 lg:col-span-9 overflow-hidden shadow-2xl flex"
          >
            <ErrorBoundary
              fallback={
                <>
                  Repl failed to load. You may be using a browser that doesn't support Web Workers.
                </>
              }
            >
              <Show when={current()}>
                <Repl
                  compiler={compiler}
                  formatter={formatter}
                  linter={linter}
                  isHorizontal={true}
                  dark={context.isDark}
                  tabs={tabs()}
                  reset={() => {
                    batch(() => {
                      setTabs(currentData);
                      setCurrent(currentData[0].name);
                    });
                  }}
                  setTabs={setTabs}
                  current={current()}
                  setCurrent={setCurrent}
                  id="examples"
                />
              </Show>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examples;
