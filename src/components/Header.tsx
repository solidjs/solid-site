import {
  Component,
  Switch,
  Match,
  Show,
  on,
  createEffect,
  createSignal,
  batch,
  createComputed,
  onMount,
} from 'solid-js';
import { Transition } from 'solid-transition-group';
import { useI18n } from '@solid-primitives/i18n';
import { useLocation } from 'solid-app-router';
import Nav from './Nav';
import logo from '../assets/logo.svg';
import wordmark from '../assets/wordmark.svg';
import { reflow } from '../utils';
import PageLoadingBar from './LoadingBar/PageLoadingBar';
import { routeReadyState } from '../routeReadyState';

const Header: Component<{ title?: string }> = () => {
  const [t] = useI18n();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const noSmallHeader = !isHome && !location.pathname.includes('tutorial');
  const [showLogo, setShowLogo] = createSignal(!isHome);
  const [showHeaderSmall, setShowHeaderSmall] = createSignal(noSmallHeader);
  const [showHeaderSplash, setShowHeaderSplash] = createSignal(isHome);
  let headerSplashEl!: HTMLElement;

  createEffect(
    on(
      routeReadyState,
      (readyState) => {
        if (readyState.loading) return;
        const result = location.pathname !== '/';
        const noHeaderSmall = result && !location.pathname.includes('tutorial');

        setShowHeaderSmall(noHeaderSmall);
        setShowLogo(result);
        setShowHeaderSplash(!result);
      },
      { defer: true },
    ),
  );
  const Title: Component = (props) => (
    <span class="inline-block transition-all duration-200">{props.children}</span>
  );
  return (
    <>
      <Transition onEnter={onEnterBigHeader} onExit={onExitBigHeader}>
        <Show when={showHeaderSplash()}>
          <header
            class="relative mx-1 rounded-br-3xl rounded-bl-3xl bg-gradient-to-r from-solid-light via-solid-medium to-solid-default text-white overflow-hidden"
            ref={headerSplashEl}
          >
            <Show when={routeReadyState().loading}>
              <PageLoadingBar postion="bottom" width={headerSplashEl.clientWidth}></PageLoadingBar>
            </Show>
            <div class="md:bg-hero dark:from-bg-gray-700 bg-no-repeat bg-right rtl:bg-left px-10">
              <section class="px-3 lg:px-12 container space-y-10 lg:pb-20 lg:pt-52 py-10">
                <div class="flex items-center w-[calc(100%+40px)] space-y-4 lg:space-y-0 lg:space-x-4">
                  <img class="w-28 h-30 lg:w-48" src={logo} alt="Solid logo" />
                  <img class="w-52 min-w-0 h-15 lg:w-80" src={wordmark} alt="Solid wordmark" />
                </div>
                <h2 class="lg:font-semibold text-3xl lg:text-4xl leading-snug xl:max-w-4xl">
                  {t('home.hero')}
                </h2>
              </section>
            </div>
          </header>
        </Show>
      </Transition>
      <Nav showLogo={showLogo()} />
      <div>
        <Transition onEnter={onEnterSmallHeader} onExit={onExitSmallHeader}>
          <Show when={showHeaderSmall()}>
            <header class="overflow-hidden">
              <div class="bg-gradient-to-r from-solid-light via-solid-medium to-solid-default text-white text-center md:text-left rtl:text-right">
                <div class="px-3 lg:px-12 container">
                  <h1 class="py-8 text-3xl">
                    <Transition
                      enterClass="translate-x-5 opacity-0"
                      enterToClass="translate-x-0 opacity-100"
                      exitClass="translate-x-0 opacity-100"
                      exitToClass="translate-x-5 opacity-0"
                      mode="inout"
                    >
                      <Switch>
                        <Match when={location.pathname.includes('/blog')}>
                          <Title>{t('global.blog.title', {}, 'Blog')}</Title>
                        </Match>
                        <Match when={location.pathname.includes('/guide')}>
                          <Title>{t('guides.title', {}, 'Guides')}</Title>
                        </Match>
                        <Match when={location.pathname.includes('/docs')}>
                          <Title>{t('docs.title', {}, 'Guides')}</Title>
                        </Match>
                        <Match when={location.pathname.includes('/resources')}>
                          <Title>{t('resources.title', {}, 'Guides')}</Title>
                        </Match>
                        <Match when={location.pathname.includes('/examples')}>
                          <Title>{t('examples.title', {}, 'Guides')}</Title>
                        </Match>
                        <Match when={location.pathname.includes('/media')}>
                          <Title>{t('media.title', {}, 'Guides')}</Title>
                        </Match>
                        <Match when={location.pathname.includes('/contributors')}>
                          <Title>{t('contributors.title', {}, 'Team & Contributions')}</Title>
                        </Match>
                      </Switch>
                    </Transition>
                  </h1>
                </div>
              </div>
            </header>
          </Show>
        </Transition>
      </div>
    </>
  );
};

