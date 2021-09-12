import { Link, NavLink, useData } from 'solid-app-router';
import { Component, For, createSignal, Show } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { createIntersectionObserver } from '@solid-primitives/intersection-observer';
import logo from '../assets/logo.svg';
import ScrollShadow from './ScrollShadow/ScrollShadow';
import Social from './Social';

const Logo: Component<{ show: boolean }> = (props) => (
  <li class="sticky z-10 left-0 nav-logo-bg dark:bg-solid-gray" classList={{ 'pr-5': props.show }}>
    <Link href="/" class={`py-3 flex transition-all ${props.show ? 'w-9' : 'w-0'}`}>
      <span class="sr-only">Navigate to the home page</span>
      <img class="w-full h-auto" src={logo} alt="Solid logo" />
    </Link>
  </li>
);

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

const LanguageSelector: Component<{ class?: string }> = (props) => {
  const [t, { locale }] = useI18n();
  return (
    <li class={props.class || ''}>
      <select
        class="dark:bg-solid-gray hover:border-gray-500 cursor-pointer dark:border-dark p-3 pl-4 ml-5 rounded-md border-gray-200 pt-4 text-sm my-3 w-full"
        style={{
          color: 'transparent',
          'max-width': '42.5px',
          'background-image': 'url(/img/icons/translate2.svg)',
          'background-size': '20px',
          'background-position': t('global.dir') === 'rtl' ? '10px' : '',
        }}
        value={locale()}
        onChange={(evt) => locale(evt.currentTarget.value)}
      >
        <option value="en">English</option>
        <option value="zh-cn">简体中文</option>
        <option value="ja">日本語</option>
        <option value="it">Italiano</option>
        <option value="fr">Français</option>
        <option value="id">Bahasa Indonesia</option>
        <option value="he">עִברִית</option>
      </select>
    </li>
  );
};

const Nav: Component<{ showLogo?: boolean; filled?: boolean }> = (props) => {
  const [unlocked, setUnlocked] = createSignal(props.showLogo);
  const data = useData<{ isDark: boolean }>();
  const [t] = useI18n();
  const [observer] = createIntersectionObserver([], ([entry]) => setUnlocked(entry.isIntersecting));
  const shouldShowLogo = () => props.showLogo || !unlocked();
  return (
    <>
      <div use:observer class="h-0" />
      <div
        class="sticky top-0 z-50 dark:bg-solid-gray bg-white"
        classList={{ 'shadow-md': shouldShowLogo() }}
      >
        <nav class="px-3 lg:px-12 container lg:flex justify-between items-center max-h-18 relative z-20 space-x-10">
          <ScrollShadow
            class="relative nav-items-container"
            direction="horizontal"
            shadowSize="25%"
            initShadowSize={true}
          >
            <ul class="relative flex items-center overflow-auto no-scrollbar">
              <Logo show={shouldShowLogo()} />
              <For each={t('global.nav')} children={MenuLink} />
              <LanguageSelector class="flex lg:hidden" />
            </ul>
          </ScrollShadow>
          <ul class="hidden lg:flex items-center">
            <Social />
            <LanguageSelector />
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Nav;
