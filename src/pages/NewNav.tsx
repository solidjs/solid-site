import { Component, Show, For, createSignal } from 'solid-js';
import { eventListenerMap } from '@solid-primitives/event-listener';
import { createDebounce } from '@solid-primitives/debounce';
import Social from '../components/Social';
import { moon, sun } from 'solid-heroicons/outline';
import { Icon } from 'solid-heroicons';

type NavItem = {
  title: string;
  href: string;
  children?: NavItem[];
};

const nav = [
  {
    title: 'Learn',
    children: [
      { title: 'Guides', href: '' },
      { title: 'Documentation', href: '' },
      { title: 'Tutorials', href: '' },
      { title: 'Examples', href: '' },
    ],
    href: '#',
  },
  {
    title: 'Ecosystem',
    children: [
      { title: 'Articles', href: '' },
      { title: 'Videos', href: '' },
      { title: 'Podcasts', href: '' },
      { title: 'Packages', href: '' },
    ],
    href: '#',
  },
  { title: 'Playground', children: [], href: '#' },
];

const langs = {
  en: 'English',
  'ko-kr': '한국어',
  'zh-cn': '简体中文',
  ja: '日本語',
  it: 'Italiano',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  ru: 'Русский',
  id: 'Bahasa Indonesia',
  he: 'עִברִית',
  fa: 'فارسی',
  tr: 'Türkçe',
  tl: 'Filipino',
  es: 'Español',
  pl: 'Polski',
};

const Nav: Component = () => {
  eventListenerMap;
  const [index, setIndex] = createSignal<null | number>(null);
  const [showLang, setShowLang] = createSignal(false);
  const [dropdown, setDropdown] = createSignal<NavItem[]>([]);
  const [position, setPosition] = createSignal(0);
  const [dark] = createSignal(false);
  const removeDropdown = createDebounce(() => {
    setDropdown([]);
    setIndex(null);
  }, 200);
  return (
    <div class="flex justify-between absolute text-gray-500 top-5 left-5 right-5 w-90%">
      <div class="flex bg-white items-center text-[15px] rounded-2xl shadow-md">
        <div class="flex h-full rounded-r-full py-3 px-5 shadow-right">
          <img class="w-10" src="/img/logo/without-wordmark/logo.svg" />
          <img class="w-28" src="/img/logo/wordmark/logo.svg" />
        </div>
        <div class="pl-3 px-2 h-full">
          <ul class="flex h-full items-center justify-center">
            <For each={nav}>
              {(item, i) => (
                <li
                  use:eventListenerMap={{
                    mouseover: ({ currentTarget }) => {
                      removeDropdown.clear();
                      setDropdown(item.children);
                      setIndex(i);
                      setPosition(currentTarget.offsetLeft);
                    },
                    mouseout: removeDropdown,
                  }}
                >
                  <a href="#">
                    <div
                      class="px-3 py-3 rounded-lg transition-all"
                      classList={{
                        'bg-solid-medium text-white': index() == i(),
                      }}
                    >
                      {item.title}
                    </div>
                  </a>
                </li>
              )}
            </For>
          </ul>
        </div>
        <Show when={dropdown().length !== 0}>
          <div
            use:eventListenerMap={{
              mouseover: () => removeDropdown.clear(),
              mouseout: removeDropdown,
            }}
            class="absolute shadow-md rounded-b-xl bg-gray-100 py-3 bottom-0 min-w-[200px] transform origin-top-center transition-all"
            style={{
              transform: `translateX(${position()}px) translateY(100%)`,
            }}
          >
            <ul>
              <For each={dropdown()}>
                {(item) => (
                  <li>
                    <a
                      class="w-full block transition px-5 py-2 hover:text-solid-light"
                      href={item.title}
                    >
                      {item.title}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </Show>
      </div>
      <div class="flex bg-white items-center rounded-3xl shadow-md">
        <ul class="flex py-3 px-5">
          <Social />
        </ul>
        <div class="flex divide-x shadow-left rounded-full py-2 px-3 pl-5">
          <Show when={dark} fallback={<Icon path={moon} class="h-6" />}>
            <Icon path={sun} class="w-16" />
          </Show>
          <button
            aria-label="Select Language"
            onClick={() => setShowLang(!showLang())}
            class="dark:brightness-150 focus:color-red-500 bg-no-repeat bg-center bg-translate bg-24  cursor-pointer ml-2 rounded-md p-3 text-[15px] my-3 w-full"
          />
        </div>
        <Show when={showLang() == true}>
          <div
            class="absolute bottom-0 max-h-96 overflow-auto rounded-b-xl right-0 z-0 bg-white py-4 shadow-md transform origin-top-center"
            style={{ transform: 'translateY(100%)' }}
          >
            <ul>
              <For each={Object.entries(langs)}>
                {([locale, lang]) => (
                  <li>
                    <button
                      class="w-full px-6 py-2 hover:bg-solid-medium hover:text-white"
                      value={locale}
                    >
                      {lang}
                    </button>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </Show>
      </div>
    </div>
  );
};

const NewNav: Component = () => {
  return (
    <>
      <div>
        <Nav />
        <div class="bg-blocks-three w-screen h-[70vh] bg-no-repeat bg-cover"></div>
      </div>
    </>
  );
};

export default NewNav;
