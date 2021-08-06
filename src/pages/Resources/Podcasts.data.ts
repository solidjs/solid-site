import { Resource, ResourceCategory, ResourceType } from '../Resources';

const podcasts: Array<Resource> = [
  {
    title: 'The Runtime: SolidJS',
    link: 'https://runtimepodcast.com/#7',
    description: 'Rafael is joined by Ryan Carniato, the Author of SolidJS, a frontend reactive UI library.',
    author: 'Runtime',
    author_url: 'https://www.runtimepodcast.com',
    keywords: ['runtime', 'rafael'],
    type: ResourceType.Podcast,
    categories: [ResourceCategory.Educational],
  },
  {
    title: 'React vs Svelte vs Solid & MicroFrontends',
    link: 'https://show.nikoskatsikanis.com/episodes/ryan-carniato',
    description: 'We talk about the hard choices all companies are facing right now with their websites, especially with the choices and performance.',
    author: 'The Nikos Show (Nikos Katsikanis)',
    author_url: 'https://www.youtube.com/c/QuantumInformation',
    keywords: ['nikos'],
    type: ResourceType.Podcast,
    categories: [ResourceCategory.Educational],
  },
];

export default podcasts;
