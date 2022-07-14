import { ParentComponent, For, createMemo, createSignal, Show, on, createComputed } from 'solid-js';
import { Link, NavLink } from '@solidjs/router';
import { useI18n } from '@solid-primitives/i18n';
import { makeIntersectionObserver } from '@solid-primitives/intersection-observer';
import { debounce } from '@solid-primitives/scheduled';
import Dismiss from 'solid-dismiss';
import logo from '~/assets/logo.svg';
import ukraine from '~/assets/for-ukraine.png';
import ScrollShadow from '../ScrollShadow/ScrollShadow';
import Social from '../Social';
import { useAppContext } from '../AppContext';
import { onEnterLogo, onExitLogo } from '~/utils';
import { routeReadyState, page, setRouteReadyState } from '~/utils/routeReadyState';
import PageLoadingBar from '../LoadingBar/PageLoadingBar';
import { LinkTypes, MenuLink } from './MenuLink';
import { LanguageSelector } from './LanguageSelector';
import { ModeToggle } from './ModeToggle';

const langs = {
  en: 'English',
  'ko-kr': '한국어',
  'zh-cn': '简体中文',
  'zh-tw': '繁體中文',
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

const Nav: ParentComponent<{ showLogo?: boolean; filled?: boolean }> = (props) => {
  const [showLangs, toggleLangs] = createSignal(false);
  const [subnav, setSubnav] = createSignal<LinkTypes[]>([]);
  const [subnavPosition, setSubnavPosition] = createSignal<number>(0);
  const [locked, setLocked] = createSignal<boolean>(props.showLogo || true);
  const closeSubnav = debounce(() => setSubnav([]), 150);
  const [t, { locale }] = useI18n();
  const context = useAppContext();

  let firstLoad = true;
  let langBtnTablet!: HTMLButtonElement;
  let langBtnDesktop!: HTMLButtonElement;
  let logoEl!: HTMLDivElement;
  let subnavEl!: HTMLDivElement;

  const isRTL = () => t('global.dir', {}, 'ltr') === 'rtl';
  const logoPosition = () => (isRTL() ? 'right-3 lg:right-12 pl-5' : 'left-3 lg:left-12 pr-5');

  const { add: intersectionObserver } = makeIntersectionObserver([], ([entry]) => {
    if (firstLoad) {
      firstLoad = false;
      return;
    }
    setLocked(entry.isIntersecting);
  });
  intersectionObserver;

  const showLogo = createMemo(() => props.showLogo || !locked());
  const navList = createMemo<LinkTypes[]>(
    on(
      () => [(t('global.nav') as LinkTypes[]) || [], context.guides] as const,
      ([nav, guides]) => {
        return nav.map<LinkTypes>((item) => {
          const itm = { ...item };
          // Inject guides if available
          if (item.path == '/guides') {
            if (guides?.length) {
              const direction = t('global.dir', {}, 'ltr');
              itm.links = guides.map(({ title, description, resource }) => ({
                title,
                description,
                direction,
                path: `/guides/${resource}`,
              }));
              itm.direction = direction;
            }
          }
          return itm;
        }, []);
      },
    ),
  );

  createComputed(
    on(
      showLogo,
      (showLogo) => (showLogo ? onEnterLogo(logoEl, isRTL()) : onExitLogo(logoEl, isRTL())),
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

  return (
    <>
      <div use:intersectionObserver class="h-0" />
      <div
        class="sticky top-0 z-50 bg-white dark:bg-solid-darkbg"
        classList={{ 'shadow-md dark:bg-solid-medium': showLogo() }}
      >
        <div class="flex justify-center w-full overflow-hidden">
          <PageLoadingBar postion="top" active={showLogo() && routeReadyState().loadingBar} />
          <nav class="relative px-3 lg:px-12 container lg:flex justify-between items-center max-h-18 z-20">
            <div
              class={`absolute flex top-0 bottom-0 ${logoPosition()} nav-logo-bg transition-transform duration-500 ${
                showLogo() ? 'scale-100' : 'scale-0'
              }`}
              ref={logoEl}
            >
              <Link
                href="/"
                onClick={onClickLogo}
                noScroll
                class={`py-3 flex w-9`}
                aria-describedby="ukraine-support"
              >
                <img class="w-full h-auto z-10" src={logo} alt="SolidJS" />
                <img
                  class={`w-8 h-5 absolute ${isRTL() ? 'mr-5 -scale-x-100 mt-2' : 'ml-5 mt-3'}`}
                  src={ukraine}
                  alt=""
                />
              </Link>
              <span id="ukraine-support" hidden>
                {t('home.ukraine.support', {}, 'We stand with Ukraine.')}
              </span>
            </div>
            <ScrollShadow
              class="group relative nav-items-container transition-all duration-500"
              classList={{ [isRTL() ? 'mr-[56px]' : 'ml-[56px]']: showLogo() }}
              direction="horizontal"
              rtl={isRTL()}
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
                    <ModeToggle />
                  </span>
                </li>
                <li class="flex lg:hidden">
                  <LanguageSelector ref={langBtnTablet} />
                </li>
              </ul>
            </ScrollShadow>
            <ul class="hidden lg:flex items-center">
              <Social />
              <ModeToggle />
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

export default Nav;
