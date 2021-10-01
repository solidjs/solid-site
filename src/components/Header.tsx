import { Component, Switch, Match, Show, on, createEffect, createSignal } from 'solid-js';
import { Transition } from 'solid-transition-group';
import { useI18n } from '@solid-primitives/i18n';
import { useLocation } from 'solid-app-router';
import Nav from './Nav';
import logo from '../assets/logo.svg';
import wordmark from '../assets/wordmark.svg';

const Header: Component<{ title?: string }> = (props) => {
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
  return (
    <>
      <Transition enterToClass="opacity-100 max-h-full" exitToClass="max-h-0 opacity-0">
        <Show when={!collapsed()}>
          <header class="mx-2 rounded-br-3xl rounded-bl-3xl bg-gradient-to-r from-solid-light via-solid-medium to-solid-default text-white transition duration-5000 overflow-hidden">
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
      <Transition enterClass="opacity-100 max-h-52" exitToClass="max-h-0 opacity-0">
        <Show when={collapsed() && !location.pathname.includes('tutorial')}>
          <header class="bg-gradient-to-r from-solid-light via-solid-medium to-solid-default text-white text-center md:text-left rtl:text-right transition duration-5000 overflow-hidden">
            <div class="px-3 lg:px-12 container">
              <h1 class="py-8 text-3xl">
                <Switch>
                  <Match when={location.pathname.includes('/blog')}>
                    {t('global.blog.title', {}, 'Blog')}
                  </Match>
                  <Match when={location.pathname.includes('/guide')}>
                    {t('docs.title', {}, 'Guides')}
                  </Match>
                  <Match when={location.pathname.includes('/docs')}>
                    {t('docs.title', {}, 'Guides')}
                  </Match>
                  <Match when={location.pathname.includes('/resources')}>
                    {t('resources.title', {}, 'Guides')}
                  </Match>
                  <Match when={location.pathname.includes('/examples')}>
                    {t('examples.title', {}, 'Guides')}
                  </Match>
                  <Match when={location.pathname.includes('/media')}>
                    {t('media.title', {}, 'Guides')}
                  </Match>
                  <Match when={location.pathname.includes('/contributors')}>
                    {t('contributors.title', {}, 'Team & Contributions')}
                  </Match>
                </Switch>
              </h1>
            </div>
          </header>
        </Show>
      </Transition>
    </>
  );
};

export default Header;
