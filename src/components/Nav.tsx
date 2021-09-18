import { Component, For, createMemo, createSignal, Show, onCleanup } from 'solid-js';
import { Link, NavLink, useData } from 'solid-app-router';
import { useI18n } from '@solid-primitives/i18n';
import { createIntersectionObserver } from '@solid-primitives/intersection-observer';
import logo from '../assets/logo.svg';
import ScrollShadow from './ScrollShadow/ScrollShadow';
import Social from './Social';

const langs = {
  en: 'English',
  'zh-cn': '简体中文',
  ja: '日本語',
  it: 'Italiano',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  ru: 'русский',
  id: 'Bahasa Indonesia',
  he: 'עִברִית',
};

type MenuLinkProps = { path: string; external?: boolean; title: string };

const MenuLink: Component<MenuLinkProps> = (props) => (
  <li>
    <NavLink
      href={props.path}
      class="inline-flex items-center transition m-1 px-4 py-3 rounded hover:text-white hover:bg-solid-medium whitespace-nowrap"
      activeClass="bg-solid-medium text-white"
    >
      <span>{props.title}</span>
      <Show when={props.external}>
        <svg
          class="h-5 -mt-1 ltr:ml-1 rtl:mr-1 opacity-30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </Show>
    </NavLink>
  </li>
);

const LanguageSelector: Component<{ onClick: () => void; class?: string }> = (props) => (
  <li class={props.class || ''}>
    <button
      onClick={props.onClick}
      class="dark:bg-solid-gray focus:color-red-500 bg-no-repeat bg-center hover:border-gray-500 cursor-pointer dark:border-dark px-6 pl-4 ml-5 rounded-md h-10 border border-solid-100 pt-4 text-sm my-3 w-full"
      style={{
        'background-image': 'url(/img/icons/translate2.svg)',
        'background-size': '24px',
      }}
    />
  </li>
);

const Nav: Component<{ showLogo?: boolean; filled?: boolean }> = (props) => {
  const [showLangs, toggleLangs] = createSignal(false);
  const [locked, setLocked] = createSignal<boolean>(true);
  const [t, { locale }] = useI18n();
  let firstLoad = true;
  const [observer] = createIntersectionObserver([], ([entry]) => {
    if (firstLoad) {
      firstLoad = false;
      return;
    }
    setLocked(entry.isIntersecting);
  });
  const showLogo = createMemo(() => (props.showLogo ? true : !locked()));
  return (
    <>
      <div use:observer class="h-0" />
      <div
        class="flex justify-center sticky top-0 z-50 dark:bg-solid-gray bg-white"
        classList={{ 'shadow-md': showLogo() }}
      >
        <nav class="px-3 lg:px-12 container lg:flex justify-between items-center max-h-18 relative z-20 space-x-10">
          <ScrollShadow
            class="relative nav-items-container"
            direction="horizontal"
            shadowSize="25%"
            initShadowSize={true}
          >
            <ul class="relative flex items-center overflow-auto no-scrollbar">
              <li
                class="sticky z-10 left-0 nav-logo-bg dark:bg-solid-gray"
                classList={{ 'pr-5': showLogo() }}
              >
                <Link href="/" class={`py-3 flex transition-all ${showLogo() ? 'w-9' : 'w-0'}`}>
                  <span class="sr-only">Navigate to the home page</span>
                  <img class="w-full h-auto" src={logo} alt="Solid logo" />
                </Link>
              </li>
              <For each={t('global.nav')} children={MenuLink} />
              <LanguageSelector onClick={() => toggleLangs(!showLangs())} class="flex lg:hidden" />
            </ul>
          </ScrollShadow>
          <ul class="hidden lg:flex items-center">
            <Social />
            <LanguageSelector onClick={() => toggleLangs(!showLangs())} />
          </ul>
        </nav>
        <Show when={showLangs()}>
          <div class="container mx-auto bottom-0 bg-gray-200 absolute flex -mt-4 justify-end">
            <div class="absolute mt-2 ltr:mr-5 rtl:ml-12 border rounded-md w-40 bg-white shadow-md">
              <For each={Object.entries(langs)}>
                {([lang, label]) => (
                  <button
                    class="first:rounded-t hover:bg-solid-lightgray last:rounded-b text-left p-3 text-sm border-b w-full"
                    classList={{
                      'bg-solid-medium text-white': lang == locale(),
                      'hover:bg-solid-light': lang == locale(),
                    }}
                    onClick={() => locale(lang) && toggleLangs(false)}
                  >
                    {label}
                  </button>
                )}
              </For>
            </div>
          </div>
        </Show>
      </div>
    </>
  );
};

export default Nav;
