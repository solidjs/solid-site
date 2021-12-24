import { Component, Show, createMemo, onMount } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { useData, NavLink } from 'solid-app-router';
import { useRouteReadyState } from '../utils/routeReadyState';
import { createScriptLoader } from '@solid-primitives/script-loader';
import Footer from '../components/Footer';

const Twitter: Component<{ id: string }> = (props) => {
  let divRef: HTMLDivElement;
  const displayTweet = () => {
    window.twttr.widgets.createTweet(props.id, divRef, { align: 'center',  });
  };
  onMount(() => {
    if (! window.twttr) {
      console.log('loading');
      createScriptLoader({
        src: 'https://platform.twitter.com/widgets.js',
        onload: displayTweet
      });
    } else {
      displayTweet();
    }
  })
  return <div ref={divRef} class="text-center p-4" />;
};

const YouTube: Component<{ id: string }> = (props) => {
  return (
    <iframe
      class="mx-auto my-5"
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${props.id}`}
      frame-border="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  );
};

export const BlogArticle: Component = () => {
  const [t] = useI18n();
  const data = useData<{
    loading: boolean;
    slug: string;
    details: BlogInfo;
    archive: boolean;
    article: Component;
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
                    Posted by{' '}
                    <a
                      target="_blank"
                      rel="noopener"
                      href={data.details.author_url}
                      >
                        {data.details.author}
                    </a> on{' '}
                    {new Date(data.details.date).toDateString()}
                  </div>
                </div>
                <hr class="mt-10 w-3/6 mx-auto" />
                <article class="my-10 prose mx-auto">
                  <data.article
                    components={{
                      Twitter,
                      YouTube
                    }}
                  />
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
