import type { Component } from 'solid-js';
import logo from '../assets/logo.svg';

const Nav: Component = () => (
  <nav
    class="fixed w-screen"
    style={{
      boxShadow: `rgba(214, 214, 214, 0.5) 0px 6px 10px -5px`,
      background: `white`,
    }}
  >
    <ul class="container flex items-center mx-auto">
      <li class="py-4">
        <img class="w-14" src={logo} alt="Solid logo" />
      </li>
      <li class="px-5">
        <a href="/">Get Started</a>
      </li>
      <li class="px-5">
        <a href="/">Resources</a>
      </li>
      <li class="px-5">
        <a href="/">Docs</a>
      </li>
      <li class="px-5">
        <a href="/">Github</a>
      </li>
      <li class="px-5">
        <a href="/">Discord</a>
      </li>
    </ul>
  </nav>
);

export default Nav;
