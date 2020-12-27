import { For, Component, Show, createComputed } from 'solid-js';
import { Repl, ReplTab } from 'solid-repl';
import { Link, useRouter } from 'solid-app-router';

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

const Examples: Component<{
  loading: boolean;
  example: { name: string; files: { name: string; content: string | string[] }[] };
  id: string;
}> = (props) => {
  const router = useRouter();

  createComputed(() => {
    /**
     * We need to find a way to implement middleware at the router lever
     */
    if (!props.id) router.push('/examples/counter');
  });

  return (
    <div class="flex flex-col relative">
      <Nav showLogo />
      <Header title="Example Library" />

      <div style={{ width: '90vw' }} class="my-10 mx-auto">
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
                          classList={{
                            'text-solid': example.id === props.id,
                          }}
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
            <Show when={!props.loading && props.id} fallback={<p>Loading...</p>}>
              <Repl
                height={window.innerHeight - 80}
                isInteractive
                class="rounded-lg col-span-6 overflow-hidden shadow-2xl"
              >
                {props.example.files.map((file) => {
                  const content = Array.isArray(file.content)
                    ? file.content.join('\n')
                    : file.content;

                  return <ReplTab name={file.name}>{content}</ReplTab>;
                })}
              </Repl>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examples;
