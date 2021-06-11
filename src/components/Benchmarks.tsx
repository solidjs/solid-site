import type { Component } from 'solid-js';
import { createSignal, createMemo, Show } from 'solid-js';

const graphData = [
  {
    id: 'test1',
    name: 'JS Benchmark',
    description: 'JS benchmark with a description describing why it is useful.',
    link: 'https://github.com/marko-js/isomorphic-ui-benchmarks',
    data: [
      {
        label: 'Solid 1.0.0',
        active: true,
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
  {
    id: 'test2',
    name: 'Other Test',
    description: 'This is a different kind oof benchmark and this describes why.',
    link: 'https://github.com/marko-js/isomorphic-ui-benchmarks',
    data: [
      {
        label: 'Solid 1.0.0',
        active: true,
        score: 6000
      },
      {
        label: 'Marko.js 4.18.16',
        score: 5000
      },
      {
        label: 'Preact 10.0.1',
        score: 4000
      },
      {
        label: 'React 16.10.2',
        score: 3000
      },
      {
        label: 'Vue 2.6.10',
        score: 2000
      },
      {
        label: 'Lit',
        score: 1000
      }
    ]
  },
];

const Chart: Component<{ data: any }> = (props) => {
  const maxValue = createMemo(() => Math.max(...props.data.map(row => row.score)));
  const options = createMemo(() => props.data.map((row) => ({
    ...row,
    width: `${(row.score / maxValue()) * 100}%`
  })));
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
                    'bg-gray-100': !row.active
                  }}
                  style={({
                  width: row.width,
                })}>
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
}

const Benchmarks: Component<{}> = (props) => {
  const [current, setCurrent] = createSignal(0);
  const [expanded, setExpanded] = createSignal(false);
  return (
    <>
      <Chart data={graphData[current()].data}/>
      <Show
        when={expanded()}
        fallback={(
          <button
            class="py-3 block text-sm"
            onClick={() => setExpanded(true)}
          >
            Show more benchmarks
          </button>
        )}
      >
        <div class="space-x-2 space-y-10">
          {graphData.map((item, index) => {
            return (
              <button
                onClick={() => setCurrent(index)}
                class="text-sm px-6 py-3 rounded transition-all"
                classList={{
                  'active text-white bg-gray-500': current() === index,
                  'bg-gray-100': current() !== index
                }}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        <p class="py-5">{graphData[current()].description}</p>
        {graphData[current()].link ? <a target="_blank"
          rel="noopener noreferrer"
          href={graphData[current()].link}>View the benchmark</a> : ''}
      </Show>
    </>
  );
};

export default Benchmarks;
