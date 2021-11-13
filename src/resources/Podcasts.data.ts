import { Resource, ResourceCategory, ResourceType } from '../pages/resources';

const podcasts: Array<Resource> = [
  {
    title: 'The Runtime: SolidJS',
    link: 'https://runtimepodcast.com/#7',
    description:
      'Rafael is joined by Ryan Carniato, the Author of SolidJS, a frontend reactive UI library.',
    author: 'The Runtime',
    author_url: 'https://www.runtimepodcast.com',
    keywords: ['runtime', 'rafael'],
    type: ResourceType.Podcast,
    categories: [ResourceCategory.Educational],
    published_at: 1628272800000,
  },
  {
    title: 'React vs Svelte vs Solid & MicroFrontends',
    link: 'https://show.nikoskatsikanis.com/episodes/ryan-carniato',
    description:
      'We talk about the hard choices all companies are facing right now with their websites, especially with the choices and performance.',
    author: 'The Nikos Show (Nikos Katsikanis)',
    author_url: 'https://www.youtube.com/c/QuantumInformation',
    keywords: ['nikos'],
    type: ResourceType.Podcast,
    categories: [ResourceCategory.Educational],
    published_at: 1627534800000,
  },
  {
    title: 'The Deep Dive Episode 4: Reactive frontend frameworks',
    link: 'https://www.youtube.com/watch?v=iyY1lT8-ZDA',
    description: 'Kos Palchyk and Ryan Carniato do a deep dive into SolidJS.',
    author: 'Lars Gyrup Brink Nielsen',
    author_url: 'https://www.youtube.com/channel/UCsZWzmsdKz2VA49XXBK5TQA',
    keywords: ['nikos'],
    type: ResourceType.Podcast,
    categories: [ResourceCategory.Educational],
    published_at: 1615939200000,
  },
  {
    title: 'SolidJS with Ryan Carniato',
    link: 'https://podrocket.logrocket.com/solidjs',
    description: 'Kos Palchyk and Ryan Carniato do a deep dive into SolidJS.',
    author: 'Ben Edelstein (LogRocket)',
    author_url: 'https://podrocket.logrocket.com/hosts/benedelstein',
    keywords: ['logrocket', 'podrocket'],
    type: ResourceType.Podcast,
    categories: [ResourceCategory.Educational],
    published_at: 1630645200000,
  },
  {
    title: 'FSJam Episode 53 - Solid with Ryan Carniato',
    link: 'https://fsjam.org/episodes/episode-53-solid-with-ryan-carniato',
    description:
      'Discusses the definition of reactive programming, the benefits of building a new framework on JSX.',
    author: 'FSJam',
    author_url: 'https://fsjam.org/',
    keywords: ['fsjam', 'reactivity', 'framework', 'SPA', 'MPA'],
    type: ResourceType.Podcast,
    categories: [ResourceCategory.Educational],
    published_at: 1636741458000,
  },
];

export default podcasts;
