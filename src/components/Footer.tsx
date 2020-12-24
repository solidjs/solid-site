import type { Component } from 'solid-js';
import wordmark from '../assets/wordmark.svg';

const Footer: Component = () => (
  <footer class="py-10 bg-gray-400">
    <div class="container mx-auto grid grid-cols-12 gap-6 text-white">
      <img class="w-18 col-span-1" src={wordmark} alt="Solid logo" />
      <div class="col-span-9 text-sm pl-3">
        Solid.js is an open-source project supported by a team of public contribitors. It's
        distributed withan{' '}
        <a href="https://github.com/ryansolid/solid/blob/master/LICENSE">MIT license</a>.
      </div>
    </div>
  </footer>
);

export default Footer;
