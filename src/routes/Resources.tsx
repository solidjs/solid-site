import { Component, For, Show, createSignal, createMemo } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useRouteData, useSearchParams } from '@solidjs/router';
import Footer from '~/components/Footer';
import { Resource, ResourceType, ResourceTypeIcons, PackageType } from '~/resources/Ecosystem';
import { ResourcesDataProps } from './Resources.data';
import Fuse from 'fuse.js';
import { Icon } from 'solid-heroicons';
import { chevronRight, chevronLeft, shieldCheck, filter } from 'solid-heroicons/outline';
import { useI18n } from '@solid-primitives/i18n';
import { createCountdown } from '@solid-primitives/date';
import { makeIntersectionObserver } from '@solid-primitives/intersection-observer';
import { debounce } from '@solid-primitives/scheduled';
import Dismiss from 'solid-dismiss';
import { useRouteReadyState } from '~/utils/routeReadyState';
import { parseKeyword } from '~/utils/parseKeyword';
import { rememberSearch } from '~/utils/rememberSearch';

const AResource: Component<Resource> = (props) => {
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
    <li class="py-6 border-b text-left dark:border-solid-darkLighterBg hover:bg-gray-50 dark:hover:bg-gray-700 duration-100">
      <div class="relative grid grid-cols-10 md:grid-cols-12 grid-flow-col gap-2 text-solid">
        <div class="col-span-2 md:col-span-3 lg:col-span-1 flex items-center justify-center">
          <figure class="flex justify-center content-center w-11 h-11 md:w-14 md:h-14 p-1.5 border-4 border-solid-medium dark:border-solid-darkdefault rounded-full text-white flex-shrink-0">
            <Icon
              class="text-solid-medium dark:text-solid-darkdefault w-5/6"
              path={ResourceTypeIcons[props.type]}
            />
          </figure>
        </div>
        <div class="col-start-3 col-end-[-1] md:col-span-7 lg:col-span-10 items-center">
          <a rel="noopener" href={props.link} target="_blank">
            <div dir="ltr">
              <div class="text-lg">{props.title}</div>
              <Show when={props.description != ''}>
                <div class="text-xs mt-2 text-black dark:text-white mb-3 block">
                  {props.description}
                </div>
              </Show>
              <Show when={props.author && !props.author_url}>
                <div class="text-xs mt-3 text-gray-500 dark:text-gray-300 block">
                  {t('resources.by')} {props.author}
                </div>
              </Show>
            </div>
          </a>
          <Show when={props.author && props.author_url}>
            <div class="rtl:text-right">
              <a
                rel="noopener"
                href={props.author_url}
                target="_blank"
                class="text-xs text-gray-500 dark:text-gray-300 inline hover:text-solid-medium"
              >
                {t('resources.by')} {props.author}
              </a>
            </div>
            <Show when={props.published_at}>
              <div class="rtl:text-right text-xs text-gray-400 block">
                {t('resources.published', {}, 'Published')} {published.toDateString()}
                <Show when={days! < 60}>
                  <span class="text-gray-300"> - {publish_detail()}</span>
                </Show>
              </div>
            </Show>
          </Show>
        </div>
        <div class="absolute top-[-18px] right-0 text-[14px] md:text-base md:static col-span-1 flex items-center text-solid-light">
          <Show when={props.official}>
            <Icon class="relative top-[-2px] w-4 md:top-0 md:w-7 mr-2" path={shieldCheck} />
            {t('resources.official')}
          </Show>
        </div>
        <div class="hidden col-span-2 lg:col-span-1 md:flex justify-end">
          <Icon class="ltr:hidden w-7 mx-2 text-gray-400" path={chevronLeft} />
          <Icon class="rtl:hidden w-7 mx-2 text-gray-400" path={chevronRight} />
        </div>
      </div>
    </li>
  );
};

