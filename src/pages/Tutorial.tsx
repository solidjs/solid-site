import { Repl } from 'solid-repl';
import { Link } from 'solid-app-router';
import { For, Component, Show, createSignal, createEffect, onCleanup } from 'solid-js';

import Nav from '../components/Nav';
import Header from '../components/Header';
import Markdown from '../components/Markdown';
import type { TutorialDirectory, TutorialDirectoryItem, TutorialProps } from './Tutorial.data';

const DirectoryMenu: Component<{ directory: TutorialDirectory; current: TutorialDirectoryItem }> = (
  props,
) => {
  const [showDirectory, setShowDirectory] = createSignal(false);
  const listener = (e: MouseEvent) => {
    setShowDirectory(false);
  }
  createEffect(() => {
    if (showDirectory()) {
      window.addEventListener("click", listener);
    } else {
      window.removeEventListener("click", listener);
    }
  });
  onCleanup(() => {
    window.removeEventListener("click", listener);
  })
  return (
    <div
      class="relative"
    >
      <div class="box-border rounded-t" classList={{ 'shadow-lg': showDirectory() }}>
        <button
          class="w-full border-b border-solid pb-2 flex flex items-center focus:outline-none"
          onClick={(e) => { e.stopPropagation(); setShowDirectory(!showDirectory()) }}
        >
          <div class="flex-grow inline-flex flex-col items-baseline">
            <h3 class="text-xl text-solid">{props.current?.lessonName}</h3>
            <p class="block text-gray-500 text-md">{props.current?.description}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <Show when={showDirectory()}>
        <ul classList={{ 'shadow-lg': showDirectory() }}
          class="block shadow absolute bg-white w-full divide-y box-border rounded-b"
        >
          <For each={props.directory}>
            {(entry) => (
              <li class="hover:bg-blue-100">
                <Link href={`/tutorial/${entry.internalName}`}>
                  <p class="text-sm font-medium text-gray-900">{entry.lessonName}</p>
                  <p class="text-sm text-gray-500">{entry.description}</p>
                </Link>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};

const Tutorial: Component<TutorialProps> = (props) => {
  return (
    <div class="flex flex-col relative">
      <Nav showLogo />
      <Header title="SolidJS Tutorial" />

      <Show when={!props.loading} fallback={<p>Loading...</p>}>
        <div style={{ width: '95vw' }} class="my-10 mx-auto">
          <div class="grid grid-cols-12 gap-8">
            <div class="col-span-4">
              <div>
                <DirectoryMenu
                  current={props.tutorialDirectoryEntry}
                  directory={props.tutorialDirectory}
                />
              </div>

              <Show when={props.markdown} fallback={<p>Loading...</p>}>
                <Markdown children={props.markdown} />
              </Show>
            </div>

            <div class="col-span-8">
              <Show when={props.js} fallback={<p>Loading...</p>}>
                <Repl
                  title="Interactive Example"
                  height="85vh"
                  data={`${location.origin}${props.js}`}
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
