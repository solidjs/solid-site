import { Repl } from 'solid-repl';
import { Link } from 'solid-app-router';
import { For, Component, Show } from 'solid-js';

import Nav from '../components/Nav';
import Header from '../components/Header';

interface Props {
  id: string;
  example: string;
}

const list = {
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
      id: 'suspenselist',
      name: 'Suspense',
      description: "Various Async loading with Solid's Suspend control flow",
    },
    {
      id: 'suspensetabs',
      name: 'Suspense Tabs',
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
  return (
    <div class="flex flex-col relative">
      <Nav showLogo />
      <Header title="Example Library" />

      <div style={{ width: '95vw' }} class="my-10 mx-auto">
        <div class="flex grid grid-cols-12 gap-8">
          <div class="col-span-2 overflow-auto border p-5 rounded" style={{ height: '82vh' }}>
            <For each={Object.entries(list)}>
              {([name, examples]) => (
                <>
                  <h3 class="text-xl text-solid border-b border-solid pb-2">{name}</h3>
                  <div class="mb-10">
                    <For each={examples}>
                      {(example) => (
                        <Link
                          href={`/examples/${example.id}`}
                          class="block my-4 text-sm py-3 pl-2 border-b hover:opacity-60"
                          classList={{
                            'text-solid font-bold': example.id === props.id,
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

          <div class="col-span-10">
            <Show when={props.example} fallback={<p>Loading...</p>}>
              <Repl
                title="Interactive Example"
                height="85vh"
                data={props.example}
                isInteractive
                class="rounded-lg col-span-6 overflow-hidden shadow-2xl"
              />
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examples;
