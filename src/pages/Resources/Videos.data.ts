import { Resource, ResourceCategory, ResourceType } from '../Resources';

const videos: Array<Resource> = [
  {
    link: 'https://medium.com/@ryansolid/b-y-o-f-part-1-writing-a-js-framework-in-2018-b02a41026929',
    title: 'Solid Video Series',
    description: 'Eric Schmucker walks you through Solid.',
    author: 'Eric Schmucker',
    author_url: 'https://www.youtube.com/user/ericsnowco',
    keywords: [''],
    type: ResourceType.Video,
    categories: [ResourceCategory.Educational],
  },
  {
    link: 'https://medium.com/@ryansolid/b-y-o-f-part-1-writing-a-js-framework-in-2018-b02a41026929',
    title: 'Solid.js - A fast, Declarative, Compiled Web UI Library',
    description: "Zaieste Programming walks you through Solid's web UI solution.",
    author: 'Ryan Carniato',
    keywords: [''],
    type: ResourceType.Video,
    categories: [ResourceCategory.Educational],
  },
  {
    link: 'https://www.youtube.com/watch?v=wu6HvLoi9VQ',
    title: 'How To Convert React Application To SolidJS',
    description: 'Maksim Ivanov walks us through Solid.js and how to use it.',
    author: 'Maksim Ivanov',
    author_url: 'https://www.youtube.com/user/satansdeer1',
    keywords: [''],
    type: ResourceType.Video,
    categories: [ResourceCategory.Educational],
  },
  {
    link: 'https://www.youtube.com/watch?v=Dq5EAcup044',
    title: 'UI Libraries, Improving React.js & Music, with Ryan Carniato, Solid.js Creator',
    description: '',
    author: 'Jakub Neander',
    author_url: 'https://github.com/zaiste',
    keywords: [''],
    type: ResourceType.Video,
    categories: [ResourceCategory.Educational],
  },
  {
    link: 'https://www.youtube.com/watch?v=P8iGK8zYzns',
    title: 'Solid.js - A Fast, Declarative, Compiled Web UI Library - Better than React.js?',
    description:
      'Zaiste Programming discusses three things that makes Solid.js and Snowpack great.',
    author: 'Jakub Neander',
    author_url: 'https://github.com/zaiste',
    keywords: [''],
    type: ResourceType.Video,
    categories: [ResourceCategory.Educational],
  },
  {
    link: 'https://www.youtube.com/watch?v=p8e9ta269x8',
    title: 'React to Solid - Stream With Ryan Carniato',
    description:
      'Maksim Ivanov and Ryan Carniato take an existing React application and try to rewrite it using the Solid framework.',
    author: 'Maksim Ivanov',
    author_url: 'https://www.youtube.com/user/satansdeer1',
    keywords: [''],
    type: ResourceType.Video,
    categories: [ResourceCategory.Educational],
  },
  {
    link: 'https://www.youtube.com/watch?v=-CymMzGwzP8',
    title: 'Looking at solid.js',
    description: "Looking at solid.js, a new library for reactive web UI's.",
    keywords: [''],
    type: ResourceType.Video,
    categories: [ResourceCategory.Educational],
  },
  {
    link: 'https://www.youtube.com/watch?v=P-AGz3U8lFY',
    title: 'Learning SolidJS',
    description:
      'Alex takes a first look, building a color transformation tool and dad joke search app in the process.',
    keywords: [''],
    author: 'uidotdev',
    author_url: 'https://www.youtube.com/channel/UCbAn7pVK2VIyo-UysfWGdZQ',
    type: ResourceType.Video,
    categories: [ResourceCategory.Educational],
  },
  {
    link: 'https://www.youtube.com/watch?v=_ne2BsvFBH0',
    title: 'Solid.js - the NEXT React? In-depth code analysis.',
    description:
      "A super in-depth code conversation about the inner-workings of Solid.js from a React developer's perspective.",
    keywords: [''],
    author: 'Sawtaytoes',
    author_url: 'https://www.youtube.com/channel/UCDezHlQN79VWarlRgvmim-w',
    type: ResourceType.Video,
    categories: [ResourceCategory.Educational],
  },
];

export default videos;
