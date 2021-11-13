import { Component, For } from 'solid-js';
import Footer from '../../components/Footer';
import { useI18n } from '@solid-primitives/i18n';
import { useData, NavLink } from 'solid-app-router';
import { BlogInfo } from './index.data';
import { useRouteReadyState } from '../../utils/routeReadyState';

const Blog: Component = () => {
  const [t] = useI18n();
  const data = useData<{
    article: string;
    loading: boolean;
    details: BlogInfo;
    archive: boolean;
    articles: { [id: string]: BlogInfo };
  }>();
  useRouteReadyState();
  return (
    <div class="flex flex-col">
      <div class="my-2 lg:my-10 pt-5 pb-10 px-3 lg:px-12 container">
        <div class="mb-10 lg:flex justify-center">
          <div class="space-y-10">
            <For each={Object.entries(data.articles)}>
              {([id, article]: [string, BlogInfo]) => (
                <NavLink
                  href={`/blog/${id}`}
                  class="block px-3 lg:px-0 text-md mx-auto mb-10 pb-10 text-center"
                >
                  <img class="lg:w-4/6 mx-auto rounded-md mb-10 shadow-md" src={article.img} />
                  <h1 class="text-xl lg:text-2xl mb-3 font-semibold text-solid-medium">
                    {article.title}
                  </h1>
                  <span class="text-md">{article.description}</span>
                  <div class="text-xs mt-3">
                    By {article.author} on {new Date(article.date).toDateString()}
                  </div>
                </NavLink>
              )}
            </For>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
