import { Link, NavLink } from 'solid-app-router';
import { Component, For, onCleanup, onMount, createSignal, Show } from 'solid-js';

import logo from '../assets/logo.svg';

const links: MenuLinkProps[] = [
  { title: 'Docs', path: '/docs/0.26.0' },
  { title: 'Resources', path: '/resources' },
  { title: 'Tutorial', path: '/tutorial' },
  { title: 'Examples', path: '/examples' },
  { title: 'Playground', path: 'https://playground.solidjs.com', external: true },
  { title: 'Media', path: '/media' },
];

const socials = [
  {
    href: 'https://github.com/solidjs/solid',
    alt: 'Navigate to github',
    icon: 'M12 .3a12 12 0 00-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 011.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0012 .3',
  },

  {
    href: 'https://www.reddit.com/r/solidjs/',
    alt: 'Navigate to reddit',
    icon: 'M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm5.01 4.74c.69 0 1.25.56 1.25 1.25a1.25 1.25 0 01-2.5.06l-2.6-.55-.8 3.75c1.83.07 3.48.63 4.68 1.49.3-.31.73-.5 1.2-.5.97 0 1.76.8 1.76 1.76 0 .72-.43 1.33-1.01 1.61a3.11 3.11 0 01.04.52c0 2.7-3.13 4.87-7 4.87-3.88 0-7-2.17-7-4.87 0-.18 0-.36.04-.53A1.75 1.75 0 014.03 12a1.75 1.75 0 012.96-1.26 8.52 8.52 0 014.74-1.5l.89-4.17a.34.34 0 01.14-.2.35.35 0 01.24-.04l2.9.62a1.21 1.21 0 011.11-.7zM9.25 12a1.25 1.25 0 101.25 1.25c0-.69-.56-1.25-1.25-1.25zm5.5 0a1.25 1.25 0 000 2.5 1.25 1.25 0 000-2.5zm-5.47 3.99a.33.33 0 00-.23.1.33.33 0 000 .46c.84.84 2.49.91 2.96.91.48 0 2.1-.06 2.96-.91a.36.36 0 00.03-.47.33.33 0 00-.46 0c-.55.54-1.68.73-2.51.73-.83 0-1.98-.2-2.51-.73a.33.33 0 00-.24-.1z',
  },

  {
    href: 'https://discord.com/invite/solidjs',
    alt: 'Navigate to discord',
    icon: 'M20.22 0c1.4 0 2.54 1.14 2.6 2.48V24l-2.67-2.27-1.47-1.34-1.6-1.4.67 2.2H3.7a2.48 2.48 0 01-2.54-2.47V2.48A2.53 2.53 0 013.71 0h16.51zM14.1 5.68h-.03l-.2.2a8.06 8.06 0 013.08 1.54 10.88 10.88 0 00-6.22-1.14h-.2c-.47 0-1.47.2-2.81.74l-.74.33s1-1 3.21-1.53l-.13-.14s-1.67-.06-3.48 1.27c0 0-1.8 3.15-1.8 7.02 0 0 1 1.74 3.74 1.8 0 0 .4-.53.8-1-1.53-.46-2.13-1.4-2.13-1.4s.13.07.33.2h.06c.03 0 .04.02.06.03.02.02.03.04.06.04.33.13.66.27.93.4.47.2 1.06.4 1.8.53.93.14 2 .2 3.21 0 .6-.13 1.2-.26 1.8-.53.39-.2.87-.4 1.4-.74 0 0-.6.94-2.2 1.4.32.47.79 1 .79 1 2.74-.05 3.8-1.8 3.87-1.72 0-3.87-1.82-7.02-1.82-7.02a6.01 6.01 0 00-3.43-1.26l.05-.02zm.17 4.42c.7 0 1.27.6 1.27 1.33a1.3 1.3 0 01-1.27 1.34c-.7 0-1.27-.6-1.27-1.33 0-.74.58-1.34 1.27-1.34zm-4.54 0c.7 0 1.26.6 1.26 1.33a1.3 1.3 0 01-1.27 1.34c-.7 0-1.27-.6-1.27-1.33 0-.74.58-1.34 1.28-1.34z',
  },

  {
    href: 'https://twitter.com/solid_js',
    alt: 'Navigate to twitter',
    icon: 'M12,0.1c-6.7,0-12,5.3-12,12s5.3,12,12,12s12-5.4,12-12S18.6,0.1,12,0.1z M17,9.4v0.4c0,3.8-2.6,8-7.5,8 c-1.5,0-2.9-0.5-4.1-1.3c0.2,0,0.4,0,0.7,0c1.2,0,2.3-0.5,3.3-1.2c-1.1,0-2.1-0.8-2.4-2c0.2,0.1,0.3,0.1,0.5,0.1 c0.2,0,0.5-0.1,0.7-0.1C6.9,13,6,11.9,6,10.5v-0.1c0.3,0.2,0.8,0.4,1.2,0.4c-0.7-0.5-1.2-1.4-1.2-2.3c0-0.5,0.1-1.1,0.3-1.4 c1.3,1.7,3.2,2.8,5.4,2.9c-0.1-0.2-0.1-0.4-0.1-0.6c0-1.6,1.2-2.8,2.7-2.8c0.8,0,1.4,0.3,1.9,0.9C17,7.3,17.6,7,18.1,6.7 c-0.2,0.7-0.6,1.2-1.1,1.6c0.5-0.1,1-0.2,1.5-0.4C18.1,8.4,17.6,8.9,17,9.4z',
  },
];

const Logo: Component<{ show: boolean }> = (props) => (
  <li class="mr-4">
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
      external={props.external}
      class="inline-flex items-center space-x-2 transition m-1 px-4 py-3 rounded hover:text-white hover:bg-solid-medium whitespace-nowrap"
      activeClass="bg-solid-medium text-white"
    >
      <span>{props.title}</span>
      <Show when={props.external}>
        <svg class="h-5 -mt-1 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

const SocialIcon: Component<{ href: string; alt: string; icon: string }> = (props) => (
  <li>
    <a href={props.href} rel="noopener" target="_blank">
      <span class="sr-only">{props.alt}</span>
      <svg viewBox="0 0 24 24" class="h-8 transition hover:opacity-50 opacity-60">
        <path fill="currentColor" d={props.icon} />
      </svg>
    </a>
  </li>
);

const Nav: Component<{ showLogo?: boolean; filled?: boolean }> = (props) => {
  const [unlocked, setUnlocked] = createSignal(props.showLogo);
  let intersectorRef!: HTMLDivElement;

  onMount(() => {
    const observer = new IntersectionObserver(([entry]) => setUnlocked(entry.isIntersecting));
    observer.observe(intersectorRef);
    onCleanup(() => observer && observer.disconnect());
  });

  const shouldShowLogo = () => props.showLogo || !unlocked();

  return (
    <>
      <div ref={intersectorRef} class="h-0" />
      <div
        class="sticky top-0 z-50 bg-white"
        classList={{
          'border-b': props.showLogo,
        }}
      >
        <nav class="px-3 lg:px-12 container flex justify-between items-center relative z-20 space-x-10">
          <ul class="flex items-center overflow-auto">
            <Logo show={shouldShowLogo()} />
            <For each={links} children={MenuLink} />
          </ul>
          <ul class="flex items-center space-x-3">
            <For each={socials} children={(social) => <SocialIcon {...social} />} />
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Nav;
