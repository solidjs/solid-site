import { Component, For, Show, createSignal, createMemo } from 'solid-js';
import { createStore } from 'solid-js/store';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ResourcesDataProps } from './Resources.data';
import { Icon } from '@amoutonbrady/solid-heroicons';
import Fuse from 'fuse.js';
import {
  code,
  videoCamera,
  bookOpen,
  terminal,
  chevronRight,
  shieldCheck,
} from '@amoutonbrady/solid-heroicons/outline';

export enum ResourceType {
  Article = 'article',
  Video = 'video',
  Library = 'library',
  Package = 'package',
}
export enum ResourceCategory {
  Primitives = 'primitive',
  Routers = 'router',
  Data = 'Data',
  UI = 'ui',
  Plugins = 'plugin',
  Starters = 'starters',
  BuildUtilities = 'build_utility',
  AddOn = 'add_on',
  Testing = 'testing',
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
  package: terminal,
};

const ContentRow: Component<Resource> = (props) => (
  <li class="py-6 border-b hover:bg-gray-50 duration-100">
    <a
      class="grid grid-cols-12 grid-flow-col gap-2 text-solid"
      target="_blank"
      href={props.link}
      rel="nofollow"
    >
      <div class="col-span-2 md:col-span-3 lg:col-span-1 flex items-center justify-center">
        <figure class="flex content-center w-11 h-11 p-1.5 bg-solid-medium rounded-full text-white">
          <Icon class="w-full" path={ResourceTypeIcons[props.type]} />
        </figure>
      </div>
      <div class="col-span-7 md:col-span-7 lg:col-span-10 items-center">
        <div class="text-lg">{props.title}</div>
        <Show when={props.description != ''}>
          <div class="text-xs mt-2 text-black mb-3 block">{props.description}</div>
        </Show>
        <Show when={props.author && !props.author_url}>
          <div class="text-xs mt-3 text-gray-500 block">By {props.author}</div>
        </Show>
        <Show when={props.author && props.author_url}>
          <a href={props.author_url} class="text-xs text-gray-500 inline hover:text-solid-medium">
            By {props.author}
          </a>
        </Show>
      </div>
      <div class="col-span-1 flex items-center text-solid-light">
        <Show when={props.official}>
          <Icon class="w-7 mr-2" path={shieldCheck} />
          Official
        </Show>
      </div>
      <div class="col-span-2 lg:col-span-1 flex justify-end">
        <Icon class="w-7 mx-2 text-gray-400" path={chevronRight} />
      </div>
    </a>
  </li>
);

