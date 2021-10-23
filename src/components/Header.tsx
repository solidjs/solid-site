import { Component, Switch, Match, Show, on, createEffect, createSignal } from 'solid-js';
import { Transition } from 'solid-transition-group';
import { useI18n } from '@solid-primitives/i18n';
import { useLocation } from 'solid-app-router';
import Nav from './Nav';
import logo from '../assets/logo.svg';
import wordmark from '../assets/wordmark.svg';

const Header: Component<{ title?: string }> = () => {
  const [t] = useI18n();
  const [collapsed, setCollapsed] = createSignal(false);
  const location = useLocation();
  createEffect(
    on(
      () => location.pathname,
      () => {
        const result = location.pathname !== '/';
        if (collapsed() != result) {
          setCollapsed(result);
        }
      },
    ),
  );
  const Title: Component = (props) => (
    <span class="transition-all duration-200">{props.children}</span>
  );
  return (
    <>
      <Transition
        enterClass="max-h-0 opacity-0"
        enterToClass="max-h-30 opacity-100"
        exitClass="max-h-0"
        exitToClass="max-h-0 opacity-0"
      >
        <Show when={collapsed() === false}>
          <header class="mx-2 rounded-br-3xl rounded-bl-3xl bg-gradient-to-r from-solid-light via-solid-medium to-solid-default text-white transition duration-500 overflow-hidden">
            <div class="md:bg-hero dark:from-bg-gray-700 bg-no-repeat bg-right rtl:bg-left px-10">
              <section class="px-3 lg:px-12 container space-y-10 lg:pb-20 lg:pt-52 py-10">
                <div class="flex items-center space-y-4 lg:space-y-0 lg:space-x-4">
                  <img class="w-28 h-30 lg:w-48" src={logo} alt="Solid logo" />
                  <img class="w-52 h-15 lg:w-80" src={wordmark} alt="Solid wordmark" />
                </div>
                <h2 class="lg:font-semibold text-3xl text-left lg:text-4xl leading-snug xl:max-w-4xl">
                  {t('home.hero')}
                </h2>
              </section>
            </div>
          </header>
        </Show>
      </Transition>
      <Nav showLogo={collapsed()} />
      <Transition
        enterClass="opacity-0 max-h-0"
        enterToClass="max-h-52"
        exitClass="max-h-0"
        exitToClass="opacity-0 max-h-0"
      >
        <Show when={collapsed() === true && !location.pathname.includes('tutorial')}>
          <header class="bg-gradient-to-r from-solid-light via-solid-medium to-solid-default text-white text-center md:text-left rtl:text-right transition duration-400 overflow-hidden">
            <div class="px-3 lg:px-12 container">
              <h1 class="py-8 text-3xl">
                <Transition
                  enterClass="ml-5 opacity-0"
                  enterToClass="ml-0 opacity-100"
                  exitClass="ml-0 opacity-100"
                  exitToClass="ml-5 opacity-0"
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
          </header>
        </Show>
      </Transition>
    </>
  );
};

export default Header;
