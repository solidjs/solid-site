import { Component, For, Show, createSignal, createMemo, onMount, JSX } from 'solid-js';
import { useNavigate, useRouteData, useSearchParams } from '@solidjs/router';
import { PackagesDataProps } from './index.data';
import Fuse from 'fuse.js';
import { debounce } from '@solid-primitives/scheduled';
import { useI18n } from '@solid-primitives/i18n';
import { makeIntersectionObserver } from '@solid-primitives/intersection-observer';
import {
  Resource,
  ResourceCategory,
  ResourceCategoryName,
  ResourceType,
  ResourceTypeIcons,
} from '~/resources/Ecosystem';
import { parseKeyword } from '~/utils/parseKeyword';
import { rememberSearch } from '~/utils/rememberSearch';
import SideContent from '~/components/layout/SideContent';
import { Icon } from 'solid-heroicons';
import { createCountdown } from '@solid-primitives/date';
import { shieldCheck } from 'solid-heroicons/solid';
import { externalLink } from 'solid-heroicons/outline';

const FilterButton: Component<{
  onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  active: boolean;
  name: string;
  count: number;
  type?: ResourceType;
}> = (props) => (
  <>
    <button
      onClick={props.onClick}
      classList={{
        'opacity-20 cursor-default': !props.active,
        'hover:opacity-60': props.active,
      }}
      class="flex items-center w-full text-sm px-4 py-2 min-h-[50px] text-left border border-gray-400 rounded"
    >
      <Show when={props.type}>
        <figure class="flex justify-center content-center -ml-2 mr-2 w-10 h-10 p-1.5 border-4 border-solid rounded-full text-white flex-shrink-0">
          <Icon
            class="text-solid-medium dark:text-solid-darkdefault w-5/6"
            path={ResourceTypeIcons[props.type!]}
          />
        </figure>
      </Show>
      <span>{props.name}</span>
      <span class="ml-auto text-center flex-end text-gray-400 text-xs">{props.count}</span>
    </button>
  </>
);

const ResourceLink: Component<Resource> = (props) => {
  const [t] = useI18n();
  const now = new Date();
  const published = new Date(0);
  published.setTime(props.published_at || 0);
  const { days, hours } = createCountdown(published, now);
  const publish_detail = () => {
    if (days! > 1) {
      return t('resources.days_ago', { amount: days!.toString() }, '{{amount}} days ago') as string;
    }
    return t(
      'resources.hours_ago',
      { amount: hours!.toString() },
      '{{amount}} hours ago',
    ) as string;
  };

  return (
    <a
      target="_blank"
      href={props.link}
      rel="nofollow"
      class="border border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded px-3.5 py-3 min-h-[144px] flex flex-col"
    >
      <div class="flex items-center">
        <figure class="flex justify-center content-center w-10 h-10 md:w-14 md:h-14 p-1.5 border-4 border-solid-medium rounded-full text-white flex-shrink-0">
          <Icon
            class="text-solid-medium dark:text-solid-darkdefault w-5/6"
            path={ResourceTypeIcons[props.type]}
          />
        </figure>
        <h1 class="pl-3 break-all">{props.title}</h1>
        <Icon
          class="min-w-[28px] w-7 self-start ml-auto text-solid-default dark:text-solid-darkdefault"
          path={externalLink}
        />
      </div>
      <p class="text-xs py-2">{props.description}</p>
      <div class="mt-auto flex items-center place-content-between">
        <div>
          <Show when={props.author && props.author_url}>
            <a
              rel="noopener"
              href={props.author_url}
              target="_blank"
              class="text-xs text-gray-500 dark:text-gray-300 inline hover:text-solid-medium"
            >
              {t('resources.by')} {props.author}
            </a>
          </Show>
          <Show when={props.published_at}>
            <div class="rtl:text-right text-xs text-gray-400 block">
              {t('resources.published', {}, 'Published')} {published.toDateString()}
              <Show when={days! < 60}>
                <span class="text-gray-300"> - {publish_detail()}</span>
              </Show>
            </div>
          </Show>
        </div>

        <Show when={props.official}>
          <div class="flex rounded bg-solid-light dark:bg-solid-default text-white font-medium w-min p-1 pr-2 self-end">
            <Icon class="w-4 mr-1" path={shieldCheck} />
            <span class="text-xs">{t('resources.official')}</span>
          </div>
        </Show>
      </div>
    </a>
  );
};

