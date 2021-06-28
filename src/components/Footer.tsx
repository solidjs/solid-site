import type { Component } from 'solid-js';
import { Portal } from 'solid-js/web';
import wordmark from '../assets/wordmark-dark.svg';
import builder from '../assets/supporters/builder.png';
import sauce from '../assets/supporters/saucelabs.png';
import cloudflare from '../assets/supporters/cloudflare.png';

const Footer: Component = () => (
  <Portal mount={document.getElementById('footer')!}>
    <div class="py-10 mt-5 bg-solid-lightgray rounded-tr-3xl rounded-tl-3xl mx-3">
      <div class="px-3 py-10 lg:px-12 container flex flex-col lg:flex-row items-center space-y-10 lg:space-y-0 lg:space-x-20">
        <a href="/media"></a>
        <img class="w-40" src={wordmark} alt="Solid logo" />

        <div class="text-sm max-w-5xl">
          <p>
            Solid is an open-source project supported by a team of public contributors. It's
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

          <div class="mb-5 mt-7 p-2 rounded-full bg-white hidden md:flex items-center">
            <div class="text-gray-400 my-4 ml-5 mr-2">Sponsored by</div>
            <a
              class="mx-4 hover:opacity-50 transition"
              target="_blank"
              href="https://www.cloudflare.com/"
            >
              <img class="w-32" src={cloudflare} />
            </a>
            <a
              class="mx-4 hover:opacity-50 transition"
              target="_blank"
              href="https://www.builder.io/"
            >
              <img class="w-24" src={builder} />
            </a>
            <a
              class="mx-4 hover:opacity-50 transition"
              target="_blank"
              href="https://www.saucelabs.com/"
            >
              <img class="w-32" src={sauce} />
            </a>
          </div>

          {/* TODO: Make this dynamic */}
          <p class="text-sm text-right text-gray-400 mt-3">
            Last updated June 28, 2021 on Solid v1.0.0.
          </p>
        </div>
      </div>
    </div>
  </Portal>
);

export default Footer;
