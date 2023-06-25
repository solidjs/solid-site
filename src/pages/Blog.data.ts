import { RouteDataFunc } from '@solidjs/router';
import type { Component } from 'solid-js';
import { SpotifyProps, TweetProps, TwitchProps, YouTubeProps } from 'solid-social';

export type MDXComponent = Component<{
  components: {
    Tweet?: Component<TweetProps>;
    Twitch?: Component<TwitchProps>;
    YouTube?: Component<YouTubeProps>;
    Spotify?: Component<SpotifyProps>;
  };
}>;

export type BlogInfo = {
  id?: string;
  img: string;
  title: string;
  description: string;
  author: string;
  author_url: string;
  date: number;
  body: () => Promise<{ default: MDXComponent }>;
};

export const list: { [key: string]: BlogInfo } = {
  'state-of-solid-september-2021': {
    img: '/img/blog/state-of-solid-september-2021/header.png',
    title: 'The State of Solid: September 2021',
    description:
      'First edition of a quarterly outline of updates in the Solid project, community and ecosystem.',
    author: 'Ryan Carniato',
    author_url: 'https://www.github.com/ryansolid',
    date: 1632960565000,
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
    body: async () => await import('./Articles/state-of-solid-march-2022.mdx'),
  },
  'state-of-solid-july-2022': {
    img: '/img/blog/state-of-solid-july-2022/header.png',
    title: 'The State of Solid: July 2022',
    description: 'Second quarter updates about Solid including core.',
    author: 'SolidJS Core',
    author_url: 'https://www.solidjs.com',
    date: 1659299281000,
    body: async () => await import('./Articles/state-of-solid-july-2022.mdx'),
  },
  'solid-fellowships-announcement': {
    img: '/img/blog/solid-fellowships-announcement/header.png',
    title: 'Announcing SolidJS Fellowships',
    description:
      'An exciting new program sponsored by SolidJS and supported by OpenCollective sponsors.',
    author: 'SolidJS Core',
    author_url: 'https://www.solidjs.com',
    date: 1663596000000,
    body: async () => await import('./Articles/solid-fellowships-announcement.mdx'),
  },
  'introducing-solidstart': {
    img: '/img/blog/introducing-solidstart/header.png',
    title: 'Introducing SolidStart: The SolidJS Framework',
    description: 'The official Beta release announcement for the new meta-framework.',
    author: 'SolidJS Core',
    author_url: 'https://www.solidjs.com',
    date: 1668014954000,
    body: async () => await import('./Articles/introducing-solidstart.mdx'),
  },
};

export interface BlogData {
  articles: { [key: string]: BlogInfo };
}

export const BlogData: RouteDataFunc<BlogData> = () => {
  return {
    get articles() {
      return list;
    },
  };
};
