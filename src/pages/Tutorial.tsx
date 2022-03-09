import {
  For,
  Component,
  Show,
  createSignal,
  createEffect,
  Suspense,
  createMemo,
  on,
  batch,
  ErrorBoundary,
} from 'solid-js';
import { Repl, createTabList } from 'solid-repl';
import { useData, NavLink } from 'solid-app-router';
import { Icon } from 'solid-heroicons';
import { arrowLeft, arrowRight, chevronDown, chevronDoubleRight } from 'solid-heroicons/solid';

import { compiler, formatter } from '../components/setupRepl';
import type { TutorialDirectory, TutorialDirectoryItem, TutorialRouteData } from './Tutorial.data';
import { useI18n } from '@solid-primitives/i18n';
import Dismiss from 'solid-dismiss';
import { useRouteReadyState } from '../utils/routeReadyState';
import SolidMarkdown from 'solid-markdown';
import { useAppContext } from '../AppContext';
import rehypeHighlight from 'rehype-highlight';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

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
    <>
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
      <Dismiss menuButton={menuButton} open={showDirectory} setOpen={setShowDirectory}>
        <ol
          ref={listContainer}
          class="shadow-lg rounded-br-lg rounded-bl-lg absolute bg-white dark:bg-solid-darkLighterBg w-64 max-h-[50vh] left-8 overflow-auto rounded-b space-y-3 z-10"
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
              class="py-2 px-3 block w-full text-black"
            />
          </li>
          <For each={filteredDirectory()}>
            {([section, entries], sectionIndex) => (
              <li class="js-section-title bg-3">
                <p class="inline-block px-3 py-1 font-semibold">
                  {sectionIndex() + 1}. {section}
                </p>

                <ul class="divide-y divide-gray-500 box-border">
                  <For each={entries}>
                    {(entry, entryIndex) => (
                      <li>
                        <NavLink
                          activeClass="js-active bg-blue-50 dark:bg-solid-darkbg"
                          href={`/tutorial/${entry.internalName}`}
                          class="hover:bg-blue-100 dark:hover:bg-solid-medium py-3 px-5 block"
                        >
                          <p class="text-sm font-medium text-gray-900 dark:text-gray-200">
                            {alphabet[entryIndex()]}. {entry.lessonName}
                          </p>
                          <p class="text-sm text-gray-500 dark:text-gray-400">
                            {entry.description}
                          </p>
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
    </>
  );
};

const Tutorial: Component = () => {
  const data = useData<TutorialRouteData>();
  const context = useAppContext();
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
  const [open, setOpen] = createSignal(true);
  let markDownRef!: HTMLDivElement;

  useRouteReadyState();

  createEffect(() => {
    // markDownRef.scrollTop = 0;
    replEditor && replEditor.setScrollPosition({ scrollTop: 0 });
    const fileset = data.solved ? data.solvedJs : data.js;
    const files = fileset?.files;
    if (!files) return;
    batch(() => {
      const newTabs = files.map((file: { name: string; type?: string; content: string }) => {
        return {
          name: file.name,
          type: file.type || 'tsx',
          source: file.content,
        };
      });
      setTabs(newTabs);
      setCurrent('main.tsx');
    });
  });

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div
        dir="ltr"
        class="md:grid transition-all duration-300 h-[calc(100vh-64px)]"
        classList={{
          'grid-cols-[minmax(40%,_600px)_auto]': open(),
          'grid-cols-[minmax(100%,_600px)_auto]': !open(),
        }}
      >
        <div class="flex flex-col bg-gray-50 dark:bg-solid-darkbg h-full overflow-hidden border-r-2 dark:border-solid-darkLighterBg border-grey mb-10 md:mb-0 ">
          <div class="box-border pt-3 pb-2 rounded-t border-b-2 border-solid bg-white dark:bg-solid-darkLighterBg dark:border-solid-darkLighterBg">
            <button
              type="button"
              class="hidden md:block mr-5 mt-1 float-right"
              onClick={() => setOpen(!open())}
            >
              <Icon
                path={chevronDoubleRight}
                class="h-6 opacity-50 transition-all duration-300"
                classList={{ '-rotate-180': !open() }}
              />
            </button>
            <DirectoryMenu
              current={data.tutorialDirectoryEntry}
              directory={data.tutorialDirectory}
            />
          </div>
          <Show when={data.markdown} fallback={''}>
            {(markdown) => (
              <div
                ref={markDownRef}
                class="p-10 prose dark:prose-invert flex-1 max-w-full overflow-auto"
              >
                <SolidMarkdown
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    pre: ({ children, node, ...props }) => (
                      <div class="not-prose">
                        <pre {...props}>{children}</pre>
                      </div>
                    ),
                  }}
                >
                  {markdown}
                </SolidMarkdown>
              </div>
            )}
          </Show>

          <div class="py-4 px-10 flex items-center justify-between border-t-2 dark:border-solid-darkLighterBg">
            <Show
              when={data.solved}
              fallback={
                <NavLink
                  class="inline-flex py-2 px-3 bg-solid-default hover:bg-solid-medium text-white rounded"
                  href={`/tutorial/${data.id}?solved`}
                  onClick={() => setOpen(true)}
                >
                  {t('tutorial.solve')}
                </NavLink>
              }
            >
              <NavLink
                class="inline-flex py-2 px-3 bg-solid-default hover:bg-solid-medium text-white rounded"
                href={`/tutorial/${data.id}`}
                onClick={() => setOpen(true)}
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
                  <Icon path={arrowRight} class="h-6" classList={{ 'opacity-25': !data.nextUrl }} />
                </NavLink>
              </span>
            </div>
          </div>
        </div>
        <Show when={open()}>
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
              dark={context.isDark}
              tabs={tabs()}
              setTabs={setTabs}
              current={current()}
              setCurrent={setCurrent}
              id="tutorial"
            />
          </ErrorBoundary>
        </Show>
      </div>
    </Suspense>
  );
};

export default Tutorial;
