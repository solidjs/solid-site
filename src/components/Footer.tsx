import type { Component } from 'solid-js';
import { Portal } from 'solid-js/web';
import wordmark from '../assets/wordmark-dark.svg';

const Footer: Component = () => (
  <Portal mount={document.getElementById('footer')}>
    <div class="py-10 mt-5 bg-gray-100 rounded-tr-3xl rounded-tl-3xl mx-3">
      <div class="px-3 py-10 lg:px-12 container flex flex-col lg:flex-row items-center space-y-10 lg:space-y-0 lg:space-x-20">
        <a href="/media"></a>
        <img class="w-40" src={wordmark} alt="Solid logo" />

        <div class="text-sm max-w-5xl">
          <p>
            Solidjs is an open-source project supported by a team of public contribitors. It's
            distributed&nbsp;
            <a
              class="underline hover:text-gray-500"
              href="https://github.com/ryansolid/solid/blob/master/LICENSE"
            >
              under an MIT license
            </a>
            . This library and community are made possible by a&nbsp;
            <a class="underline hover:text-gray-500" href="/contributors">
              core team and dedicated contributors
            </a>
            .
          </p>

          {/* TODO: Make this dynamic */}
          <p class="text-sm text-gray-400 mt-3">Last updated April 7, 2021 on Solid v0.26.0.</p>
        </div>
      </div>
    </div>
  </Portal>
);

export default Footer;
