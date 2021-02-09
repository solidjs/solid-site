import { Link } from 'solid-app-router';
import { Component, For, onCleanup, onMount, createSignal, Show } from 'solid-js';

import logo from '../assets/logo.svg';
import { DiscordIcon } from '../icons/DiscordIcon';
import { RedditIcon } from '../icons/RedditIcon';
import { GithubIcon } from '../icons/GithubIcon';

const links = [
  { title: 'Get Started', path: '/docs/latest/getstarted#get-started' },
  { title: 'Docs', path: '/docs/latest/api#core-api' },
  { title: 'Resources', path: '/resources' },
  { title: 'Tutorial', path: '/tutorial' },
  { title: 'Examples', path: '/examples' },
  { title: 'Playground', path: 'https://playground.solidjs.com', external: true },
  // We might want to hide this and redirect to the /media page when someone tries to right
  // click on the logo, like https://nuxtjs.org/. Additionnaly we could add it to the footer
  { title: 'Media', path: '/media' },
];

const Nav: Component<{ showLogo?: boolean }> = (props) => {
  const [unlocked, setUnlocked] = createSignal(props.showLogo);
  let intersectorRef!: HTMLDivElement;

  onMount(() => {
    const observer = new IntersectionObserver(([entry]) => setUnlocked(entry.isIntersecting));
    observer.observe(intersectorRef);

    onCleanup(() => observer && observer.disconnect());
  });

  return (
    <>
      <div ref={intersectorRef} class="h-0" />

      <div
        class="sticky top-0 z-50 nav"
        classList={{
          'nav--locked text-white': !unlocked(),
          'nav--unlocked': unlocked(),
          'border-b': !props.showLogo,
        }}
      >
        <nav class="container grid grid-cols-10 relative z-20">
          <ul class="flex items-center col-span-7">
            <li
              class={`py-3 transition-all overflow-hidden ${
                props.showLogo || !unlocked() ? 'w-10 mr-4' : 'w-0'
              }`}
            >
              <Link href="/">
                <span class="sr-only">Navigate to the home page</span>
                <img class="w-14" src={logo} alt="Solid logo" />
              </Link>
            </li>
            <For each={links}>
              {(item) => (
                <li>
                  <Link
                    class="inline-flex items-center space-x-2 transition px-4 py-7 hover:text-white hover:bg-solid-medium whitespace-nowrap"
                    external={item.external}
                    href={item.path}
                  >
                    <span>{item.title}</span>

                    <Show when={item.external}>
                      <svg class="h-5 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Show>
                  </Link>
                </li>
              )}
            </For>
          </ul>
          <ul class="flex items-center col-span-3 flex-row-reverse">
            <li class="ml-3">
              <a href="https://github.com/ryansolid/solid" rel="noopener" target="_blank">
                <span class="sr-only">Navigate to github</span>
                <GithubIcon
                  class="h-8 transition hover:opacity-50"
                  classList={{
                    'opacity-60': unlocked(),
                    'opacity-80': !unlocked(),
                  }}
                />
              </a>
            </li>
            <li class="ml-3">
              <a href="https://www.reddit.com/r/solidjs/" rel="noopener" target="_blank">
                <span class="sr-only">Navigate to reddit</span>
                <RedditIcon
                  class="h-8 transition hover:opacity-50"
                  classList={{
                    'opacity-60': unlocked(),
                    'opacity-80': !unlocked(),
                  }}
                />
              </a>
            </li>
            <li>
              <a href="https://discord.com/invite/solidjs" rel="noopener" target="_blank">
                <span class="sr-only">Navigate to discord</span>
                <DiscordIcon
                  class="h-8 transition hover:opacity-50"
                  classList={{
                    'opacity-60': unlocked(),
                    'opacity-80': !unlocked(),
                  }}
                />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Nav;
