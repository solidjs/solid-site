
import type { Component } from 'solid-js';
import { createEffect, createSignal } from 'solid-js';

import logo from '../assets/logo.svg';
import github from '../assets/github.svg';
import discord from '../assets/discord.svg';
import reddit from '../assets/reddit.svg';

const links = [
  { title: 'Get Started', path:  '/' },
  { title: 'Articles', path:  '/articles' },
  { title: 'Media', path:  '/media' },
  { title: 'Docs', path:  '/docs' }
];

const Nav: Component = () => {
  const [ locked, setLocked ] = createSignal(false);
  let intersectorRef;
  createEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio === 0) {
        setLocked(true);
      } else if (entries[0].intersectionRatio === 1) {
        setLocked(false);
      }
    }, { threshold: [0, 1] });
    observer.observe(intersectorRef);
  });
  return <>
    <div ref={intersectorRef} class="h-0" />
    <nav class={
      `sticky top-0 w-screentransition-all duration-200 ` + (locked() === true ?
        'shadow-lg bg-gradient-to-r from-solid-light via-solid-medium bg-hero-pattern to-solid text-white' :
        'bg-white shadow-sm')
    }>
      <div class="container grid grid-cols-10 mx-auto">
        <ul class="flex items-center col-span-7">
          <li class={`py-3 transition-all overflow-hidden ${locked() === true ? 'w-10 mr-4' : 'w-0'}`}>
            <img class="w-14" src={logo} alt="Solid logo" />
          </li>
          {links.map((item) => (
            <li>
              <a class="block transition px-5 py-7 hover:text-white hover:bg-solid-medium" href={item.path}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        <ul class="flex items-center col-span-3 flex-row-reverse">
          <li class="ml-3">
            <a href="https://github.com/ryansolid/solid" target="_blank"><img class="h-8 w-8 transition hover:opacity-50" src={github} /></a>
          </li>
          <li class="ml-3">
            <a href="https://www.reddit.com/r/solidjs/" target="_blank"><img class="h-8 w-8 transition hover:opacity-50" src={reddit} /></a>
          </li>
          <li>
            <a href="https://discord.com/invite/solidjs" target="_blank"><img class="h-9 w-13 transition hover:opacity-50" src={discord} /></a>
          </li>
        </ul>
      </div>
    </nav>
  </>;
};

export default Nav;