const Resources: Component = () => {
  const [t] = useI18n();
  const data = useRouteData<ResourcesDataProps>();
  const fs = new Fuse(data.list, {
    keys: ['author', 'title', 'categories', 'keywords', 'link', 'description'],
    threshold: 0.3,
  });
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = createSignal(parseKeyword(searchParams.search || ''));
  const debouncedKeyword = debounce((str: string) => setKeyword(str), 250);
  rememberSearch(keyword);
  const resources = createMemo(() => {
    if (keyword() == '') {
      return data.list;
    }
    return fs.search(keyword()).map((result) => result.item);
  });
  const [filtered, setFiltered] = createStore({
    // Produces a base set of filtered results
    resources,
    // Currently user enabled filters
    enabledTypes: [] as (ResourceType | PackageType)[],
    // Final list produces that applies enabled types and categories
    get list() {
      const filtered = resources().filter((item) => {
        if (this.enabledTypes.length !== 0) {
          return this.enabledTypes.indexOf(item.type) !== -1;
        }
        return true;
      });
      filtered.sort((b, a) => (a.published_at || 0) - (b.published_at || 0));
      return filtered;
    },
    // Retrieve a list of type counts
    get counts() {
      return resources().reduce<{ [key: string]: number }>(
        (memo, resource) => ({
          ...memo,
          [resource.type]: memo[resource.type] ? memo[resource.type] + 1 : 1,
        }),
        {},
      );
    },
  });
  const [toggleFilters, setToggleFilters] = createSignal(false);
  const [stickyBarActive, setStickyBarActive] = createSignal(false);
  const floatingPosScrollY = 220;
  let menuButton!: HTMLButtonElement;
  let firstLoad = true;

  useRouteReadyState();

  const { add: intersectionObserver } = makeIntersectionObserver([], ([entry]) => {
    if (firstLoad) {
      firstLoad = false;
      return;
    }
    setStickyBarActive(!entry.isIntersecting);
  });
  intersectionObserver;

  const onClickFiltersBtn = () => {
    if (window.scrollY >= floatingPosScrollY) return;
    window.scrollTo({ top: floatingPosScrollY });
  };

  const filtersClickScrollToTop = () => {
    const top = toggleFilters() ? floatingPosScrollY : 0;
    window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <div class="flex flex-col relative">
      <div class="md:grid md:grid-cols-12 container p-5 gap-6 relative">
        <div class="py-5 md:col-span-5 lg:col-span-3 md:overflow-auto md:p-5 md:sticky md:top-20 rounded md:h-[calc(100vh-80px)]">
          <div
            class="text-xs bg-gray-100 dark:bg-solid-darkLighterBg p-4 rounded"
            innerHTML={t('resources.cta')}
          ></div>
          <div class="hidden md:block">
            <input
              class="my-5 rounded border-solid w-full border-gray-400 border bg-transparent p-3 placeholder-opacity-50 placeholder-gray-500 dark:placeholder-white"
              placeholder={t('resources.search')}
              value={keyword()}
              onInput={(evt) => debouncedKeyword(evt.currentTarget.value)}
              onChange={(evt) => setKeyword(evt.currentTarget.value)}
              type="text"
            />
            <h3 class="text-xl text-solid-default dark:text-solid-darkdefault dark:border-solid-darkLighterBg border-b mb-4 font-semibold border-solid pb-2">
              {t('resources.types')}
            </h3>
            <div class="flex flex-col space-y-2">
              <For each={Object.entries(ResourceType)}>
                {([name, type]) => (
                  <button
                    disabled={!filtered.counts[type]}
                    onClick={() => {
                      filtersClickScrollToTop();
                      setFiltered('enabledTypes', (arr) => {
                        const pos = arr.indexOf(type);
                        if (pos === -1) {
                          return [...arr, type];
                        } else {
                          const newArray = arr.slice();
                          newArray.splice(pos, 1);
                          return newArray;
                        }
                      });
                    }}
                    classList={{
                      'opacity-30 cursor-default': !filtered.counts[type],
                      'hover:opacity-60': !!filtered.counts[type],
                      'bg-gray-100 dark:bg-gray-700': filtered.enabledTypes.indexOf(type) !== -1,
                    }}
                    class="grid grid-cols-5 lg:grid-cols-6 items-center w-full text-sm py-3 text-left border rounded-md dark:border-solid-darkLighterBg"
                  >
                    <div class="col-span-1 lg:col-span-2 flex justify-center px-2">
                      <figure class="flex justify-center content-center w-10 h-10 p-1.5 border-4 border-solid rounded-full text-white flex-shrink-0">
                        <Icon
                          class="text-solid-medium dark:text-solid-darkdefault w-5/6"
                          path={ResourceTypeIcons[type]}
                        />
                      </figure>
                    </div>
                    <div class="col-span-3 rtl:text-right lg:col-span-3">
                      {t(`resources.types_list.${name.toLowerCase()}`, {}, name)}
                    </div>
                    <div class="col-span-1 text-center flex-end text-gray-400 text-xs">
                      <Show when={filtered.counts[type]} fallback={0}>
                        {filtered.counts[type]}
                      </Show>
                    </div>
                  </button>
                )}
              </For>
            </div>
          </div>
        </div>

        <div class="md:hidden sticky z-10 top-[60px] py-3 pt-4 bg-white w-[calc(100%+40px)] -ml-5">
          <div
            class="absolute h-full top-0 left-3 right-3 rounded-[12%] bg-white z-negative"
            classList={{
              'shadow-md': stickyBarActive(),
            }}
          ></div>
          <div class="absolute w-full h-full top-0 left-0 bg-white dark:bg-neutral-600 z-negative"></div>
          <div class="h-[45px] px-5 flex justify-between gap-1">
            <div use:intersectionObserver class="absolute top-[-62px] h-0" />
            <input
              class="rounded border border-solid h-full w-full border-gray-400 p-3 placeholder-opacity-50 placeholder-gray-500 dark:bg-gray-500 dark:placeholder-gray-200"
              placeholder={t('resources.search')}
              value={keyword()}
              onInput={(evt) => debouncedKeyword(evt.currentTarget.value)}
              onChange={(evt) => setKeyword(evt.currentTarget.value)}
              type="text"
            />
            <button
              class="lg:hidden h-full w-[45px] flex-shrink-0 border-gray-300 border rounded-lg flex justify-center items-center text-solid-medium dark:text-solid-darkdefault"
              onClick={onClickFiltersBtn}
              ref={menuButton}
            >
              <Icon class="h-7 w-7" path={filter} />
            </button>
          </div>
        </div>
        <Dismiss
          class="relative"
          menuButton={menuButton}
          open={toggleFilters}
          setOpen={setToggleFilters}
          animation={{
            appendToElement: 'menuPopup',
            enterClass: 'translate-y-full',
            enterToClass: 'translate-y-0',
            exitClass: 'translate-y-0',
            exitToClass: 'translate-y-full',
          }}
        >
          <div
            class={
              'fixed top-14 left-0 z-20 py-5 w-full rounded-t-2xl overflow-auto  p-10 shadow-top-2xl border-2 border-gray-100 dark:bg-solid-gray bg-white transition-transform duration-300 lg:border-0 lg:shadow-none lg:p-0 lg:flex-col lg:top-12 lg:sticky lg:flex '
            }
            style={{ height: 'calc(100vh - 8rem)', top: '8rem' }}
          >
            <h3 class="text-xl text-solid-default dark:text-solid-darkdefault border-b mb-4 font-semibold border-solid pb-2">
              {t('resources.types')}
            </h3>
            <div class="flex flex-col space-y-2">
              <For each={Object.entries(ResourceType)}>
                {([name, type]) => (
                  <button
                    disabled={!filtered.counts[type]}
                    onClick={() => {
                      filtersClickScrollToTop();
                      setFiltered('enabledTypes', (arr) => {
                        const pos = arr.indexOf(type);
                        if (pos === -1) {
                          return [...arr, type];
                        } else {
                          const newArray = arr.slice();
                          newArray.splice(pos, 1);
                          return newArray;
                        }
                      });
                    }}
                    classList={{
                      'opacity-30 cursor-default': !filtered.counts[type],
                      'hover:opacity-60': !!filtered.counts[type],
                      'bg-gray-100 dark:bg-gray-700': filtered.enabledTypes.indexOf(type) !== -1,
                    }}
                    class="grid grid-cols-5 lg:grid-cols-6 items-center w-full text-sm py-3 text-left border rounded-md"
                  >
                    <div class="col-span-1 lg:col-span-2 flex justify-center px-2">
                      <figure class="flex justify-center content-center w-10 h-10 p-1.5 border-4 border-solid rounded-full text-white">
                        <Icon
                          class="text-solid-medium dark:text-solid-darkdefault w-5/6"
                          path={ResourceTypeIcons[type]}
                        />
                      </figure>
                    </div>
                    <div class="col-span-3 rtl:text-right lg:col-span-3">
                      {t(`resources.types_list.${name.toLowerCase()}`, {}, name)}
                    </div>
                    <div class="col-span-1 text-center flex-end text-gray-400 text-xs">
                      <Show when={filtered.counts[type]} fallback={0}>
                        {filtered.counts[type]}
                      </Show>
                    </div>
                  </button>
                )}
              </For>
            </div>
          </div>
        </Dismiss>

        <div class="md:col-span-7 lg:col-span-9">
          <Show
            when={filtered.list.length !== 0}
            fallback={<div class="p-10 text-center">No resources found.</div>}
          >
            <ul>
              <For each={filtered.list}>{(resource) => <AResource {...resource} />}</For>
            </ul>
          </Show>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
