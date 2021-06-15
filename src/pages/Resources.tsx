import { Component, For, Show, createMemo } from 'solid-js';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ResourcesDataProps } from './Resources.data';

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

const ContentRow: Component<Resource> = (props) => (
  <li class="p-5 border-b hover:bg-gray-50">
    <a class="text-solid" target="_blank" href={props.link} rel="nofollow">
      <div class="text-lg">{props.title}</div>
      <Show when={props.description != ''}>
        <div class="text-sm mt-2 text-black block">{props.description}</div>
      </Show>
    </a>
  </li>
);

/**
 * @TODO: Add sorting and visualisation for individual resource and component types.
 */
const Resources: Component<ResourcesDataProps> = (props) => {
  return (
    <div class="flex flex-col relative">
      <Nav showLogo />
      <Header title="Resources" />

      <div class="grid grid-cols-12 container p-5 gap-6 relative">
        <div class="col-span-3 overflow-auto border p-8 sticky top-24 rounded h-[82vh]">
          <h3 class="text-xl text-solid-default border-b font-semibold border-solid pb-2">Types</h3>
          <For each={Object.entries(ResourceType)}>
            {([name, type]) => (
              <button class="block w-full focus-within:my-4 text-sm py-4 pl-2 text-left border-b hover:opacity-60">
                <span>{name}</span>
              </button>
            )}
          </For>
          <h3 class="text-xl mt-8 text-solid-default border-b font-semibold border-solid pb-2">
            Categories
          </h3>
          <For each={Object.entries(ResourceCategory)}>
            {([name, type]) => (
              <button class="block w-full focus-within:my-4 text-sm py-4 pl-2 text-left border-b hover:opacity-60">
                <span>{name}</span>
              </button>
            )}
          </For>
        </div>

        <div class="col-span-9">
          <ul>
            <For each={props.list}>{(resource) => <ContentRow {...resource} />}</For>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
