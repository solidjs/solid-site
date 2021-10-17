import { Component, For, Show } from 'solid-js';
import Footer from '../components/Footer';
import { useI18n } from '@solid-primitives/i18n';
import { useData, NavLink } from 'solid-app-router';
import { BlogInfo } from './Blog.data';

const BlogArticle: Component<BlogInfo> = (props) => (
  <NavLink href={`/blog/${props.id}`} class="block text-md mx-auto mb-10 pb-10 text-center">
    <img class="w-4/6 mx-auto rounded-md mb-10 shadow-md" src={props.img} />
    <h1 class="text-2xl mb-3 font-semibold text-solid-medium">{props.title}</h1>
    {props.description}
    <div class="text-xs mt-3">By {props.author}</div>
  </NavLink>
);

const Blog: Component = () => {
  const [t] = useI18n();
  const data = useData<{ archive: boolean; articles: { [id: string]: BlogInfo } }>();
  console.log('body', data.body);
  return (
    <div class="flex flex-col">
      <div class="my-10 pt-5 pb-10 px-3 lg:px-12 container">
        <div class="mb-10 flex justify-center">
          <Show when={data.archive}>
            <div class="space-y-10">
              <For each={Object.entries(data.articles)}>
                {([id, article]: [string, BlogInfo]) => <BlogArticle id={id} {...article} />}
              </For>
            </div>
          </Show>
          <Show when={!data.archive}>
            <div class="container px-10">
              <div class="text-center space-y-5">
                <img class="rounded-md mb-10 shadow-md" src="/img/blog/sample/header.png" />
                <h1 class="text-4xl font-semibold mt-10 text-solid-medium">
                  Introducing the new Solid Community Blog
                </h1>
                <div class="text-md">
                  Posted by <a href="https://github.com/davedbase">David Di Biase</a> on September
                  17, 2021
                </div>
              </div>
              <hr class="mt-10 w-1/6 mx-auto" />
              <article class="mt-10 prose mx-auto">{/* {data.body()} */}</article>
            </div>
          </Show>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
