import { Resource, ResourceCategory, ResourceType } from '../Resources';

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
  },
];

export default podcasts;
