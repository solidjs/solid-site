import { RouteDataFunc, useLocation } from 'solid-app-router';

export type BlogInfo = {
  id?: string;
  img: string;
  title: string;
  description: string;
  author: string;
  date: Date
}

const list: { [id: string]: BlogInfo } = {
  'state-of-solid-september-2021': {
    img: '/img/blog/state-of-solid-september-2021/header.png',
    title: 'The State of Solid: September 2021',
    description: 'First edition of a quarterly outline of updates in the Solid project, community and ecosystem.',
    author: 'Ryan Carniato',
    date: new Date()
  },
  'welcome-to-the-solid-blog': {
    img: '/img/blog/welcome-to-the-solid-blog/header.png',
    title: 'Welcome to the Solid blog!',
    description: 'A new Solid based blog with lots of information and helpful details for you to view.',
    author: 'David Di Biase',
    date: new Date()
  }
};

export const BlogData: RouteDataFunc = () => {
  const location = useLocation();
  return {
    get articles() {
      return list;
    },
    get archive() {
      return location.pathname === '/blog';
    },
  };
};
