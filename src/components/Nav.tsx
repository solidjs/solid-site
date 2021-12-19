import {
  Component,
  For,
  createMemo,
  createSignal,
  Show,
  onMount,
  on,
  createContext,
  createEffect,
  createComputed,
  useContext,
  Accessor,
  Setter,
  batch, Resource,
} from 'solid-js';
import { ResourceMetadata } from '@solid.js/docs';
import { Link, NavLink } from 'solid-app-router';
import { useI18n } from '@solid-primitives/i18n';
import { createIntersectionObserver } from '@solid-primitives/intersection-observer';
import createEventListener from '@solid-primitives/event-listener';
import createDebounce from '@solid-primitives/debounce';
import logo from '../assets/logo.svg';
import ScrollShadow from './ScrollShadow/ScrollShadow';
import Social from './Social';
import Dismiss from 'solid-dismiss';
import { reflow } from '../utils';
import { routeReadyState, page, setRouteReadyState } from '../utils/routeReadyState';
import PageLoadingBar from './LoadingBar/PageLoadingBar';
import { useData } from 'solid-app-router';

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
  tl: 'Filipino',
};

type MenuLinkProps = {
  title: string;
  description: string;
  path: string;
  external?: boolean;
  children: MenuLinkProps[];
};

export const NavContext = createContext<{
  subnav: Accessor<MenuLinkProps[]>;
  setSubnav: Setter<MenuLinkProps[]>;
  closeSubnav: () => void;
  clearSubnavClose: () => void;
  subnavPosition: Accessor<number>;
  setSubnavPosition: Setter<number>;
}>();

const MenuLink: Component<MenuLinkProps> = (props) => {
  const { setSubnav, closeSubnav, clearSubnavClose, setSubnavPosition } = useContext(NavContext)!;
  let linkEl!: HTMLAnchorElement;

  onMount(() => {
    if (props.children) {
      createEventListener(linkEl, 'mouseenter', () => {
        clearSubnavClose();
        batch(() => {
          setSubnav(props.children);
          setSubnavPosition(linkEl.getBoundingClientRect().left);
        });
      });
      createEventListener(linkEl, 'mouseleave', () => closeSubnav());
    }
    createEventListener(linkEl, 'mousedown', () => {
      setRouteReadyState((prev) => ({ ...prev, loadingBar: true }));
      page.scrollY = window.scrollY;
      reflow();
      const [, removeMouse] = createEventListener(linkEl, 'mouseleave', () => {
        setRouteReadyState((prev) => ({ ...prev, loadingBar: false }));
        removeEvents();
      });
      const [, removeClick] = createEventListener(linkEl, 'click', () => {
        setRouteReadyState((prev) => ({ ...prev, loadingBar: false }));
        removeEvents();
      });
      const removeEvents = () => {
        removeMouse(linkEl);
        removeClick(linkEl);
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
  const [subnav, setSubnav] = createSignal<MenuLinkProps[]>([]);
  const [subnavPosition, setSubnavPosition] = createSignal<number>(0);
  const [locked, setLocked] = createSignal<boolean>(props.showLogo || true);
  const [closeSubnav, clearSubnavClose] = createDebounce(() => setSubnav([]), 350);
  const [t, { locale }] = useI18n();
  const data = useData<{guides: ResourceMetadata[] | undefined}>();

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
  const navList = createMemo(
    on(
      () => [locale, t('global.nav')],
      () => {
        return (t('global.nav') || []).reduce((memo: any, item: any) => {
          let itm = { ...item };
          // Inject guides if available
          if (item.path == '/guide') {
            if (data.guides?.length) {
              itm.children = data.guides.map( ({title, description, resource}) => ({
                title,
                description,
                path: `/${resource}`
              }));
            }
          }
          // Ignore blog
          if (itm.path !== '/blog') {
            memo.push(itm);
          }
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
  createEffect(() => {
    if (subnavEl) {
      createEventListener(subnavEl, 'mouseenter', clearSubnavClose);
      createEventListener(subnavEl, 'mouseleave', close);
    }
  });

  return (
    <NavContext.Provider
      value={{
        subnav,
        setSubnav,
        closeSubnav,
        subnavPosition,
        clearSubnavClose,
        setSubnavPosition,
      }}
    >
      <div use:observer class="h-0" />
      <div
        class="sticky top-0 z-50 dark:bg-solid-gray bg-white"
        classList={{ 'shadow-md': showLogo() }}
      >
        <div class="flex justify-center w-full overflow-hidden">
          <PageLoadingBar postion="top" active={showLogo() && routeReadyState().loadingBar} />
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
                <For each={navList()} children={MenuLink} />
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
        <Show when={subnav().length !== 0}>
          <div
            use:createEventListener={['mouseenter', clearSubnavClose]}
            use:createEventListener={['mouseleave', closeSubnav]}
            ref={subnavEl}
            class="absolute left-50 bg-gray-200 shadow-xl transition duration-750"
            style={{ left: `${subnavPosition()}px` }}
          >
            <ul class="px-5 py-4">
              <For each={subnav()}>
                {(link) => (
                  <li class="hover:text-solid-medium transition duration-300">
                    <a class="px-6 py-4 w-full block" href={link.path}>
                      {link.title}
                      <Show when={link.description}>
                        <span class="block text-sm text-gray-400">{link.description}</span>
                      </Show>
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </Show>
      </div>
    </NavContext.Provider>
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