const Resources: Component<ResourcesDataProps> = (props) => {
  const fs = new Fuse(props.list, {
    keys: ['author', 'title', 'categories', 'keywords', 'link', 'description'],
    threshold: 0.3,
  });
  const [keyword, setKeyword] = createSignal('');
  const [filtered, setFiltered] = createStore({
    // Produces a base set of filtered results
    resources: createMemo(() => {
      if (keyword() == '') {
        return props.list;
      }
      return fs.search(keyword()).map((result) => result.item);
    }),
    // Currently user enabled filters
    enabledTypes: [] as ResourceType[],
    enabledCategories: [] as ResourceCategory[],
    // Final list produces that applies enabled types and categories
    get list(): Array<Resource> {
      return this.resources().filter((item) => {
        if (this.enabledTypes.length !== 0) {
          return this.enabledTypes.indexOf(item.type) !== -1;
        } else if (this.enabledCategories.length !== 0) {
          return this.enabledCategories.filter((cat) => item.categories.includes(cat)).length !== 0;
        }
        return true;
      });
    },
    // Retrieve a list categories that have resources
    get categories() {
      return (this.resources() as Resource[]).reduce<ResourceCategory[]>(
        (memo, resource) => [...memo, ...resource.categories],
        [],
      );
    },
    // Retrieve a list of type counts
    get counts() {
      return (this.resources() as Resource[]).reduce<{ [key: string]: number }>(
        (memo, resource) => ({
          ...memo,
          [resource.type]: memo[resource.type] ? memo[resource.type] + 1 : 1,
        }),
        {},
      );
    },
  });
  return (
    <div class="flex flex-col relative">
      <Nav showLogo />
      <Header title="Resources" />
      <div class="md:grid md:grid-cols-12 container p-5 gap-6 relative">
        <div class="md:col-span-5 lg:col-span-3 overflow-auto  p-5 md:sticky md:top-20 rounded md:h-[82vh]">
          <div class="text-xs bg-gray-50 p-4 border rounded">
            To have your SolidJS related project listed here reach out to us on{' '}
            <a class="text-solid-medium" href="https://discord.com/invite/solidjs">
              {' '}
              Discord
            </a>
            .
          </div>
          <input
            class="my-5 rounded border-solid w-full border-gray-200 placeholder-opacity-25 placeholder-gray-500"
            placeholder="Search resources"
            onInput={(evt) => setKeyword(evt.currentTarget!.value)}
            type="text"
          />
          <h3 class="text-xl text-solid-default border-b mb-4 font-semibold border-solid pb-2">
            Types
          </h3>
          <div class="flex flex-col space-y-2">
            <For each={Object.entries(ResourceType)}>
              {([name, type]) => (
                <button
                  disabled={!filtered.counts[type]}
                  onClick={() =>
                    setFiltered('enabledTypes', (arr) => {
                      const pos = arr.indexOf(type);
                      if (pos === -1) {
                        return [...arr, type];
                      } else {
                        let newArray = arr.slice();
                        newArray.splice(pos, 1);
                        return newArray;
                      }
                    })
                  }
                  classList={{
                    'opacity-30 cursor-default': !filtered.counts[type],
                    'hover:opacity-60': !!filtered.counts[type],
                    'bg-gray-100': filtered.enabledTypes.indexOf(type) !== -1,
                  }}
                  class="grid grid-cols-5 lg:grid-cols-6 items-center w-full text-sm py-3 text-left border rounded-md"
                >
                  <div class="col-span-1 lg:col-span-2 flex justify-center px-2">
                    <figure class="flex content-center w-9 h-9 p-1.5 bg-solid-medium rounded-full text-white">
                      <Icon class="w-full" path={ResourceTypeIcons[type]} />
                    </figure>
                  </div>
                  <div class="col-span-3 lg:col-span-3">{name}</div>
                  <div class="col-span-1 text-center flex-end text-gray-300 text-xs">
                    <Show when={filtered.counts[type]} fallback={0}>
                      {filtered.counts[type]}
                    </Show>
                  </div>
                </button>
              )}
            </For>
          </div>
          <h3 class="text-xl mt-8 text-solid-default border-b font-semibold border-solid pb-2">
            Categories
          </h3>
          <For each={Object.entries(ResourceCategory).sort()}>
            {([name, id]) => {
              const exists = filtered.categories.indexOf(id) !== -1;
              return (
                <button
                  onClick={() =>
                    setFiltered('enabledCategories', (arr) => {
                      const pos = arr.indexOf(id);
                      if (pos === -1) {
                        return [...arr, id];
                      } else {
                        let newArray = arr.slice();
                        newArray.splice(pos, 1);
                        return newArray;
                      }
                    })
                  }
                  classList={{
                    'opacity-20 cursor-default': !exists,
                    'hover:opacity-60': exists,
                    'bg-gray-50': filtered.enabledCategories.indexOf(id) !== -1,
                  }}
                  class="block w-full text-sm py-4 pl-4 text-left border-b"
                >
                  <span>{name.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}</span>
                </button>
              );
            }}
          </For>
        </div>
        <div class="md:col-span-7 lg:col-span-9">
          <Show
            when={filtered.list.length !== 0}
            fallback={<div class="p-10 text-center">No resources found.</div>}
          >
            <ul>
              <For each={filtered.list}>{(resource) => <ContentRow {...resource} />}</For>
            </ul>
          </Show>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
