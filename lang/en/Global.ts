
const name = 'English';
const locale = 'en-US';
const nav = [
  { title: 'Get Started', path: '/guide' },
  { title: 'Docs', path: '/docs/latest/api' },
  { title: 'Resources', path: '/resources' },
  { title: 'Tutorial', path: '/tutorial' },
  { title: 'Examples', path: '/examples' },
  { title: 'Playground', path: 'https://playground.solidjs.com', external: true },
  { title: 'Media', path: '/media' },
];

const footer = {
  declaration: "Solid is an open-source project supported by a team of public contributors. It's distributed under an MIT license. This library and community are made possible by a core team and dedicated contributors.",
  updated: 'Last updated {{date}} on Solid v{{version}}',
};

export default function() {
  return {
    name,
    locale,
    ...nav,
    ...footer,
  };
};
