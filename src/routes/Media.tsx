import { Component, For } from 'solid-js';
import downloadArrow from '~/assets/download-arrow.svg';
import Footer from '~/components/Footer';
import { useI18n } from '@solid-primitives/i18n';
import { useRouteReadyState } from '~/utils/routeReadyState';
import { copyToClipboard, createClipboard } from '@solid-primitives/clipboard';

const assets = [
  {
    title: 'With Wordmark',
    background: 'bg-white dark:border-solid-darkLighterBg',
    example: '/img/logo/with-wordmark/logo.svg',
    assets: {
      SVG: '/img/logo/with-wordmark/logo.svg',
      PNG: '/img/logo/with-wordmark/logo.png',
      EPS: '/img/logo/with-wordmark/logo.eps',
      JPG: '/img/logo/with-wordmark/logo.jpg',
    },
  },
  {
    title: 'Dark With Wordmark',
    background: 'bg-solid-gray',
    example: '/img/logo/dark-with-wordmark/logo.svg',
    assets: {
      SVG: '/img/logo/dark-with-wordmark/logo.svg',
      PNG: '/img/logo/dark-with-wordmark/logo.png',
      EPS: '/img/logo/dark-with-wordmark/logo.eps',
      JPG: '/img/logo/dark-with-wordmark/logo.jpg',
    },
  },
  {
    title: 'Without Wordmark',
    background: 'bg-white',
    example: '/img/logo/without-wordmark/logo.svg',
    assets: {
      SVG: '/img/logo/without-wordmark/logo.svg',
      PNG: '/img/logo/without-wordmark/logo.png',
      EPS: '/img/logo/without-wordmark/logo.eps',
      JPG: '/img/logo/without-wordmark/logo.jpg',
    },
  },
  {
    title: 'Dark Without Wordmark',
    background: 'bg-solid-gray',
    example: '/img/logo/dark-without-wordmark/logo.svg',
    assets: {
      SVG: '/img/logo/dark-without-wordmark/logo.svg',
      PNG: '/img/logo/dark-without-wordmark/logo.png',
      EPS: '/img/logo/dark-without-wordmark/logo.eps',
      JPG: '/img/logo/dark-without-wordmark/logo.jpg',
    },
  },
  {
    title: 'Only Wordmark',
    background: 'bg-white dark:border-solid-darkLighterBg',
    example: '/img/logo/wordmark/logo.svg',
    assets: {
      SVG: '/img/logo/wordmark/logo.svg',
      PNG: '/img/logo/wordmark/logo.png',
      EPS: '/img/logo/wordmark/logo.eps',
      JPG: '/img/logo/wordmark/logo.jpg',
    },
  },
  {
    title: 'Dark Only Wordmark',
    background: 'bg-solid-gray',
    example: '/img/logo/dark-wordmark/logo.svg',
    assets: {
      SVG: '/img/logo/dark-wordmark/logo.svg',
      PNG: '/img/logo/dark-wordmark/logo.png',
      EPS: '/img/logo/dark-wordmark/logo.eps',
      JPG: '/img/logo/dark-wordmark/logo.jpg',
    },
  },
];

const AssetPanel: Component<{
  title: string;
  example: string;
  assets: Record<string, string>;
  background: string;
}> = ({ title, assets, example, background }) => {
  const [t] = useI18n();
  const slug = title.replaceAll(' ', '_').toLowerCase();
  return (
    <div class="shadow-md">
      <div class="p-5 dark:border-solid-darkLighterBg border-b">
        {t(`media.resources.${slug}`, {}, title)}
      </div>
      <div class={`py-8 h-56 flex px-10 items-center justify-center ${background}`}>
        <img class="max-h-20" src={example} alt={title} />
      </div>
      <div class="border-b dark:border-solid-darkLighterBg border-t grid grid-cols-4 text-sm text-solid">
        {Object.entries(assets).map(([name, path]) => (
          <a
            class="flex p-3 justify-center border-r dark:border-solid-darkLighterBg transition hover:opacity-50"
            download={path.split('/').pop()}
            href={path}
          >
            <span class="sr-only">Download asset</span>
            <img class="w-4 mr-3" alt="Download Arrow" src={downloadArrow} /> {name}
          </a>
        ))}
      </div>
    </div>
  );
};

const Media: Component = () => {
  const [t] = useI18n();
  const [setter] = createClipboard();
  copyToClipboard;

  useRouteReadyState();

  return (
    <div class="flex flex-col">
      <div class="my-10 pt-5 pb-10 px-3 lg:px-12 container">
        <div class="mb-10 md:grid md:grid-cols-6 gap-10">
          <div class="col-span-2">
            <div class="mb-8">{t('media.copy')}</div>
            <div class="flex p-4 border-2 dark:border-solid-darkLighterBg justify-between border-b-0">
              <div class="w-5/12 inline-block">{t('media.brand_font', {}, 'Brand Font')}</div>{' '}
              <div class="text-md">Gordita</div>
            </div>
            <div class="flex h-36 bg-solid-default p-4 justify-between items-end text-white between">
              <div>{t('media.primary', {}, 'Primary Color')}</div>
              <div class="text-sm cursor-pointer hover:opacity-50" use:copyToClipboard={{ setter }}>
                #2c4f7c
              </div>
            </div>
            <div class="flex h-28 bg-solid-medium p-4 justify-between items-end text-white">
              <div>{t('media.secondary', {}, 'Secondary Color')}</div>
              <div class="text-sm cursor-pointer hover:opacity-50" use:copyToClipboard={{ setter }}>
                #335d92
              </div>
            </div>
            <div class="flex h-20 p-4 bg-solid-light justify-between items-end text-white">
              <div>{t('media.light', {}, 'Light Color')}</div>
              <div class="text-sm cursor-pointer hover:opacity-50" use:copyToClipboard={{ setter }}>
                #446b9e
              </div>
            </div>
            <div class="flex h-20 p-4 bg-solid-accent justify-between items-end text-white">
              <div>{t('media.accent', {}, 'Accent Color')}</div>
              <div class="text-sm cursor-pointer hover:opacity-50" use:copyToClipboard={{ setter }}>
                #66e6ac
              </div>
            </div>
            <div class="flex h-20 p-4 bg-solid-secondaccent justify-between items-end text-white">
              <div>{t('media.second_accent', {}, 'Second Accent Color')}</div>
              <div class="text-sm cursor-pointer hover:opacity-50" use:copyToClipboard={{ setter }}>
                #0CDC73
              </div>
            </div>
            <div class="text-xs text-gray-500 text-right mt-3">{t('media.copy_hex')}</div>
          </div>
          <div class="col-span-4 col-end-7 mt-9 md:mt-0">
            <div class="lg:grid lg:grid-cols-2 gap-4 space-y-5 md:space-y-0">
              <For each={assets}>{(props) => <AssetPanel {...props} />}</For>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Media;
