import { Component, For, onCleanup, onMount, createSignal } from 'solid-js';
import { Link } from 'solid-app-router';

import logo from '../assets/logo.svg';
import { DiscordIcon } from '../icons/DiscordIcon';
import { RedditIcon } from '../icons/RedditIcon';
import { GithubIcon } from '../icons/GithubIcon';

const links = [
  { title: 'Get Started', path: '/' },
  { title: 'Docs', path: '/docs/latest/api' },
  { title: 'Resources', path: '/resources' },
  { title: 'Examples', path: '/examples' },
  { title: 'Playground', path: 'https://playground.solidjs.com' },
  { title: 'Media', path: '/media' },
];

const Nav: Component<{ showLogo?: boolean }> = ({ showLogo = false }) => {
  const [unlocked, setUnlocked] = createSignal(showLogo);
  let intersectorRef!: HTMLDivElement;
  let observer: IntersectionObserver;

  onMount(() => {
    observer = new IntersectionObserver(([{ isIntersecting }]) => setUnlocked(isIntersecting));
    observer.observe(intersectorRef);
  });

  onCleanup(() => observer && observer.disconnect());

  return (
    <>
      <div ref={intersectorRef} class="h-0" />

      <div
        class="sticky top-0 z-50 nav"
        classList={{
          'nav--locked text-white': !unlocked(),
          'nav--unlocked': unlocked(),
          'border-b': !showLogo,
        }}
      >
        <nav class="container grid grid-cols-10 relative z-20">
          <ul class="flex items-center col-span-7">
            <li
              class={`py-3 transition-all overflow-hidden ${
                showLogo || !unlocked() ? 'w-10 mr-4' : 'w-0'
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
                    class="block transition px-4 py-7 hover:text-white hover:bg-solid-medium"
                    href={item.path}
                  >
                    {item.title}
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
