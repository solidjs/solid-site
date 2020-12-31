import type { Component } from 'solid-js';
import wordmark from '../assets/wordmark.svg';

const Footer: Component = () => (
  <footer class="py-10 bg-solid-gray">
    <div class="container py-7 grid grid-cols-12 gap-6 text-white">
      <div class="col-span-2 flex justify-center">
        <img class="w-8/12" src={wordmark} alt="Solid logo" />
      </div>

      <div class="col-span-9 text-sm pl-3">
        <p>
          Solid.js is an open-source project supported by a team of public contribitors. It's
          distributed&nbsp;
          <a
            class="text-gray-300 hover:underline"
            href="https://github.com/ryansolid/solid/blob/master/LICENSE"
          >
            under an MIT license
          </a>
          . This library and community are made possible by a&nbsp;
          <a class="text-gray-300 hover:underline" href="/contributors">
            core team and dedicated contributors
          </a>
          .
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
