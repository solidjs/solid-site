import { Component, Show, createMemo } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { useData, NavLink } from 'solid-app-router';
import { useRouteReadyState } from '../routeReadyState';
import SolidMarkdown from 'solid-markdown';
import { BlogInfo } from './Blog.data';
import Footer from '../components/Footer';

export const BlogArticle: Component = () => {
  const [t] = useI18n();
  const data = useData<{
    article: string;
    loading: boolean;
    details: BlogInfo;
    archive: boolean;
    articles: { [id: string]: BlogInfo };
  }>();
  useRouteReadyState();
  const chevron = createMemo(() =>
    t('global.dir', {}, 'ltr') == 'rtl' ? 'chevron-right' : 'chevron-left',
  );
  return (
    <div class="flex flex-col">
      <div class="my-2 lg:my-10 pt-5 pb-10 px-3 lg:px-12 container">
        <div class="mb-10 lg:flex justify-center">
          <div class="space-y-10 px-4 lg:px-0">
            <Show
              fallback={<div class="text-center p-10 m-10">Loading article...</div>}
              when={!data.loading}
            >
              <div class="container lg:px-10">
                <div class="text-center space-y-5">
                  <img class="rounded-md mb-10 shadow-md" src={data.details.img} />
                  <h1 class="text-4xl font-semibold mt-10 text-solid-medium">
                    {data.details.title}
                  </h1>
                  <div class="text-md">
                    Posted by <a href="https://github.com/davedbase">{data.details.author}</a> on{' '}
                    {new Date(data.details.date).toDateString()}
                  </div>
                </div>
                <hr class="mt-10 w-3/6 mx-auto" />
                <article class="my-10 prose mx-auto">
                  <SolidMarkdown children={data.article} />
                </article>
                <hr class="mt-10 w-3/6 mx-auto" />
                <div class="flex flex-row justify-center mt-10">
                  <NavLink href="/blog">
                    <figure class={`inline-block chevron ${chevron()}`} /> Back to the SolidJS Blog
                  </NavLink>
                </div>
              </div>
            </Show>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogArticle;
