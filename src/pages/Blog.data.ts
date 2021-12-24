import { RouteDataFunc } from 'solid-app-router';
import { list } from './Articles/articles';

export const BlogData: RouteDataFunc = () => {
  return {
    get articles() {
      return list;
    },
    get archive() {
      return true;
    },
  };
};
