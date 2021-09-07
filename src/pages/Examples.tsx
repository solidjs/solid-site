import { createTabList, Repl } from 'solid-repl';
import { NavLink, useData, useParams } from 'solid-app-router';
import { For, Component, createSignal, createEffect, batch, ErrorBoundary } from 'solid-js';
import { ExamplesDataRoute } from './Examples.data';

import Nav from '../components/Nav';
import Header from '../components/Header';
import { compiler, formatter } from '../components/setupRepl';
import { useI18n } from '@solid-primitives/i18n';

const Examples: Component = () => {
  const data = useData<ExamplesDataRoute>();
  const [t] = useI18n();
  const params = useParams<{ id: string }>();
  const [tabs, setTabs] = createTabList([
    {
      name: 'main',
      type: 'tsx',
      source: '',
    },
  ]);
  const [current, setCurrent] = createSignal(`main.tsx`);
  createEffect(async () => {
    createEffect(async () => {
      const exampleData = await fetch(`${location.origin}/examples/${params.id}.json`).then((r) =>
        r.json(),
      );
      batch(() => {
        const newTabs = exampleData.files.map(
          (file: { name: string; type?: string; content: string | string[] }) => {
            return {
              name: file.name,
              type: file.type || 'tsx',
              source: Array.isArray(file.content) ? file.content.join('\n') : file.content,
            };
          },
        );
        setTabs(newTabs);
        setCurrent(`${newTabs[0].name}.tsx`);
      });
    });
  });
  return (
    <div class="flex flex-col relative">
      <Nav showLogo />
      <Header title={t('examples.title', {}, 'Examples')} />
      <div class="container my-10 w-[98vw] mx-auto">
        <div class="md:grid md:grid-cols-12 gap-6">
          <div class="md:col-span-4 lg:col-span-3 overflow-auto border p-5 rounded md:h-[82vh]">
            <For each={Object.entries(data.list)}>
              {([name, examples]) => (
                <>
                  <h3 class="text-xl text-solid-default border-b font-semibold border-solid pb-2">
                    {t(`examples.${name.toLowerCase()}`, {}, name)}
                  </h3>
                  <div class="mb-10">
                    <For each={examples}>
                      {(example) => (
                        <NavLink
                          href={`/examples/${example.id}`}
                          class="block my-4 text-sm py-3 pl-2 border-b hover:opacity-60"
                          activeClass="text-solid-light"
                        >
                          <span>{example.name}</span>
                          <span>{example.id === params.id}</span>
                          <span class="block text-gray-500 text-md">{example.description}</span>
                        </NavLink>
                      )}
                    </For>
                  </div>
                </>
              )}
            </For>
          </div>

          <div class="h-[82vh] rounded-lg md:col-span-8 lg:col-span-9 overflow-hidden shadow-2xl">
            <ErrorBoundary
              fallback={
                <>
                  Repl failed to load. You may be using a browser that doesn't support Web Workers.
                </>
              }
            >
              <Repl
                compiler={compiler}
                formatter={formatter}
                isHorizontal={true}
                interactive={true}
                actionBar={true}
                editableTabs={true}
                dark={false}
                tabs={tabs()}
                setTabs={setTabs}
                current={current()}
                setCurrent={setCurrent}
              />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examples;
