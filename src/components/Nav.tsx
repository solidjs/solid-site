import {
  Component,
  For,
  createMemo,
  createSignal,
  Show,
  onMount,
  on,
  createComputed,
} from 'solid-js';
import { Link, NavLink } from 'solid-app-router';
import { useI18n } from '@solid-primitives/i18n';
import { createIntersectionObserver } from '@solid-primitives/intersection-observer';
import logo from '../assets/logo.svg';
import ScrollShadow from './ScrollShadow/ScrollShadow';
import Social from './Social';
import Dismiss from 'solid-dismiss';
import { reflow } from '../utils';
import { routeReadyState, setRouteReadyState } from '../utils/routeReadyState';
import PageLoadingBar from './LoadingBar/PageLoadingBar';

const langs = {
  en: 'English',
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
};

type MenuLinkProps = { path: string; external?: boolean; title: string };

const MenuLink: Component<MenuLinkProps> = (props) => {
  let linkEl!: HTMLAnchorElement;

  onMount(() => {
    if (!window.location.pathname.startsWith(props.path)) return;

    // @ts-ignore
    linkEl.scrollIntoView({ inline: 'center', behavior: 'instant' });
  });

  const onClick = () => {
    if (window.location.pathname.startsWith(props.path)) {
      window.scrollTo({ top: 0 });
      return;
    }

    const pageEl = document.body;
    pageEl.style.minHeight = document.body.scrollHeight + 'px';
    setRouteReadyState({ loading: true, routeChanged: true });
  };

  return (
    <li>
      <NavLink
        href={props.path}
        class="inline-flex items-center transition text-[15px] sm:text-base m-0 sm:m-1 px-3 sm:px-4 py-3 rounded pointer-fine:hover:text-white pointer-fine:hover:bg-solid-medium whitespace-nowrap"
        activeClass="bg-solid-medium text-white pointer-fine:group-hover:bg-solid-default"
        onClick={onClick}
        noScroll
        ref={linkEl}
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
};

const LanguageSelector: Component<{ ref: HTMLButtonElement; class?: string }> = (props) => (
  <li class={props.class || ''}>
    <button
      aria-label="Select Language"
      ref={props.ref}
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
  const [locked, setLocked] = createSignal<boolean>(props.showLogo || true);
  const [t, { locale }] = useI18n();
  let firstLoad = true;
  let langBtnTablet!: HTMLButtonElement;
  let langBtnDesktop!: HTMLButtonElement;
  let logoEl!: HTMLDivElement;

  const logoPosition = () =>
    t('global.dir', {}, 'ltr') === 'rtl' ? 'right-3 lg:right-12 pl-5' : 'left-3 lg:left-12 pr-5';

  const navListPosition = () => {
    const isRTL = t('global.dir', {}, 'ltr') === 'rtl';
    if (isRTL) {
      return showLogo() && 'mr-[56px]';
    }
    return showLogo() && 'ml-[56px]';
  };

  const [observer] = createIntersectionObserver([], ([entry]) => {
    if (firstLoad) {
      firstLoad = false;
      return;
    }
    setLocked(entry.isIntersecting);
  });
  const showLogo = createMemo(() => props.showLogo || !locked());

  createComputed(
    on(
      showLogo,
      (showLogo) => {
        const isRTL = t('global.dir', {}, 'ltr') === 'rtl';
        showLogo && onEnterLogo(logoEl, isRTL);
        !showLogo && onExitLogo(logoEl, isRTL);
      },
      { defer: true },
    ),
  );

  const onClickLogo = () => {
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0 });
      return;
    }

    setRouteReadyState({ loading: true, routeChanged: true });
  };

  return (
    <>
      <div use:observer class="h-0" />
      <div
        class="sticky top-0 z-50 dark:bg-solid-gray bg-white"
        classList={{ 'shadow-md': showLogo() }}
      >
        <div class="flex justify-center w-full overflow-hidden">
          <PageLoadingBar
            postion="top"
            active={showLogo() && routeReadyState().loading}
          ></PageLoadingBar>
          <nav class="relative px-3 lg:px-12 container lg:flex justify-between items-center max-h-18 z-20">
            <div
              class={`absolute flex top-0 bottom-0 ${logoPosition()} nav-logo-bg dark:bg-solid-gray ${
                showLogo() ? 'scale-100' : 'scale-0'
              }`}
              ref={logoEl}
            >
              <Link href="/" onClick={onClickLogo} noScroll class={`py-3 flex w-9 `}>
                <span class="sr-only">Navigate to the home page</span>
                <img class="w-full h-auto" src={logo} alt="Solid logo" />
              </Link>
            </div>
            <ScrollShadow
              class={`group relative nav-items-container ${navListPosition()}`}
              direction="horizontal"
              rtl={t('global.dir', {}, 'ltr') === 'rtl'}
              shadowSize="25%"
              initShadowSize={true}
            >
              <ul class="relative flex items-center overflow-auto no-scrollbar">
                <For each={t('global.nav')} children={MenuLink} />
                <LanguageSelector ref={langBtnTablet} class="flex lg:hidden" />
              </ul>
            </ScrollShadow>
            <ul class="hidden lg:flex items-center">
              <Social />
              <LanguageSelector ref={langBtnDesktop} />
            </ul>
          </nav>
        </div>
        <Dismiss
          menuButton={[langBtnTablet, langBtnDesktop]}
          open={showLangs}
          setOpen={toggleLangs}
          class="container mx-auto left-0 right-0 bottom-0 absolute flex -mt-4 justify-end"
          animation={{
            appendToElement: 'menuPopup',
            enterClass: 'opacity-0 -translate-y-4',
            enterToClass: 'opacity-1 translate-y-0',
            exitClass: 'opacity-1 translate-y-0',
            exitToClass: 'opacity-0 -translate-y-4',
          }}
        >
          <div class="absolute mt-2 ltr:mr-5 rtl:ml-12 border rounded-md w-40 transition-composite bg-white shadow-md">
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
        </Dismiss>
      </div>
    </>
  );
};

