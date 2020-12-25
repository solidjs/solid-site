import { Component } from 'solid-js';
import Nav from '../components/Nav';
import Header from '../components/Header';

import downloadArrow from '../assets/download-arrow.svg';

const assets = [
  {
    title: 'With Wordmark',
    background: 'bg-white',
    example: 'https://dev.solidjs.com/assets/img/logo/with-wordmark/logo.svg',
    assets: {
      SVG: 'https://dev.solidjs.com/assets/img/logo/with-wordmark/logo.svg',
      PNG: 'https://dev.solidjs.com/assets/img/logo/with-wordmark/logo.png',
      EPS: 'https://dev.solidjs.com/assets/img/logo/with-wordmark/logo.eps',
      JPG: 'https://dev.solidjs.com/assets/img/logo/with-wordmark/logo.jpg',
    },
  },
  {
    title: 'Without Wordmark',
    background: 'bg-white',
    example: 'https://dev.solidjs.com/assets/img/logo/without-wordmark/logo.svg',
    assets: {
      SVG: 'https://dev.solidjs.com/assets/img/logo/without-wordmark/logo.svg',
      PNG: 'https://dev.solidjs.com/assets/img/logo/without-wordmark/logo.png',
      EPS: 'https://dev.solidjs.com/assets/img/logo/without-wordmark/logo.eps',
      JPG: 'https://dev.solidjs.com/assets/img/logo/without-wordmark/logo.jpg',
    },
  },
  {
    title: 'Only Wordmark',
    background: 'bg-white',
    example: 'https://dev.solidjs.com/assets/img/logo/wordmark/logo.svg',
    assets: {
      SVG: 'https://dev.solidjs.com/assets/img/logo/wordmark/logo.svg',
      PNG: 'https://dev.solidjs.com/assets/img/logo/wordmark/logo.png',
      EPS: 'https://dev.solidjs.com/assets/img/logo/wordmark/logo.eps',
      JPG: 'https://dev.solidjs.com/assets/img/logo/wordmark/logo.jpg',
    },
  },
  {
    title: 'With Wordmark',
    background: 'bg-solid-gray',
    example: 'https://dev.solidjs.com/assets/img/logo/dark-with-wordmark/logo.svg',
    assets: {
      SVG: 'https://dev.solidjs.com/assets/img/logo/dark-with-wordmark/logo.svg',
      PNG: 'https://dev.solidjs.com/assets/img/logo/dark-with-wordmark/logo.png',
      EPS: 'https://dev.solidjs.com/assets/img/logo/dark-with-wordmark/logo.eps',
      JPG: 'https://dev.solidjs.com/assets/img/logo/dark-with-wordmark/logo.jpg',
    },
  },
  {
    title: 'Dark Without Wordmark',
    background: 'bg-solid-gray',
    example: 'https://dev.solidjs.com/assets/img/logo/dark-without-wordmark/logo.svg',
    assets: {
      SVG: 'https://dev.solidjs.com/assets/img/logo/dark-without-wordmark/logo.svg',
      PNG: 'https://dev.solidjs.com/assets/img/logo/dark-without-wordmark/logo.png',
      EPS: 'https://dev.solidjs.com/assets/img/logo/dark-without-wordmark/logo.eps',
      JPG: 'https://dev.solidjs.com/assets/img/logo/dark-without-wordmark/logo.jpg',
    },
  },
  {
    title: 'Only Dark Wordmark',
    background: 'bg-solid-gray',
    example: 'https://dev.solidjs.com/assets/img/logo/dark-wordmark/logo.svg',
    assets: {
      SVG: 'https://dev.solidjs.com/assets/img/logo/dark-wordmark/logo.svg',
      PNG: 'https://dev.solidjs.com/assets/img/logo/dark-wordmark/logo.png',
      EPS: 'https://dev.solidjs.com/assets/img/logo/dark-wordmark/logo.eps',
      JPG: 'https://dev.solidjs.com/assets/img/logo/dark-wordmark/logo.jpg',
    },
  },
];

const AssetPanel = ({
  title,
  assets,
  example,
  background,
}: {
  title: string;
  example: string;
  assets: object;
  background: string;
}) => (
  <div class="shadow-lg">
    <div class="p-5 border-b">{title}</div>
    <div class={`py-8 h-60 flex justify-center ${background}`}>
      <img class="w-6/12" src={example} alt={title} />
    </div>
    <div class="border-b border-t grid grid-cols-4 text-sm text-solid">
      {Object.entries(assets).map(([name, path]) => (
        <a
          class="border-r flex p-3 justify-center border-r transition hover:opacity-50"
          download={true}
          href={path}
        >
          <img class="w-4 mr-3" src={downloadArrow} /> {name}
        </a>
      ))}
    </div>
  </div>
);

const Media: Component = () => (
  <div class="flex flex-col">
    <Nav showLogo={true} />
    <Header title="Media Assets" />
    <div class="my-10 pt-5 pb-10 container">
      <div class="mb-10 grid grid-cols-6 gap-4">
        <div class="col-span-4">
          The following are assets that represent the Solid brand. All assets are considered
          open-source contributions and should be used according to open standards and licensing
          rules.
        </div>
        <div class="col-span-2 col-end-7">
          <div class="flex mb-2">
            <span class="w-5/12 inline-block font-bold">Brand Font</span> Gordita
          </div>
          <div class="flex mb-2">
            <span class="w-5/12 inline-block font-bold">Primary Color</span>
            <figure class="rounded bg-solid mr-2 h-5 w-5 inline-block" /> #2c4f7c
          </div>
          <div class="flex mb-2">
            <span class="w-5/12 inline-block font-bold">Secondary Color</span>
            <figure class="rounded bg-solid-medium mr-2 h-5 w-5 inline-block" /> #335d92
          </div>
          <div class="flex">
            <span class="w-5/12 inline-block font-bold">Light Color</span>
            <figure class="rounded bg-solid-light mr-2 h-5 w-5 inline-block" /> #446b9e
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4">
        {assets.map((props) => (
          <AssetPanel {...props} />
        ))}
      </div>
    </div>
  </div>
);

export default Media;
