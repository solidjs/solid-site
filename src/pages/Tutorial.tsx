import { Repl, createTabList } from 'solid-repl';
import { useData, NavLink } from 'solid-app-router';
import {
  For,
  Component,
  Show,
  createSignal,
  createEffect,
  onCleanup,
  Suspense,
  createMemo,
  on,
  batch,
  ErrorBoundary,
} from 'solid-js';
import { Icon } from '@amoutonbrady/solid-heroicons';
import { arrowLeft, arrowRight, chevronDown } from '@amoutonbrady/solid-heroicons/solid';

import Nav from '../components/Nav';
import Markdown from '../components/Markdown';
import { compiler, formatter } from '../components/setupRepl';
import type { TutorialDirectory, TutorialDirectoryItem, TutorialRouteData } from './Tutorial.data';
import { useI18n } from '@solid-primitives/i18n';
import Dismiss from 'solid-dismiss';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

interface DirectoryMenuProps {
  directory?: Record<string, TutorialDirectory>;
  current?: TutorialDirectoryItem;
}

const DirectoryMenu: Component<DirectoryMenuProps> = (props) => {
  const [showDirectory, setShowDirectory] = createSignal(false);
  const [searchQuery, setSearchQuery] = createSignal('');
  let listContainer!: HTMLOListElement;
  let menuButton!: HTMLButtonElement;
  let search!: HTMLInputElement;
  const directory = createMemo(() => Object.entries(props.directory || {}));
  const filteredDirectory = createMemo<[string, TutorialDirectory][]>(() => {
    return (
      directory()
        .map<[string, TutorialDirectory]>(([section, entries]) => [
          section,
          // TODO: Refactor this to be more easily digesteable (it's not that bad)
          entries.filter((entry) =>
            Object.values(entry).some((value: string) =>
              value.toLowerCase().includes(searchQuery().toLowerCase()),
            ),
          ),
        ])
        // Filter out sections that have no entries
        .filter(([_, entries]) => entries.length > 0)
    );
  });

  // Close the dropdown menu every time the `current` page changes
  // and reset the querySearch
  createEffect(
    on(
      () => props.current,
      () =>
        setTimeout(() => {
          setShowDirectory(false);
          setSearchQuery('');
        }, 0),
    ),
  );

  createEffect(() => {
    if (showDirectory()) {
      search.focus();
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.clientWidth; // reflow

      listContainer.querySelector('.js-active')?.scrollIntoView();
      window.scrollTo({ top: 0 });
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  });

  return (
    <div class="z-10 relative">
      <div class="box-border pt-3 pb-2 rounded-t border-b-2 border-solid bg-white">
        <button
          class="py-2 px-10 flex items-center focus:outline-none space-x-1 group"
          ref={menuButton}
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
      <Dismiss menuButton={menuButton} open={showDirectory} setOpen={setShowDirectory}>
        <ol
          ref={listContainer}
          class="shadow absolute bg-white w-64 max-h-[50vh] left-8 overflow-auto rounded-b space-y-3"
          classList={{ hidden: !showDirectory() }}
        >
          <li class="sticky top-0">
            <input
              ref={search}
              value={searchQuery()}
              onInput={(e) => setSearchQuery(e.currentTarget.value)}
              id="search"
              name="search"
              type="search"
              placeholder="Search..."
              class="py-2 px-3 block w-full"
            />
          </li>
          <For each={filteredDirectory()}>
            {([section, entries], sectionIndex) => (
              <li class="js-section-title">
                <p class="inline-block px-3 py-1 font-semibold">
                  {sectionIndex() + 1}. {section}
                </p>

                <ul class="divide-y box-border">
                  <For each={entries}>
                    {(entry, entryIndex) => (
                      <li>
                        <NavLink
                          activeClass="js-active bg-blue-50"
                          class="hover:bg-blue-100 py-3 px-4 block"
                          href={`/tutorial/${entry.internalName}`}
                        >
                          <p class="text-sm font-medium text-gray-900">
                            {alphabet[entryIndex()]}. {entry.lessonName}
                          </p>
                          <p class="text-sm text-gray-500">{entry.description}</p>
                        </NavLink>
                      </li>
                    )}
                  </For>
                </ul>
              </li>
            )}
          </For>
        </ol>
      </Dismiss>
    </div>
  );
};

const Tutorial: Component = () => {
  const data = useData<TutorialRouteData>();
  const [t] = useI18n();
  let replEditor: any;
  const [tabs, setTabs] = createTabList([
    {
      name: 'main',
      type: 'tsx',
      source: '',
    },
  ]);
  const [current, setCurrent] = createSignal('main.tsx');
  let markDownRef!: HTMLDivElement;
  createEffect(() => {
    markDownRef.scrollTop = 0;
    replEditor && replEditor.setScrollPosition({ scrollTop: 0 });
    const url = data.solved ? data.solvedJs : data.js;
    if (!url) return;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        batch(() => {
          const newTabs = data.files.map(
            (file: { name: string; type?: string; content: string }) => {
              return {
                name: file.name,
                type: file.type || 'tsx',
                source: file.content,
              };
            },
          );
          setTabs(newTabs);
          setCurrent('main.tsx');
        });
      });
  });
  return (
    <>
      <Nav showLogo filled />
      <Suspense fallback={<p>Loading...</p>}>
        <div
          dir="ltr"
          class="md:grid"
          style="height: calc(100vh - 64px); grid-template-columns: minmax(40%, 600px) auto"
        >
          <div class="flex flex-col bg-gray-50 h-full overflow-hidden border-r-2 border-grey mb-10 md:mb-0">
            <DirectoryMenu
              current={data.tutorialDirectoryEntry}
              directory={data.tutorialDirectory}
            />

            <Markdown ref={markDownRef} class="p-10 flex-1 max-w-full overflow-auto">
              {data.markdown || ''}
            </Markdown>

            <div class="py-4 px-10 flex items-center justify-between border-t-2">
              <Show
                when={data.solved}
                fallback={
                  <NavLink
                    class="inline-flex py-2 px-3 bg-solid-default hover:bg-solid-medium text-white rounded"
                    href={`/tutorial/${data.id}?solved`}
                  >
                    {t('tutorial.solve')}
                  </NavLink>
                }
              >
                <NavLink
                  class="inline-flex py-2 px-3 bg-solid-default hover:bg-solid-medium text-white rounded"
                  href={`/tutorial/${data.id}`}
                >
                  {t('tutorial.reset')}
                </NavLink>
              </Show>

              <div class="flex items-center space-x-4">
                <span data-tooltip={data.previousLesson}>
                  <NavLink href={data.previousUrl ?? '#'}>
                    <span class="sr-only">Previous step</span>
                    <Icon
                      path={arrowLeft}
                      class="h-6"
                      classList={{ 'opacity-25': !data.previousUrl }}
                    />
                  </NavLink>
                </span>

                <span data-tooltip={data.nextLesson}>
                  <NavLink href={data.nextUrl ?? '#'}>
                    <span class="sr-only">Next step</span>
                    <Icon
                      path={arrowRight}
                      class="h-6"
                      classList={{ 'opacity-25': !data.nextUrl }}
                    />
                  </NavLink>
                </span>
              </div>
            </div>
          </div>

          <ErrorBoundary
            fallback={
              <>Repl failed to load. You may be using a browser that doesn't support Web Workers.</>
            }
          >
            <Repl
              onEditorReady={(editor) => {
                replEditor = editor;
              }}
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
      </Suspense>
    </>
  );
};

export default Tutorial;
