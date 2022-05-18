import { Component } from 'solid-js';
import { Portal } from 'solid-js/web';
import Newsletter from './Newsletter';
import { useI18n } from '@solid-primitives/i18n';
import wordmark from '../assets/wordmark-dark.svg';
import builder from '../assets/supporters/builder.webp';
import sauce from '../assets/supporters/saucelabs.webp';
import cloudflare from '../assets/supporters/cloudflare.webp';
import netlify from '../assets/supporters/netlify.webp';
import divriots from '../assets/supporters/divriots.webp';
import vercel from '../assets/supporters/vercel.webp';
import Social from './Social';

const Supporter: Component<{
  img: string;
  alt: string;
  href: string;
}> = (props) => (
  <a
    class="mx-4 hover:opacity-50 dark:brightness-150 transition grid"
    target="_blank"
    rel="noopener"
    href={props.href}
  >
    <img class="w-40 m-auto md:m-0" src={props.img} alt={props.alt} loading="lazy" />
  </a>
);

const Footer: Component = () => {
  const [t] = useI18n();
  return (
    <Portal mount={document.getElementById('footer')!}>
      <div
        dir={t('global.dir', {}, 'ltr')}
        class="py-10 mt-5 bg-solid-lightgray dark:bg-solid-darkLighterBg rounded-tr-3xl rounded-tl-3xl mx-2"
      >
        <div class="px-7 md:px-0 py-10 lg:px-12 container flex flex-col lg:flex-row items-center space-y-10 lg:space-y-0 lg:space-x-20">
          <img class="w-52 dark:invert" src={wordmark} alt="Solid logo" />
          <div class="text-sm">
            <Newsletter
              title={t('global.newsletter.title', {}, 'Sign up for SolidJS News')}
              className="mb-7 py-3"
            />
            <p
              innerHTML={t('global.footer.declaration', {
                license: t('global.footer.license'),
                contributors: '/contributors',
              })}
            />
            <p class="mt-2">
              SolidJS and logo are trademarks of the SolidJS project and Core Team.
            </p>
            <div class="relative flex flex-col md:flex-row justify-center justify-items-center mb-8 mt-12 gap-12 p-7 bg-white/30 dark:bg-solid-darkbg/20 md:mb-5 md:mt-7 md:rounded-3xl md:justify-start items-center">
              <span class="text-center font-semibold text-gray-600 dark:text-white text-lg md:static md:text-left md:w-1/6">
                {t('global.footer.sponsored_by')}
              </span>
              <div class="grid grid-cols-1 gap-8 auto-rows-fr sm:grid-cols-2 md:grid-cols-3 md:auto-rows-auto w-full">
                <Supporter alt="Cloudflare" href="https://www.cloudflare.com/" img={cloudflare} />
                <Supporter alt="Netlify" href="https://www.netlify.com/" img={netlify} />
                <Supporter alt="Builder.io" href="https://www.builder.io/" img={builder} />
                <Supporter alt="SAUCELABS" href="https://www.saucelabs.com/" img={sauce} />
                <Supporter alt="<div>riots>" href="https://divriots.com/" img={divriots} />
                <Supporter alt="Vercel" href="https://www.vercel.com/" img={vercel} />
              </div>
            </div>
            <div class="flex justify-between">
              <p class="text-sm text-center text-gray-600 dark:text-gray-300">
                {t('global.footer.updated', {
                  date: '2022/05/18, 3:30pm',
                  version: '1.4.1',
                })}
              </p>
            </div>
            <ul class="lg:hidden flex justify-center items-center pt-12">
              <Social />
            </ul>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Footer;
