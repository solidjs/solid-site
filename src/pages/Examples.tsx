import { For, Component } from 'solid-js';
import { Repl, ReplTab } from 'solid-repl';
import { Link } from 'solid-app-router';

import Nav from '../components/Nav';
import Header from '../components/Header';

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
  ],
  Complex: [
    {
      id: 'scoreboard',
      name: 'Scoreboard',
      description: 'Make use of hooks to do simple transitions',
    },
  ],
};

const Examples: Component = () => {
  return (
    <div class="flex flex-col relative">
      <Nav showLogo />
      <Header title="Example Library" />

      <div style={{ width: '90vw' }} class="my-10 m-auto">
        <div class="grid grid-cols-12 gap-10">
          <div class="col-span-2">
            <For each={Object.entries(list)}>
              {([name, examples]) => (
                <>
                  <h3 class="text-xl text-solid border-b border-solid pb-3">{name}</h3>
                  <div class="mb-10">
                    <For each={examples}>
                      {(example) => (
                        <Link
                          class="block my-4 text-sm py-3 pl-2 border-b hover:opacity-60"
                          href={`/examples/${example.id}`}
                        >
                          {example.name}
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
            <Repl
              height={window.innerHeight - 80}
              isInteractive
              class="rounded-lg col-span-6 overflow-hidden shadow-2xl"
            >
              <ReplTab name="main">
                {`
                  import { createState, onCleanup } from "solid-js";
                  import { render } from "solid-js/web";

                  const CountingComponent = () => {
                    const [state, setState] = createState({ counter: 0 });
                    const interval = setInterval(
                      () => setState({ counter: state.counter + 1 }),
                      1000
                    );
                    onCleanup(() => clearInterval(interval));
                    return <div>Count value is {state.counter}</div>;
                  };

                  render(() => <CountingComponent />, document.getElementById("app"));
                `}
              </ReplTab>
            </Repl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examples;
