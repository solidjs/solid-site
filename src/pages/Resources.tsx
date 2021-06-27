import { Component, For, Show, createMemo } from 'solid-js';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ResourcesDataProps } from './Resources.data';
import { Icon } from "@amoutonbrady/solid-heroicons";
import { code, videoCamera, bookOpen, terminal, chevronRight, shieldCheck } from '@amoutonbrady/solid-heroicons/outline';

export enum ResourceType {
  Article = 'article',
  Video = 'video',
  Library = 'library',
  Package = 'package',
}
export enum ResourceCategory {
  Primitives = 'primitive',
  Routers = 'router',
  Libraries = 'library',
  Plugins = 'plugin',
  BuildUtilities = 'build_utility',
  Educational = 'educational',
}
export interface Resource {
  title: string;
  link: string;
  author?: string;
  author_url?: string;
  description?: string;
  type: ResourceType;
  categories: Array<ResourceCategory>;
  official?: boolean; // If the resource is an official Solid resource
  keywords?: Array<string>;
}
const ResourceTypeIcons = {
  article: bookOpen,
  video: videoCamera,
  library: code,
  package: terminal
}

const ContentRow: Component<Resource> = (props) => (
  <li class="py-8 border-b hover:bg-gray-50 duration-100">
    <a class="grid grid-cols-12 grid-flow-col text-solid" target="_blank" href={props.link} rel="nofollow">
      <div class="col-span-1 flex items-center justify-center">
        <figure class="w-12 h-12 p-2 bg-solid-medium rounded-full text-white">
          <Icon class="w-full" path={ResourceTypeIcons[props.type]} />
        </figure>
      </div>
      <div class="col-span-9 items-center">
        <div class="text-lg">{props.title}</div>
        <Show when={props.description != ''}>
          <div class="text-xs mt-2 text-black mb-3 block">{props.description}</div>
        </Show>
        <Show when={props.author && !props.author_url}>
          <div class="text-xs mt-3 text-gray-500 block">By {props.author}</div>
        </Show>
        <Show when={props.author && props.author_url}>
          <a href={props.author_url} class="text-xs text-gray-500 inline hover:text-solid-medium">By {props.author}</a>
        </Show>
      </div>
      <div class="col-span-1 flex items-center text-solid-light">
        <Show when={props.official}>
          <Icon class="w-7 mr-2" path={shieldCheck} />
          Official
        </Show>
      </div>
      <div class="col-span-1 flex justify-end">
        <Icon class="w-7 text-gray-400" path={chevronRight} />
      </div>
    </a>
  </li>
);

/**
 * @TODO: Add sorting and visualisation for individual resource and component types.
 */
const Resources: Component<ResourcesDataProps> = (props) => {
  const filteredResources = createMemo(() => props.list.filter(() => true));
  const filteredCategories = createMemo(() => Object.entries(ResourceCategory));
  const resourceCounts = createMemo(() => filteredResources().reduce(
    (memo, resource) => {
      memo[resource.type] = memo[resource.type] ? memo[resource.type] + 1 : 1;
      return memo;
    },
    {}
  ));
  return (
    <div class="flex flex-col relative">
      <Nav showLogo />
      <Header title="Resources" />
      <div class="grid grid-cols-12 container p-5 gap-6 relative">
        <div class="col-span-3 overflow-auto  p-5 sticky top-20 rounded h-[82vh]">
          <input class="mb-5 rounded border-solid w-full border-gray-200 placeholder-opacity-25 placeholder-gray-500" placeholder="Search resources" type="text" />
          <h3 class="text-xl text-solid-default border-b font-semibold border-solid pb-2">Types</h3>
          <For each={Object.entries(ResourceType)}>
            {([name, type]) => (
              <button class="flex items-center space-x-3 w-full focus-within:my-4 text-sm py-3 pl-3 text-left border rounded-md mt-2 hover:opacity-60">
                <figure class="flex content-center w-9 h-9 p-2 bg-solid-medium rounded-full text-white">
                  <Icon class="w-full" path={ResourceTypeIcons[type]} />
                </figure>
                <span>{name}</span>
                <span class="float-right text-xs">
                  <Show when={resourceCounts()[type]} fallback={0}>{resourceCounts()[type]}</Show>
                </span>
              </button>
            )}
          </For>
          <h3 class="text-xl mt-8 text-solid-default border-b font-semibold border-solid pb-2">
            Categories
          </h3>
          <For each={filteredCategories()}>
            {([name, type]) => (
              <button class="block w-full focus-within:my-4 text-sm py-4 pl-2 text-left border-b hover:opacity-60">
                <span>{name}</span>
              </button>
            )}
          </For>
        </div>
        <div class="col-span-9">
          <ul>
            <For each={filteredResources()}>{(resource) => <ContentRow {...resource} />}</For>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
