import { createResource } from 'solid-js';
import { RouteDataFunc } from 'solid-app-router';
import { list } from './Blog.data';

export const BlogArticleData: RouteDataFunc = (props) => {
  const [article] = createResource(async () => {
    const val = await list[props.params.slug].body();
    return val.default;
  });
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
