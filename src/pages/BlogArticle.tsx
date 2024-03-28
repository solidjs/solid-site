import { Component, Show, createMemo } from 'solid-js';
import { A } from '@solidjs/router';
import { useRouteReadyState } from '../utils/routeReadyState';
import Footer from '../components/Footer';
import { useAppState } from '../AppContext';
import { YouTube, Tweet, Twitch, Spotify } from 'solid-social';
import type { BlogArticleData } from './BlogArticle.data';

export const BlogArticle: Component<{data:BlogArticleData}> = (props) => {
  const data = props.data;
  const ctx = useAppState();

  useRouteReadyState();
  const chevron = createMemo(() => (ctx.dir == 'rtl' ? 'chevron-right' : 'chevron-left'));

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
                  <h1 class="text-4xl font-semibold mt-10 text-solid-medium dark:text-solid-darkdefault">
                    {data.details.title}
                  </h1>
                  <div class="text-md">
                    Posted by{' '}
                    <a target="_blank" rel="noopener" href={data.details.author_url}>
                      {data.details.author}
                    </a>{' '}
                    on {new Date(data.details.date).toDateString()}
                  </div>
                </div>
                <hr class="mt-10 w-3/6 mx-auto" />
                <article class="my-10 prose dark:prose-invert mx-auto">
                  {data.article && (
                    <data.article
                      components={{
                        Tweet: (props) => (
                          <Tweet {...props} theme={ctx.isDark ? 'dark' : 'light'} align="center" />
                        ),
                        YouTube,
                        Twitch: (props) => <Twitch {...props} parent={location.hostname} />,
                        Spotify: (props) => (
                          <Spotify {...props} theme={ctx.isDark ? 'dark' : undefined} />
                        ),
                      }}
                    />
                  )}
                </article>
                <hr class="mt-10 w-3/6 mx-auto" />
                <div class="flex flex-row justify-center mt-10">
                  <A href="/blog">
                    <figure class={`inline-block chevron ${chevron()}`} /> Back to the SolidJS Blog
                  </A>
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
