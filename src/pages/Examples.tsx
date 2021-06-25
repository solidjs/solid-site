import { createTabList, Repl } from 'solid-repl';
import { Link } from 'solid-app-router';
import { For, Component, createSignal, createEffect, batch } from 'solid-js';

import Nav from '../components/Nav';
import Header from '../components/Header';
import { compiler, formatter } from '../components/setupRepl';

interface Props {
  params: any;
}
interface Example {
  id: string;
  name: string;
  description: string;
}

const list: Record<string, Example[]> = {
  Basic: [
    {
      id: 'counter',
      name: 'Counter',
      description: 'A simple standard counter example',
    },
    {
      id: 'todos',
      name: 'Simple Todos',
      description: 'Todos with LocalStorage persistence',
    },
    {
      id: 'forms',
      name: 'Form Validation',
      description: 'HTML 5 validators with custom async validation',
    },
    {
      id: 'cssanimations',
      name: 'CSS Animations',
      description: 'Using Solid Transition Group',
    },
  ],
  Complex: [
    {
      id: 'scoreboard',
      name: 'Scoreboard',
      description: 'Make use of hooks to do simple transitions',
    },
    {
      id: 'asyncresource',
      name: 'Async Resource',
      description: 'Ajax requests to SWAPI with Promise cancellation',
    },
    {
      id: 'suspensetabs',
      name: 'Suspense Transitions',
      description: 'Defered loading spinners for smooth UX',
    },
    {
      id: 'simpletodos',
      name: 'Simple Todos Template Literals',
      description: 'Simple Todos using Lit DOM Expressions',
    },
    {
      id: 'simpletodoshyperscript',
      name: 'Simple Todos Hyperscript',
      description: 'Simple Todos using Hyper DOM Expressions',
    },
  ],
};

const Examples: Component<Props> = (props) => {
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
      const data = await fetch(`${location.origin}/examples/${props.params.id}.json`).then((r) =>
        r.json(),
      );
      batch(() => {
        const newTabs = data.files.map((file) => {
          return {
            name: file.name,
            type: file.type || 'tsx',
            source: Array.isArray(file.content) ? file.content.join('\n') : file.content,
          };
        });
        setTabs(newTabs);
        setCurrent(`${newTabs[0].name}.tsx`);
      });
    });
  });
  return (
    <div class="flex flex-col relative">
      <Nav showLogo />
      <Header title="Example Library" />

      <div class="my-10 w-[98vw] mx-auto">
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-3 overflow-auto border p-5 rounded h-[82vh]">
            <For each={Object.entries(list)}>
              {([name, examples]) => (
                <>
                  <h3 class="text-xl text-solid-default border-b font-semibold border-solid pb-2">
                    {name}
                  </h3>
                  <div class="mb-10">
                    <For each={examples}>
                      {(example) => (
                        <Link
                          href={`/examples/${example.id}`}
                          class="block my-4 text-sm py-3 pl-2 border-b hover:opacity-60"
                          classList={{
                            'text-solid font-semibold': example.id === props.params.id,
                          }}
                        >
                          <span>{example.name}</span>
                          <span class="block text-gray-500 text-md">{example.description}</span>
                        </Link>
                      )}
                    </For>
                  </div>
                </>
              )}
            </For>
          </div>

          <div class="col-span-9 h-[85vh] rounded-lg col-span-6 overflow-hidden shadow-2xl">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examples;
