import { type Component, For } from 'solid-js';
import Footer from '../components/Footer';
import { A } from '@solidjs/router';
import { Title } from '@solidjs/meta';
import { useRouteReadyState } from '../utils/routeReadyState';
import type { BlogData } from './Blog.data';

const Blog: Component<{ data: BlogData }> = (props) => {
  const data = props.data;

  useRouteReadyState();

  const sortedArticles = Object.entries(data.articles).sort(
    (entry1, entry2) => entry2[1].date - entry1[1].date,
  );

  return (
    <div class="flex flex-col">
      <Title>Blog | SolidJS</Title>
      <div class="my-2 lg:my-10 pt-5 pb-10 px-3 lg:px-12 container">
        <div class="mb-10 lg:flex justify-center">
          <div class="space-y-10">
            <For each={sortedArticles}>
              {([id, article]) => (
                <A
                  href={`/blog/${id}`}
                  class="block px-3 lg:px-0 text-md mx-auto mb-10 pb-10 text-center"
                >
                  <img alt="article poster" class="lg:w-4/6 mx-auto rounded-md mb-10 shadow-md" src={article.img} />
                  <h1 class="text-xl lg:text-2xl mb-3 font-semibold text-solid-medium dark:text-solid-darkdefault">
                    {article.title}
                  </h1>
                  <span class="text-md">{article.description}</span>
                  <div class="text-xs mt-3">
                    By {article.author} on {new Date(article.date).toDateString()}
                  </div>
                </A>
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
