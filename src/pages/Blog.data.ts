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
  'state-of-solid-december-2021': {
    img: '/img/blog/state-of-solid-december-2021/header.png',
    title: 'The State of Solid: December 2021',
    description:
      'Second edition of a quarterly update on SolidJS including announcements about SolidHack.',
    author: 'SolidJS Core',
    author_url: 'https://www.solidjs.com',
    date: 1640993009000,
    // @ts-ignore
    body: async () => await import('./Articles/state-of-solid-december-2021.mdx'),
  },
  'state-of-solid-march-2022': {
    img: '/img/blog/state-of-solid-march-2022/header.png',
    title: 'The State of Solid: March 2022',
    description:
      'First quarter updates about Solid including core, SolidHack and community growth updates.',
    author: 'SolidJS Core',
    author_url: 'https://www.solidjs.com',
    date: 1648782000000,
    // @ts-ignore
    body: async () => await import('./Articles/state-of-solid-march-2022.mdx'),
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
