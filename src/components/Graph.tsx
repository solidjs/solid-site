import type { Component } from 'solid-js';

const data = [
  {
    id: 'marko-color-picker-chrome',
    name: 'Color Picker (Chrome)',
    description: 'This benchmark was created by Marko.js to compare client-side rendering performance of various frameworks – numbers show ops/sec, higher is better.',
    link: 'https://github.com/marko-js/isomorphic-ui-benchmarks',
    data: [
      {
        label: 'Inferno 7.3.2',
        bg: '#dc0030',
        score: 17078
      },
      {
        label: 'Marko.js 4.18.16',
        score: 6008
      },
      {
        label: 'Preact 10.0.1',
        score: 6435
      },
      {
        label: 'React 16.10.2',
        score: 7358
      },
      {
        label: 'Vue 2.6.10',
        score: 4291
      }
    ]
  },
];

const Graph: Component<{}> = (props) => (
  <div>Graph goes here</div>
);

export default Graph;
