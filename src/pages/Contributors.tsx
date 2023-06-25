import { Component, For, Show } from 'solid-js';
import { useRouteData } from '@solidjs/router';
import github from '../assets/github.svg';
import { ContributorsDataProps } from './Contributors.data';
import Footer from '../components/Footer';
import { useI18n } from '@solid-primitives/i18n';
import { useRouteReadyState } from '../utils/routeReadyState';

interface CoreMemberProps {
  img: string;
  name: string;
  role: string;
  bio: string;
  github: string;
}

const CoreMember: Component<CoreMemberProps> = (props) => {
  return (
    <li class="grid grid-cols-3 gap-x-10">
      <div>
        <span class="sr-only">Profile picture of {props.name}</span>
        <img
          class="shadow-lg rounded-md w-full"
          alt="Profile headshot"
          src={`/img/bios/${props.img}`}
        />
      </div>

      <div class="space-y-4 col-span-2 flex flex-col items-start">
        <span class="text-bold text-xl block text-solid">{props.name}</span>
        <hr class="self-stretch" />
        <small>{props.role}</small>
        <p class="block">{props.bio}</p>
        <a target="_blank" rel="noopener" href={`https://github.com/${props.github}`}>
          <span class="sr-only">Github URL of {props.github}</span>
          <img class="w-7" alt={`Github URL of ${props.github}`} src={github} />
        </a>
      </div>
    </li>
  );
};

interface ContributorProps {
  name: string;
  link: string;
  company: string;
  detail: string;
}

const Contributor: Component<ContributorProps> = (props) => {
  return (
    <li class="shadow-even-md-light p-7 rounded dark:shadow-even-md-dark">
      <p class="text-bold text-lg text-solid inline-flex space-x-2">
        <span>{props.name}</span>
        <Show when={props.company}>
          <a href={props.link} class="text-black dark:text-gray-400 hover:underline">
            ({props.company})
          </a>
        </Show>
      </p>
      <p class="text-md mt-1">{props.detail}</p>
    </li>
  );
};

const Contributors: Component = () => {
  const [t] = useI18n();
  const data = useRouteData<ContributorsDataProps>();

  useRouteReadyState();

  return (
    <div class="flex flex-col relative">
      <div class="px-3 lg:px-12 container my-10">
        <div class="lg:grid my-8 lg:grid-cols-12 space-y-10 gap-20">
          <div class="col-span-6 flex flex-col space-y-10">
            <h2 class="text-3xl font-semibold text-solid-default dark:text-solid-darkdefault">
              {t('contributors.core_team', {}, 'Core Team')}
            </h2>
            <ul class="space-y-10">
              <For each={data.core} children={CoreMember} />
            </ul>
            <h2 class="text-2xl font-semibold text-solid-default dark:text-solid-darkdefault">
              {t('contributors.ecosystem_team', {}, 'Ecosystem Team')}
            </h2>
            <ul class="flex flex-col space-y-3">
              <For each={data.ecosystem} children={Contributor} />
            </ul>
          </div>
          <div class="col-span-6 flex flex-col space-y-10">
            <h2 class="text-2xl font-semibold text-solid-default dark:text-solid-darkdefault">
              {t('contributors.acknowledgments', {}, 'Acknowledgements')}
            </h2>
            <p>
              {t(
                'contributors.copy',
                {},
                "Solid wouldn't be possible without the help of other talented individuals. As we grow we hope others will find ways to give their time either in the form of bug reporting, pull requests, design suggestions, writing and many other ways.",
              )}
            </p>
            <ul class="flex flex-col space-y-3">
              <For each={data.contributors} children={Contributor} />
            </ul>
            <div class="flex mb-5 flex-col space-y-3">
              <h2 class="text-2xl mb-5 font-semibold text-solid-default dark:text-solid-darkdefault">
                {t('contributors.contributors', {}, 'Contributors')}
              </h2>
              <a target="_blank" href="https://github.com/solidjs/solid/graphs/contributors">
                <img src="https://camo.githubusercontent.com/c2d6e18c0cf67d82e51738442d4082326b7cf63a1552e9d27f773eafe0d3d3be/68747470733a2f2f6f70656e636f6c6c6563746976652e636f6d2f736f6c69642f636f6e7472696275746f72732e7376673f77696474683d38393026627574746f6e3d66616c7365" />
              </a>
            </div>
            <h2 class="text-2xl font-semibold text-solid-default dark:text-solid-darkdefault">
              {t('contributors.internationalization', {}, 'Internationalization')}
            </h2>
            <div class="mt-0">
              {t(
                'contributors.translators_copy',
                {},
                'The following individuals have graciously given their time and effort to ensure Solid goes international:',
              )}
              <ul class="list-disc ml-8 space-y-3 mt-4">
                <For each={data.translators}>
                  {(translator) => (
                    <li>
                      <a href={translator.link}>
                        {translator.name} {translator.flag}
                      </a>
                    </li>
                  )}
                </For>
              </ul>
            </div>
            <div>
              <h2 class="text-2xl mb-5 font-semibold text-solid-default dark:text-solid-darkdefault">
                Open Collective
              </h2>
              <div class="inline-block mb-10">
                {t(
                  'contributors.support_copy',
                  {},
                  'Support us with a donation and help us continue our activities:',
                )}{' '}
                <a
                  target="_blank"
                  class="text-solid-default dark:text-solid-darkdefault "
                  href="https://opencollective.com/solid"
                >
                  Contribute today &raquo;
                </a>
              </div>
              <div class="grid grid-cols-8 gap-4">
                <a href="https://opencollective.com/solid/backer/0/website" target="_blank">
                  <img class="w-22" src="https://opencollective.com/solid/backer/0/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/1/website" target="_blank">
                  <img class="w-22" src="https://opencollective.com/solid/backer/1/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/2/website" target="_blank">
                  <img class="w-22" src="https://opencollective.com/solid/backer/2/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/3/website" target="_blank">
                  <img class="w-22" src="https://opencollective.com/solid/backer/3/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/4/website" target="_blank">
                  <img class="w-22" src="https://opencollective.com/solid/backer/4/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/5/website" target="_blank">
                  <img class="w-22" src="https://opencollective.com/solid/backer/5/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/6/website" target="_blank">
                  <img class="w-22" src="https://opencollective.com/solid/backer/6/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/7/website" target="_blank">
                  <img class="w-22" src="https://opencollective.com/solid/backer/7/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/8/website" target="_blank">
                  <img class="w-22" src="https://opencollective.com/solid/backer/8/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/9/website" target="_blank">
                  <img class="w-22" src="https://opencollective.com/solid/backer/9/avatar.svg" />
                </a>
                <a href="https://opencollective.com/solid/backer/10/website" target="_blank">
                  <img class="w-22" src="https://opencollective.com/solid/backer/10/avatar.svg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contributors;
