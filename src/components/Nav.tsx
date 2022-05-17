import {
  ParentComponent,
  For,
  createMemo,
  createSignal,
  Show,
  onMount,
  on,
  createComputed,
  batch,
} from 'solid-js';
import { Link, NavLink } from 'solid-app-router';
import { useI18n } from '@solid-primitives/i18n';
import { createIntersectionObserver } from '@solid-primitives/intersection-observer';
import { createEventListener } from '@solid-primitives/event-listener';
import { moon, sun } from 'solid-heroicons/outline';
import { Icon } from 'solid-heroicons';
import createDebounce from '@solid-primitives/debounce';
import Dismiss from 'solid-dismiss';
import logo from '../assets/logo.svg';
import ukraine from '../assets/for-ukraine.png';
import ScrollShadow from './ScrollShadow/ScrollShadow';
import Social from './Social';
import { useAppContext } from '../AppContext';
import { reflow } from '../utils';
import { routeReadyState, page, setRouteReadyState } from '../utils/routeReadyState';
import PageLoadingBar from './LoadingBar/PageLoadingBar';

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
  uk: 'Українська',
};

type MenuLinkProps = {
  title: string;
  description: string;
  path: string;
  external?: boolean;
  setSubnav: (children: MenuLinkProps[]) => void;
  setSubnavPosition: (position: number) => void;
  closeSubnav: () => void;
  clearSubnavClose: () => void;
  links: MenuLinkProps[];
  direction: 'ltr' | 'rtl';
};

