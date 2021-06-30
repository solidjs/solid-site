import { Link, NavLink } from 'solid-app-router';
import { Component, For, onCleanup, onMount, createSignal, Show } from 'solid-js';

import logo from '../assets/logo.svg';
import Social from './Social';

const links: MenuLinkProps[] = [
  { title: 'Docs', path: '/docs/1.0.0' },
  { title: 'Resources', path: '/resources' },
  { title: 'Tutorial', path: '/tutorial' },
  { title: 'Examples', path: '/examples' },
  { title: 'Playground', path: 'https://playground.solidjs.com', external: true },
  { title: 'Media', path: '/media' },
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

const Nav: Component<{ showLogo?: boolean; filled?: boolean }> = (props) => {
  const [unlocked, setUnlocked] = createSignal(props.showLogo);
  const [classList, setClassList] = createSignal({});
  let intersectorRef!: HTMLDivElement;
  let scrollRef!: HTMLUListElement;

  onMount(() => {
    const observer = new IntersectionObserver(([entry]) => setUnlocked(entry.isIntersecting));
    observer.observe(intersectorRef);
    onCleanup(() => observer && observer.disconnect());
    handleScrollMobile(scrollRef);
  });

  const shouldShowLogo = () => props.showLogo || !unlocked();

  const handleScrollMobile = (element: HTMLElement) => {
    const scrollLeft = element.scrollLeft;
    const scrollRight = scrollLeft - element.scrollWidth + element.offsetWidth;
    const newClassList: { [cls: string]: boolean } = {};
    if (scrollLeft > 10) {
      newClassList['fadeout-before-navbar'] = true;
    } else {
      newClassList['fadeout-before-navbar'] = false;
    }
    if (scrollRight < -10) {
      newClassList['fadeout-after-navbar'] = true;
    } else {
      newClassList['fadeout-after-navbar'] = false;
    }
    setClassList(newClassList);
  };

  return (
    <>
      <div ref={intersectorRef} class="h-0" />
      <div
        class="sticky top-0 z-50 bg-white"
        classList={{
          'shadow-md': shouldShowLogo(),
        }}
      >
        <nav class="px-3 lg:px-12 container lg:flex justify-between items-center relative z-20 space-x-10">
          <ul
            ref={scrollRef}
            classList={classList()}
            onScroll={(e) => handleScrollMobile(e.currentTarget)}
            class="flex items-center overflow-auto"
          >
            <Logo show={shouldShowLogo()} />
            <For each={links} children={MenuLink} />
          </ul>
          <ul class="lg:flex hidden items-center space-x-3">
            <Social />
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Nav;
