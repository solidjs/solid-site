import { Component, For } from 'solid-js';
import { onMount, createSignal } from 'solid-js';

import logo from '../assets/logo.svg';
import github from '../assets/github.svg';
import discord from '../assets/discord.svg';
import reddit from '../assets/reddit.svg';
import { Link } from 'solid-app-router';

const links = [
  { title: 'Get Started', path: '/' },
  { title: 'Docs', path: '/docs/0.17.0/components' },
  { title: 'Articles', path: '/articles' },
  { title: 'Media', path: '/media' },
  { title: 'Playground', path: 'https://playground.solidjs.com' },
];

const Nav: Component<{ showLogo?: boolean }> = ({ showLogo = false }) => {
  const [locked, setLocked] = createSignal(showLogo);
  let intersectorRef!: HTMLDivElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([firstEntry]) => {
        if (firstEntry.intersectionRatio === 0) {
          setLocked(true);
        } else if (firstEntry.intersectionRatio === 1) {
          setLocked(false);
        }
      },
      { threshold: [0, 1] },
    );

    observer.observe(intersectorRef);
  });

  return (
    <>
      <div ref={intersectorRef} class="h-0" />
      <nav
        class={
          `sticky top-0 z-50 w-screentransition-all duration-200 ` +
          (locked() === true
            ? 'shadow-lg bg-gradient-to-r from-solid-light via-solid-medium bg-hero-pattern to-solid text-white'
            : 'bg-white shadow-sm')
        }
      >
        <div class="container grid grid-cols-10 mx-auto">
          <ul class="flex items-center col-span-7">
            <li
              class={`py-3 transition-all overflow-hidden ${
                showLogo === true || locked() === true ? 'w-10 mr-4' : 'w-0'
              }`}
            >
              <a href="/">
                <img class="w-14" src={logo} alt="Solid logo" />
              </a>
            </li>
            <For each={links}>
              {(item) => (
                <li>
                  <Link
                    class="block transition px-5 py-7 hover:text-white hover:bg-solid-medium"
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
              <a href="https://github.com/ryansolid/solid" target="_blank">
                <img alt="Github logo" class="h-8 w-8 transition hover:opacity-50" src={github} />
              </a>
            </li>
            <li class="ml-3">
              <a href="https://www.reddit.com/r/solidjs/" target="_blank">
                <img alt="Reddit logo" class="h-8 w-8 transition hover:opacity-50" src={reddit} />
              </a>
            </li>
            <li>
              <a href="https://discord.com/invite/solidjs" target="_blank">
                <img
                  alt="Discord logo"
                  class="h-9 w-13 transition hover:opacity-50"
                  src={discord}
                />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
