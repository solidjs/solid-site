import { createResource } from 'solid-js';
import type { RouteLoadFunc } from '@solidjs/router';
import { type BlogInfo, list, type MDXComponent } from './Blog.data';

export interface BlogArticleData {
  loading: boolean;
  slug: string;
  details: BlogInfo;
  article?: MDXComponent;
}

export const BlogArticleData: RouteLoadFunc<BlogArticleData> = (props) => {
  const [article] = createResource(async () => (await list[props.params.slug].body()).default);
  return {
    get slug() {
      return props.params.slug;
    },
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
