import { Repl } from 'solid-repl';
import { Link } from 'solid-app-router';
import { For, Component, Show } from 'solid-js';

import Nav from '../components/Nav';
import Header from '../components/Header';
import Markdown from '../components/Markdown';
import type { Step } from './Tutorial.data';

interface Props {
  markdown: string;
  js: string;
  name: string;
  stepName: string;
  id: string;
  step: number;
  steps: Step[];
  description: string;
  numberOfSteps: number;
  loading: boolean;
}

const Tutorial: Component<Props> = (props) => {
  const goToStep = (index: number) => `/tutorial/${props.id}/${index}`;

  return (
    <div class="flex flex-col relative">
      <Nav showLogo />
      <Header title="SolidJS Tutorial" />

      <Show when={!props.loading} fallback={<p>Loading...</p>}>
        <div style={{ width: '95vw' }} class="my-10 mx-auto">
          <div class="grid grid-cols-12 gap-8">
            <div class="col-span-2 flex flex-col" style={{ height: '82vh' }}>
              <Show when={props.step > 0}>
                <Link href={goToStep(props.step - 1)}>Previous</Link>
              </Show>
              <Show when={props.step < props.numberOfSteps}>
                <Link href={goToStep(props.step + 1)}>Next</Link>
              </Show>

              <div class="overflow-auto border p-5 rounded flex-grow">
                <h3 class="text-xl text-solid border-b border-solid pb-2">{props.name}</h3>
                <p class="block text-gray-500 text-md">{props.description}</p>
                <For each={props.steps}>
                  {(step, index) => (
                    <div class="mb-10">
                      <Link
                        href={goToStep(index())}
                        children={step.name}
                        class="block my-4 text-sm py-3 pl-2 border-b hover:opacity-60"
                        classList={{
                          'text-solid font-bold': step.name === props.stepName,
                        }}
                      />
                    </div>
                  )}
                </For>
              </div>
            </div>

            <div class="col-span-3">
              <Show when={props.markdown} fallback={<p>Loading...</p>}>
                <Markdown children={props.markdown} />
              </Show>
            </div>

            <div class="col-span-7">
              <Show when={props.js} fallback={<p>Loading...</p>}>
                <Repl
                  title="Interactive Example"
                  height="85vh"
                  data={props.js}
                  isInteractive
                  class="rounded-lg col-span-6 overflow-hidden shadow-2xl"
                />
              </Show>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default Tutorial;
