import type { GraphData } from '../components/Benchmarks';

const js_framework = {
  id: 'js-framework-benchmark',
  name: 'JS Framework Benchmark',
  description:
    'The JS Framework Benchmark compares browser performance across a wide range of tests. Chrome 117 dataset. Lower is better.',
  link: 'https://github.com/krausest/js-framework-benchmark',
  scale: 'Time',
  data: [
    {
      label: 'Vanilla',
      score: 1,
    },
    {
      label: 'Solid 1.7.8',
      active: true,
      score: 1.08,
    },
    {
      label: 'Inferno 8.2.2',
      score: 1.10,
    },
    {
      label: 'Vue 3.3.4',
      score: 1.24,
    },
    {
      label: 'Svelte 4.0.0',
      score: 1.33,
    },
    {
      label: 'Preact 10.13.1',
      score: 1.40,
    },
    {
      label: 'React 18.2.0',
      score: 1.67,
    },
    {
      label: 'Angular 16.2.0',
      score: 1.67,
    },
    {
      label: 'Ember 4.10.0',
      score: 2.01,
    },
  ],
} as GraphData;

const isomorphic = {
  id: 'isomorphic-benchmark',
  name: 'Isomorphic UI Benchmarks (Search Results)',
  description: 'This benchmark tests raw Server Rendering speeds. Higher is better.',
  link: 'https://github.com/marko-js/isomorphic-ui-benchmarks',
  scale: 'Ops',
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
