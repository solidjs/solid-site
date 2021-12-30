import { RouteDataFunc } from 'solid-app-router';

export const list: { [key: string]: BlogInfo } = {
  'state-of-solid-september-2021': {
    img: '/img/blog/state-of-solid-september-2021/header.png',
    title: 'The State of Solid: September 2021',
    description:
      'First edition of a quarterly outline of updates in the Solid project, community and ecosystem.',
    author: 'Ryan Carniato',
    author_url: 'https://www.github.com/ryansolid',
    date: 1632960565000,
    // @ts-ignore
    body: async () => await import('./Articles/state-of-solid-september-2021.mdx'),
  },
};

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
