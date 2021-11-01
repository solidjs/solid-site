import { createResource } from 'solid-js';
import { RouteDataFunc } from 'solid-app-router';
import { list } from './Blog.data';

const fetchBlogMarkdown = async (slug: string) => (await fetch(`/articles/${slug}.md`)).text();

export const BlogArticleData: RouteDataFunc = (props) => {
  const [article] = createResource(() => props.params.slug, fetchBlogMarkdown);
  return {
    get loading() {
      return article.loading;
    },
    get details() {
      return list[props.params.slug];
    },
    get article() {
      return article();
    },
  };
};
