import { Repl } from 'solid-repl';
import { Link, NavLink } from 'solid-app-router';
import { For, Component, Show, createSignal, createEffect, onCleanup } from 'solid-js';

import { Icon } from '@amoutonbrady/solid-heroicons';
import { arrowLeft, arrowRight, chevronDown } from '@amoutonbrady/solid-heroicons/solid';

import Nav from '../components/Nav';
import Header from '../components/Header';
import Markdown from '../components/Markdown';
import type { TutorialDirectory, TutorialDirectoryItem, TutorialProps } from './Tutorial.data';

interface DirectoryProps {
  directory: TutorialDirectory;
  current: TutorialDirectoryItem;
}

const DirectoryMenu: Component<DirectoryProps> = (props) => {
  const [showDirectory, setShowDirectory] = createSignal(false);

  const listener = (event: MouseEvent | KeyboardEvent) => {
    if (event instanceof MouseEvent) {
      return setShowDirectory(false);
    }

    if (event.key === 'Escape') setShowDirectory(false);
  };

  createEffect(() => {
    if (showDirectory()) {
      window.addEventListener('click', listener);
      window.addEventListener('keydown', listener);
    } else {
      window.removeEventListener('click', listener);
      window.removeEventListener('keydown', listener);
    }
  });

  onCleanup(() => {
    window.removeEventListener('click', listener);
    window.removeEventListener('keydown', listener);
  });

  return (
    <div class="z-10 sticky top-[80px]">
      <div class="box-border rounded-t border-b border-solid bg-white">
        <button
          class="py-2 flex flex items-center focus:outline-none space-x-1 group"
          onClick={(e) => {
            e.stopPropagation();
            setShowDirectory(!showDirectory());
          }}
        >
          <div class="flex-grow inline-flex flex-col items-baseline">
            <h3 class="text-xl text-solid leading-none">{props.current?.lessonName}</h3>
            <p class="block text-gray-500 text-md">{props.current?.description}</p>
          </div>

          <Icon
            path={chevronDown}
            class="h-8 -mb-1 transform transition group-hover:translate-y-0.5 duration-300"
            classList={{ 'translate-y-0.5': showDirectory() }}
          />
        </button>
      </div>

      <Show when={showDirectory()}>
        <ul class="block shadow absolute bg-white w-2/3 h-[40vh] overflow-auto shadow-lg divide-y box-border rounded-b">
          <For each={props.directory}>
            {(entry) => (
              <li>
                <NavLink
                  activeClass="bg-blue-50"
                  class="hover:bg-blue-100 py-2 px-1 block"
                  href={`/tutorial/${entry.internalName}`}
                >
                  <p class="text-sm font-medium text-gray-900">{entry.lessonName}</p>
                  <p class="text-sm text-gray-500">{entry.description}</p>
                </NavLink>
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
        <div class="my-10 container mx-auto relative">
          <div class="grid grid-cols-12 gap-12">
            <div class="col-span-5">
              <DirectoryMenu
                current={props.tutorialDirectoryEntry}
                directory={props.tutorialDirectory}
              />

              <Show when={props.markdown} fallback={<p>Loading...</p>}>
                <Markdown class="py-8">{props.markdown}</Markdown>

								<div class="flex items-center justify-between">
									<Show
										when={props.solved}
										fallback={
											<Link
												class="inline-flex py-2 px-3 bg-solid-default hover:bg-solid-mediumm text-white rounded"
												href={`/tutorial/${props.id}?solved`}
											>
												Solve
											</Link>
										}
									>
										<Link
											class="inline-flex py-2 px-3 bg-solid-default hover:bg-solid-medium text-white rounded"
											href={`/tutorial/${props.id}`}
										>
											Reset
										</Link>
									</Show>

									<div class="flex items-center space-x-4">
										<Link href="">
											<span class="sr-only">Previous step</span>
											<Icon path={arrowLeft} class="h-6" />
										</Link>

										<Link href="">
											<span class="sr-only">Next step</span>
											<Icon path={arrowRight} class="h-6" />
										</Link>
									</div>
								</div>
              </Show>
            </div>

            <div class="col-span-7">
              <Show when={props.js} fallback={<p>Loading...</p>}>
                <Repl
                  title="Interactive Example"
                  height="75vh"
                  data={`${location.origin}${props.solved ? props.solvedJs : props.js}`}
                  isInteractive
                  layout="vertical"
                  class="rounded-lg col-span-6 overflow-hidden shadow-2xl sticky top-[100px]"
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