const Packages: Component = () => {
  const [t] = useI18n();
  const data = useRouteData<PackagesDataProps>();
  const fs = new Fuse(data.list, {
    keys: ['author', 'title', 'categories', 'keywords', 'link', 'description'],
    threshold: 0.3,
  });

  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = createSignal(parseKeyword(searchParams.search || ''));
  const debouncedKeyword = debounce((str: string) => setKeyword(str), 250);
  rememberSearch(keyword);

  // Produces a base set of filtered results
  const resources = createMemo<Resource[]>(() => {
    if (keyword() == '') {
      return data.list;
    }
    return fs.search(keyword()).map((result) => result.item);
  });

  // Retrieve a map from categories to array of resources
  const byCategory = createMemo(() => {
    const map: Partial<Record<ResourceCategory, Resource[]>> = {};
    for (const resource of resources()) {
      for (const category of resource.categories) {
        const cat = map[category];
        if (cat) {
          cat.push(resource);
        } else {
          map[category] = [resource];
        }
      }
    }
    return map;
  });

  const [toggleFilters, setToggleFilters] = createSignal(false);
  const [stickyBarActive, setStickyBarActive] = createSignal(false);
  let firstLoad = true;

  const { add: intersectionObserver } = makeIntersectionObserver([], ([entry]) => {
    if (firstLoad) {
      firstLoad = false;
      return;
    }
    setStickyBarActive(!entry.isIntersecting);
  });
  intersectionObserver;

  const navigate = useNavigate();
  const scrollToCategory = (category: ResourceCategory) => {
    setToggleFilters(false);
    const url = globalThis.location;
    navigate(`${url.pathname}${url.search}#${category}`, { scroll: false });
    document.getElementById(category)?.scrollIntoView(true);
  };

  onMount(() => {
    const hash = globalThis.location.hash.replace(/^#/, '');
    if (!hash) return;
  });

  return (
    <SideContent
      toggleVisible={toggleFilters}
      setToggleVisible={setToggleFilters}
      aside={
        <div class="lg:m-6">
          <div
            class="text-xs dark:bg-solid-darkLighterBg p-4 rounded border border-gray-400"
            innerHTML={t('resources.cta')}
          />
          <input
            class="my-5 rounded border-solid w-full border border-gray-400 bg-white dark:bg-solid-darkgray p-3 placeholder-opacity-50 placeholder-gray-500 dark:placeholder-white"
            placeholder={t('resources.search')}
            value={keyword()}
            onInput={(evt) => debouncedKeyword(evt.currentTarget.value)}
            onChange={(evt) => setKeyword(evt.currentTarget.value)}
            type="text"
          />
          <h3 class="text-xl mt-8 text-solid-default dark:text-solid-darkdefault border-b dark:border-gray-500 font-semibold border-solid pb-2">
            {t('resources.categories')}
          </h3>
          <div class="mt-3 space-y-2">
            <For each={Object.entries(ResourceCategory).sort()}>
              {([name, id]) => (
                <FilterButton
                  name={t(`resources.categories_list.${id.toLowerCase()}`, {}, name)}
                  count={(byCategory()[id] || []).length}
                  active={!!byCategory()[id]}
                  onClick={[scrollToCategory, id]}
                />
              )}
            </For>
          </div>
        </div>
      }
      content={
        <>
          <div use:intersectionObserver class="absolute top-0" />
          <div
            class="block lg:hidden text-xs bg-gray-100 dark:bg-solid-darkLighterBg p-4 rounded"
            innerHTML={t('resources.cta')}
          />
          <div class="block lg:hidden sticky top-16 bg-white dark:bg-solid-darkbg">
            <input
              class="mt-14 sm:mt-5 mb-3 rounded border-solid w-full border border-gray-400 bg-white dark:bg-solid-darkgray p-3 placeholder-opacity-50 placeholder-gray-500 dark:placeholder-white mr-3"
              placeholder={t('resources.search')}
              value={keyword()}
              onInput={(evt) => debouncedKeyword(evt.currentTarget.value)}
              onChange={(evt) => setKeyword(evt.currentTarget.value)}
              type="text"
            />
            <div
              class="relative h-2"
              classList={{
                'shadow-md': stickyBarActive(),
              }}
            />
          </div>
          <Show
            when={resources().length}
            fallback={<div class="p-10 text-center">No resources found.</div>}
          >
            <For each={Object.entries(byCategory()).sort()}>
              {([category, resources]) => (
                <>
                  <h3
                    class="text-2xl mt-8 first-of-type:mt-0 mb-5 text-solid-default dark:text-solid-darkdefault dark:border-solid-darkLighterBg border-b font-semibold border-solid pb-2"
                    id={category}
                  >
                    {t(
                      `resources.categories_list.${category.toLowerCase()}`,
                      {},
                      ResourceCategoryName[category],
                    )}
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <For each={resources}>{(resource) => <ResourceLink {...resource} />}</For>
                  </div>
                </>
              )}
            </For>
          </Show>
        </>
      }
    />
  );
};

export default Packages;
