import { Component } from 'solid-js';
import { Portal } from 'solid-js/web';
import Newsletter from './Newsletter';
import { useI18n } from '@solid-primitives/i18n';
import wordmark from '../assets/wordmark-dark.svg';
import builder from '../assets/supporters/builder.png';
import sauce from '../assets/supporters/saucelabs.png';
import cloudflare from '../assets/supporters/cloudflare.png';
import netlify from '../assets/supporters/netlify.png';
import divriots from '../assets/supporters/divriots.png';
import Social from './Social';

const Supporter: Component<{
  img: string;
  alt: string;
  href: string;
}> = (props) => (
  <a
    class="mx-4 hover:opacity-50 dark:brightness-150 transition"
    target="_blank"
    rel="noopener"
    href={props.href}
  >
    <img class="w-32" src={props.img} alt={props.alt} />
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
            <div class="relative justify-center justify-items-center mb-8 mt-12 grid gap-2 grid-cols-2 p-2 bg-white dark:bg-solid-darkbg rounded-3xl md:mb-5 md:mt-7 md:rounded-full md:justify-start md:flex md:gap-0 items-center">
              <div class="text-xs m-0 text-center absolute -top-5 left-0 font-semibold text-gray-600 dark:text-white md:text-sm md:static md:text-left md:my-4 md:ml-5 md:mr-2">
                {t('global.footer.sponsored_by')}
              </div>
              <Supporter alt="Cloudflare" href="https://www.cloudflare.com/" img={cloudflare} />
              <Supporter alt="Netlify" href="https://www.netlify.com/" img={netlify} />
              <Supporter alt="Builder.io" href="https://www.builder.io/" img={builder} />
              <Supporter alt="SAUCELABS" href="https://www.saucelabs.com/" img={sauce} />
              <Supporter alt="<div>riots>" href="https://divriots.com/" img={divriots} />
            </div>
            <div class="flex justify-between">
              <p class="text-sm text-center text-gray-600 dark:text-gray-300">
                {t('global.footer.updated', {
                  date: '2022/02/13, 9:00pm',
                  version: '1.3.7',
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
