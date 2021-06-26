import type { GraphData } from '../components/Benchmarks';

const js_framework = {
  id: 'js-framework-benchmark',
  name: 'JS Framework Benchmark',
  description:
    'The JS Framework Benchmark compares browser performance across a wide range of tests. Lower is better.',
  link: 'https://github.com/krausest/js-framework-benchmark',
  data: [
    {
      label: 'Vanilla',
      score: 1,
    },
    {
      label: 'Solid 1.0.0',
      active: true,
      score: 1.05,
    },
    {
      label: 'Inferno 7.4.8',
      score: 1.20,
    },
    {
      label: 'Svelte 3.37.9',
      score: 1.27,
    },
    {
      label: 'Preact 10.5.12',
      score: 1.42,
    },
    {
      label: 'Vue 3.0.6',
      score: 1.54,
    },
    {
      label: 'React 17.0.1',
      score: 1.93,
    },
    {
      label: 'Angular 12.0.1',
      score: 1.93,
    },
    {
      label: 'Ember 3.22.0',
      score: 2.21,
    },
  ],
} as GraphData;

const isomorphic = {
  id: 'isomorphic-benchmark',
  name: 'Isomorphic UI Benchmarks (Search Results)',
  description: 'This benchmark tests raw Server Rendering speeds. Higher is better.',
  link: 'https://github.com/marko-js/isomorphic-ui-benchmarks',
  data: [
    {
      label: 'Solid 1.0.0',
      active: true,
      score: 17110,
    },
    {
      label: 'Inferno 7.4.8',
      score: 3135,
    },
    {
      label: 'Svelte 3.37.8',
      score: 4360,
    },
    {
      label: 'Preact 10.4.8',
      score: 1483,
    },
    {
      label: 'Vue 2.6.12',
      score: 3626,
    },
    {
      label: 'React 16.13.1',
      score: 1038,
    },
    {
      label: 'Marko 5.8.4',
      score: 8421,
    },
  ],
} as GraphData;

export const BenchmarkData = () => [js_framework, isomorphic];
