import { For, Component, Show, createComputed } from 'solid-js';
import { Repl } from 'solid-repl';
import { Link, useRouter } from 'solid-app-router';

import Nav from '../components/Nav';
import Header from '../components/Header';
import Markdown from '../components/Markdown';
import type { Step } from './Tutorial.data';

const Tutorial: Component<{
  markdown: string;
  js: string;
  name: string;
  stepName: string;
  id: string;
  step: string;
  steps: Step[];
  description: string;
  numberOfSteps: number;
}> = (props) => {
  const router = useRouter();
  let stepNumber: number;

  const changeStep = (step: number): void => {
    router.push(`/tutorial/${props.id}/${step}`);
  };

  createComputed(() => {
    if (!props.id) {
      router.push('/tutorial/lesson_test/0');
    } else if (!props.step) {
      changeStep(0);
    }
    stepNumber = Number.parseInt(props.step);
  });

  return (
    <div class="flex flex-col relative">
      <Nav showLogo />
      <Header title="SolidJS Tutorial" />
      <div style={{ width: '95vw' }} class="my-10 mx-auto">
        <div class="flex grid grid-cols-12 gap-8">
          <div class="col-span-2 flex flex-col" style={{ height: '82vh' }}>
            <Show when={stepNumber !== 0}>
              <button onClick={() => changeStep(stepNumber - 1)}>Previous</button>
            </Show>
            <Show when={stepNumber < props.numberOfSteps - 1}>
              <button onClick={() => changeStep(stepNumber + 1)}>Next</button>
            </Show>
            <div class="overflow-auto border p-5 rounded flex-grow">
              <h3 class="text-xl text-solid border-b border-solid pb-2">{props.name}</h3>
              <span class="block text-gray-500 text-md">{props.description}</span>
              <For each={props.steps}>
                {(step, index) => (
                  <>
                    <div class="mb-10">
                      <Link
                        class="block my-4 text-sm py-3 pl-2 border-b hover:opacity-60"
                        classList={{
                          'text-solid font-bold': step.name === props.stepName,
                        }}
                        href={`/tutorial/${props.id}/${index()}`}
                      >
                        {step.name}
                      </Link>
                    </div>
                  </>
                )}
              </For>
            </div>
          </div>
          <div class="col-span-3">
            <Show when={props.markdown} fallback={<p>Loading...</p>}>
              <Markdown
                onLoadSections={() => {
                  return;
                }}
              >
                {props.markdown}
              </Markdown>
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
    </div>
  );
};

export default Tutorial;