const pageTransitionDuration = 500;

const onEnterBigHeader = (el: Element, done: () => void) => {
  const headerEl = el as HTMLElement;
  const parentEl = headerEl.parentElement!;
  const mainChildren = [...parentEl.children].filter((_, idx) => idx) as HTMLElement[];
  const headerHeight = headerEl.clientHeight + 'px';
  const bannerEl = headerEl.firstElementChild as HTMLElement;
  const elements = [headerEl, bannerEl, ...mainChildren];

  // @ts-ignore
  window.scrollTo({ top: 0, behavior: 'instant' });
  elements.forEach((el) => {
    el.style.transform = `translateY(-${headerHeight})`;
  });

  bannerEl.style.transform = `translateY(${headerHeight})`;

  reflow();

  elements.forEach((el) => {
    el.style.transform = '';
    el.style.transition = `transform ${pageTransitionDuration}ms`;
  });

  headerEl.addEventListener(
    'transitionend',
    (e) => {
      if (e.target !== e.currentTarget) return;

      elements.forEach((el) => {
        el.style.transition = '';
        el.style.transform = '';
      });

      done();
    },
    { once: true },
  );
};

const onExitBigHeader = (el: Element, done: () => void) => {
  const headerEl = el as HTMLElement;
  const parentEl = headerEl.parentElement!;
  const mainChildren = [...parentEl.children].filter((_, idx) => idx) as HTMLElement[];
  const bannerEl = headerEl.firstElementChild as HTMLElement;
  const scrollY = window.scrollY;
  const headerHeight = headerEl.clientHeight;
  const elements = [headerEl, bannerEl, ...mainChildren];

  if (scrollY >= headerHeight) {
    headerEl.style.height = '0px';
    // @ts-ignore
    window.scrollTo({ top: 0, behavior: 'instant' });
    return done();
  }

  elements.forEach((el) => {
    el.style.transform = `translateY(-${headerHeight}px)`;
    el.style.transition = `transform ${pageTransitionDuration}ms`;
  });
  bannerEl.style.transform = `translateY(${headerHeight}px)`;

  headerEl.addEventListener(
    'transitionend',
    (e) => {
      if (e.target !== e.currentTarget) return;

      elements.forEach((el) => {
        el.style.transition = '';
        el.style.transform = '';
      });

      done();
    },
    { once: true },
  );
};

const onEnterSmallHeader = (el: Element, done: () => void) => {
  const headerEl = el as HTMLElement;
  const bgContainerEl = el.firstElementChild as HTMLElement;

  const contentEl = bgContainerEl.firstElementChild as HTMLElement;
  const mainContentChild = document.getElementById('main-content')
    ?.firstElementChild as HTMLElement;
  const headerHeight = bgContainerEl.clientHeight + 'px';
  const elements = [bgContainerEl, headerEl, contentEl, mainContentChild];

  bgContainerEl.style.transform = `translateY(-100%)`;
  contentEl.style.transform = `translateY(100%)`;
  mainContentChild.style.transform = `translateY(-${headerHeight})`;

  reflow();
  elements.forEach((el) => {
    el.style.transform = 'translateY(0)';
    el.style.transition = `transform ${pageTransitionDuration}ms`;
  });

  bgContainerEl.addEventListener(
    'transitionend',
    (e) => {
      if (e.target !== e.currentTarget) return;

      elements.forEach((el) => {
        el.style.transition = '';
        el.style.transform = '';
      });

      done();
    },
    { once: true },
  );
};

const onExitSmallHeader = (el: Element, done: () => void) => {
  const headerEl = el as HTMLElement;
  const bgContainerEl = headerEl.firstElementChild as HTMLElement;
  const contentEl = bgContainerEl.firstElementChild as HTMLElement;
  const mainContentChild = document.getElementById('main-content')
    ?.firstElementChild as HTMLElement;
  const scrollY = window.scrollY;
  const headerHeight = headerEl.clientHeight;
  const navHeight = 64;
  const elements = [bgContainerEl, contentEl, mainContentChild];

  if (scrollY >= headerHeight + navHeight) {
    headerEl.style.height = '0px';
    // @ts-ignore
    window.scrollTo({ top: 0, behavior: 'instant' });
    return done();
  }

  bgContainerEl.style.transform = `translateY(-100%)`;
  contentEl.style.transform = `translateY(100%)`;
  mainContentChild.style.transform = `translateY(-${headerHeight}px)`;
  elements.forEach((el) => {
    el.style.transition = `transform ${pageTransitionDuration}ms`;
  });

  bgContainerEl.addEventListener(
    'transitionend',
    (e) => {
      if (e.target !== e.currentTarget) return;

      elements.forEach((el) => {
        el.style.transition = '';
        el.style.transform = '';
      });

      done();
    },
    { once: true },
  );
};
export default Header;
