import type { Component } from 'solid-js';
import { createSignal, createMemo, Show } from 'solid-js';

const graphData = [
  {
    id: 'test1',
    name: 'JS Framework Benchmark',
    description: 'The JS Framework Benchmark compares browser performance across a wide range of tests. Lower is better.',
    link: 'https://github.com/krausest/js-framework-benchmark',
    data: [
      {
        label: 'Vanilla',
        score: 1,
      },
      {
        label: 'Solid 0.20.0',
        active: true,
        score: 1.07,
      },
      {
        label: 'Inferno 7.4.8',
        score: 1.21,
      },
      {
        label: 'Svelte 3.37.9',
        score: 1.26,
      },
      {
        label: 'Preact 10.5.12',
        score: 1.44,
      },
      {
        label: 'Vue 3.0.6',
        score: 1.56,
      },
      {
        label: 'React 17.0.1',
        score: 1.96,
      },
      {
        label: 'Angular 12.0.1',
        score: 1.97,
      },
      {
        label: 'Ember 3.22.0',
        score: 2.21,
      },
    ],
  },
  {
    id: 'test2',
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
  },
];

const Chart: Component<{ data: any }> = (props) => {
  const maxValue = createMemo(() => Math.max(...props.data.map((row) => row.score)));
  const options = createMemo(() =>
    props.data.map((row) => ({
      ...row,
      width: `${(row.score / maxValue()) * 100}%`,
    })),
  );
  return (
    <table class="w-full table-fixed">
      <tbody>
        {options().map((row) => {
          return (
            <tr>
              <td class="w-1/3">{row.label}</td>
              <td class="w-2/3">
                <div
                  class="transition-all duration-75 p-3 rounded-3xl text-right text-sm"
                  classList={{
                    'bg-solid-medium': row.active,
                    'text-white': row.active,
                    'bg-gray-100': !row.active,
                  }}
                  style={{
                    width: row.width,
                  }}
                >
                  {row.score ? <figure>{row.score}</figure> : ''}
                </div>
              </td>
            </tr>
          );
        })}
        {!options().length ? (
          <tr>
            <td>&nbsp;</td>
            <td colSpan="2">No data has been supplied.</td>
          </tr>
        ) : null}
        <tr>
          <td>&nbsp;</td>
          <td class="p-3">Time</td>
        </tr>
      </tbody>
    </table>
  );
};

const Benchmarks: Component<{}> = (props) => {
  const [current, setCurrent] = createSignal(0);
  const [expanded, setExpanded] = createSignal(false);
  return (
    <>
      <Chart data={graphData[current()].data} />
      <Show
        when={expanded()}
        fallback={
          <button class="py-3 block text-sm" onClick={() => setExpanded(true)}>
            Show more benchmarks
          </button>
        }
      >
        <div class="space-x-2 space-y-10">
          {graphData.map((item, index) => {
            return (
              <button
                onClick={() => setCurrent(index)}
                class="text-sm px-6 py-3 rounded transition-all"
                classList={{
                  'active text-white bg-gray-500': current() === index,
                  'bg-gray-100': current() !== index,
                }}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        <p class="py-5">{graphData[current()].description}</p>
        {graphData[current()].link ? (
          <a target="_blank" rel="noopener noreferrer" href={graphData[current()].link}>
            View the benchmark
          </a>
        ) : (
          ''
        )}
      </Show>
    </>
  );
};

export default Benchmarks;