const logoTransition = 500;
const onEnterLogo = (el: Element, isRTL: boolean) => {
  const logoEl = el as HTMLElement;
  const navList = el.nextElementSibling as HTMLElement;
  const logoWidth = '56px';
  const elements = [logoEl, navList];

  logoEl.style.transform = `scale(0)`;
  logoEl.style.transformOrigin = `${isRTL ? 'right' : 'left'} center`;
  navList.style.transform = `translateX(${isRTL ? '' : '-'}${logoWidth})`;

  reflow();
  logoEl.style.transform = `scale(1)`;
  navList.style.transform = `translateX(0)`;
  elements.forEach((el) => {
    el.style.transition = `transform ${logoTransition}ms`;
  });

  logoEl.addEventListener(
    'transitionend',
    (e) => {
      if (e.target !== e.currentTarget) return;

      elements.forEach((el) => {
        el.style.transition = '';
        el.style.transform = '';
        el.style.transformOrigin = '';
      });
    },
    { once: true },
  );
};

const onExitLogo = (el: Element, isRTL: boolean) => {
  const logoEl = el as HTMLElement;
  const navList = el.nextElementSibling as HTMLElement;
  const logoWidth = '56px';
  const elements = [logoEl, navList];

  logoEl.style.transform = `scale(1)`;
  navList.style.transform = `translateX(${isRTL ? '-' : ''}${logoWidth})`;
  if (isRTL) {
    navList.style.marginRight = '0';
  } else {
    navList.style.marginLeft = '0';
  }

  reflow();
  logoEl.style.transform = `scale(0)`;
  logoEl.style.transformOrigin = `${isRTL ? 'right' : 'left'} center`;
  navList.style.transform = `translateX(0)`;

  elements.forEach((el) => {
    el.style.transition = `transform ${logoTransition}ms`;
    el.style.backfaceVisibility = 'hidden';
  });

  logoEl.addEventListener(
    'transitionend',
    (e) => {
      if (e.target !== e.currentTarget) return;

      navList.style.marginLeft = '';
      navList.style.marginRight = '';

      elements.forEach((el) => {
        el.style.transition = '';
        el.style.transform = '';
        el.style.backfaceVisibility = '';
        el.style.transformOrigin = '';
      });
    },
    { once: true },
  );
};

export default Nav;