const MenuLink: ParentComponent<MenuLinkProps> = (props) => {
  let linkEl!: HTMLAnchorElement;

  // Only rerender event listener when children change
  if (props.links) {
    onMount(() => {
      createEventListener(linkEl, 'mouseenter', () => {
        props.clearSubnavClose();
        batch(() => {
          props.setSubnav(props.links as MenuLinkProps[]);
          props.setSubnavPosition(linkEl.getBoundingClientRect().left);
        });
      });
      createEventListener(linkEl, 'mouseleave', () => props.closeSubnav());
    });
  }
  onMount(() => {
    createEventListener(linkEl, 'mousedown', () => {
      setRouteReadyState((prev) => ({ ...prev, loadingBar: true }));
      page.scrollY = window.scrollY;
      reflow();
      const clearLeave = createEventListener(linkEl, 'mouseleave', () => {
        setRouteReadyState((prev) => ({ ...prev, loadingBar: false }));
        removeEvents();
      });
      const clearClick = createEventListener(linkEl, 'click', () => {
        setRouteReadyState((prev) => ({ ...prev, loadingBar: false }));
        removeEvents();
      });
      const removeEvents = () => {
        clearLeave();
        clearClick();
      };
    });
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
    reflow();
    setRouteReadyState((prev) => ({
      ...prev,
      loadingBar: true,
      loading: true,
      routeChanged: true,
    }));
  };

  return (
    <li>
      <NavLink
        href={props.path}
        target={props.external ? '_blank' : undefined}
        class="inline-flex items-center transition text-[15px] dark:hover:bg-solid-darkLighterBg sm:text-base m-0 sm:m-1 px-3 sm:px-4 py-3 rounded pointer-fine:hover:text-white pointer-fine:hover:bg-solid-medium whitespace-nowrap"
        activeClass="bg-solid-medium dark:bg-solid-light text-white"
        onClick={() => !props.external && onClick()}
        noScroll
        ref={linkEl}
      >
        <span>{props.title}</span>
        <Show when={props.external}>
          <svg
            class="h-5 z-50 -mt-1 ltr:ml-1 rtl:mr-1 opacity-30"
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

const LanguageSelector: ParentComponent<{ ref: HTMLButtonElement }> = (props) => (
  <button
    aria-label="Select Language"
    ref={props.ref}
    class="dark:brightness-150 focus:color-red-500 bg-no-repeat bg-center bg-translate bg-24 hover:border-gray-500 cursor-pointer dark:border-gray-600 dark:hover:border-gray-500 px-6 pl-4 ml-2 rounded-md h-10 border border-solid-100 pt-4 text-sm my-3 w-full"
  />
);

const Nav: ParentComponent<{ showLogo?: boolean; filled?: boolean }> = (props) => {
  const [showLangs, toggleLangs] = createSignal(false);
  const [subnav, setSubnav] = createSignal<MenuLinkProps[]>([]);
  const [subnavPosition, setSubnavPosition] = createSignal<number>(0);
  const [locked, setLocked] = createSignal<boolean>(props.showLogo || true);
  const closeSubnav = createDebounce(() => setSubnav([]), 150);
  const [t, { locale }] = useI18n();
  const context = useAppContext();

  let firstLoad = true;
  let langBtnTablet!: HTMLButtonElement;
  let langBtnDesktop!: HTMLButtonElement;
  let logoEl!: HTMLDivElement;
  let subnavEl!: HTMLDivElement;

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
  observer;

  const showLogo = createMemo(() => props.showLogo || !locked());
  const navList = createMemo<MenuLinkProps[]>(
    on(
      () => [locale, t('global.nav'), context.guides],
      () => {
        return (t('global.nav') || []).reduce((memo: any, item: any) => {
          let itm = { ...item };
          // Inject guides if available
          if (item.path == '/guides') {
            if (context.guides?.length) {
              const direction = context.guidesSupported ? t('global.dir', {}, 'ltr') : 'ltr';
              itm.links = context.guides.map(({ title, description, resource }) => ({
                title,
                description,
                direction,
                path: `/${resource}`,
              }));
              itm.direction = direction;
            }
          }
          memo.push(itm);
          return memo;
        }, []);
      },
    ),
  );

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
    page.scrollY = window.scrollY;
    setRouteReadyState((prev) => ({
      ...prev,
      loading: true,
      routeChanged: true,
      showPageLoadingBar: true,
    }));
  };
  const Toggle = () => (
    <button
      type="button"
      onClick={() => (context.isDark = !context.isDark)}
      class="text-solid-medium dark:brightness-150 focus:color-red-500 bg-no-repeat bg-center hover:border-gray-500 cursor-pointer dark:border-gray-600 dark:hover:border-gray-500 px-3 ml-2 rounded-md h-10 border border-solid-100"
      classList={{
        'hover:bg-gray-300 dark:hover:text-black focus:outline-none focus:highlight-none active:highlight-none focus:ring-0 active:outline-none':
          context.isDark,
      }}
      title="Toggle dark mode"
    >
      <Show when={context.isDark} fallback={<Icon path={moon} class="h-6" />}>
        <Icon path={sun} class="h-6" />
      </Show>
      <span class="text-xs sr-only">{context.isDark ? 'Light' : 'Dark'} mode</span>
    </button>
  );

  return (
    <>
      <div use:observer class="h-0" />
      <div
        class="sticky top-0 z-50 bg-white dark:bg-solid-darkbg"
        classList={{ 'shadow-md dark:bg-solid-medium': showLogo() }}
      >
        <div class="flex justify-center w-full overflow-hidden">
          <PageLoadingBar postion="top" active={showLogo() && routeReadyState().loadingBar} />
          <nav class="relative px-3 lg:px-12 container lg:flex justify-between items-center max-h-18 z-20">
            <div
              class={`absolute flex top-0 bottom-0 ${logoPosition()} nav-logo-bg ${
                showLogo() ? 'scale-100' : 'scale-0'
              }`}
              ref={logoEl}
            >
              <Link href="/" onClick={onClickLogo} noScroll class={`py-3 flex w-9 `}>
                <span class="sr-only">Navigate to the home page</span>
                <img class="w-full h-auto z-10" src={logo} alt="Solid logo" />
                <img
                  class={`w-8 h-5 absolute ${
                    t('global.dir', {}, 'ltr') === 'rtl' ? 'mr-5 -scale-x-100 mt-2' : 'ml-5 mt-3'
                  }`}
                  src={ukraine}
                  alt="Solid logo"
                />
              </Link>
            </div>
            <ScrollShadow
              class={`group relative nav-items-container ${navListPosition()}`}
              direction="horizontal"
              rtl={t('global.dir', {}, 'ltr') === 'rtl'}
              shadowSize="25%"
              initShadowSize={true}
              locked={showLogo()}
            >
              <ul class="flex items-center">
                <For each={navList()}>
                  {(item) => (
                    <MenuLink
                      {...item}
                      setSubnav={setSubnav}
                      closeSubnav={closeSubnav}
                      clearSubnavClose={closeSubnav.clear}
                      setSubnavPosition={setSubnavPosition}
                      links={item.links}
                    />
                  )}
                </For>
                <li>
                  <span class="flex lg:hidden">
                    <Toggle />
                  </span>
                </li>
                <li class="flex lg:hidden">
                  <LanguageSelector ref={langBtnTablet} />
                </li>
              </ul>
            </ScrollShadow>
            <ul class="hidden lg:flex items-center">
              <Social />
              <Toggle />
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
            enterClass: 'opacity-0 -translate-y-5',
            enterToClass: 'opacity-1 translate-y-0',
            exitClass: 'opacity-1 translate-y-0',
            exitToClass: 'opacity-0 -translate-y-4',
          }}
        >
          <div class="absolute w-full md:w-96 mt-2 md:ml-12 md:mr-5 border dark:border-solid-darkbg rounded-md transition-composite bg-white dark:bg-solid-darkLighterBg shadow-md">
            <For each={Object.entries(langs)}>
              {([lang, label]) => (
                <button
                  class="first:rounded-t hover:bg-solid-light hover:text-white last:rounded-b border-r p-3 text-sm border-b text-center dark:border-solid-darkbg/70 w-3/6"
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
        <Show when={subnav().length !== 0}>
          <div
            ref={subnavEl}
            onmouseenter={closeSubnav.clear}
            onmouseleave={closeSubnav}
            class="absolute left-50 bg-gray-200 dark:bg-solid-darkLighterBg shadow-2xl max-w-sm transition duration-750"
            style={{ left: `${screen.width > 768 ? subnavPosition() : 0}px` }}
          >
            <ul class="divide-x divide-transparent flex flex-col">
              <For each={subnav()}>
                {(link) => (
                  <li
                    class="px-5 hover:bg-solid-default hover:text-white transition duration-300"
                    style={
                      link.direction && {
                        direction: link.direction,
                        'text-align': link.direction === 'ltr' ? 'left' : 'right',
                      }
                    }
                  >
                    <NavLink
                      onClick={() => setSubnav([])}
                      class="px-6 py-5 w-full block"
                      href={link.path}
                    >
                      {link.title}
                      <Show when={link.description}>
                        <span class="block text-sm text-gray-400">{link.description}</span>
                      </Show>
                    </NavLink>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </Show>
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
  createEventListener(
    logoEl,
    'transitioned',
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

  createEventListener(
    logoEl,
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
