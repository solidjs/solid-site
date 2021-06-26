import type { Component } from 'solid-js';
import { createSignal, createMemo, For,Show } from 'solid-js';

export interface GraphData {
  id: string;
  name: string;
  description: string;
  link: string;
  data: Array<RowData>;
}
interface RowData {
  label: string;
  active?: boolean;
  score: number;
}

const Chart: Component<{ rows: Array<RowData> }> = (props) => {
  const maxValue = createMemo(() => Math.max(...props.rows.map((row) => row.score)));
  const options = createMemo(() =>
    props.rows
      .sort((a, b) => a.score - b.score)
      .map((row) => ({
        ...row,
        width: `${(row.score / maxValue() * 100) }%`,
      }))
  );
  return (
    <table class="w-full table-fixed">
      <tbody>
        <For each={options()}>
          {(row) => {
            return (
              <tr>
                <td class="w-1/6 text-sm">{row.label}</td>
                <td class="w-2/6">
                  <div
                    class="transition-all duration-75 p-3 rounded-3xl text-right text-xs"
                    classList={{
                      'text-white': row.active,
                      'bg-solid-accent': row.active,
                      'bg-gray-100': !row.active,
                    }}
                    style={{ width: row.width }}
                  >
                    {row.score ? <figure>{row.score}</figure> : ''}
                  </div>
                </td>
              </tr>
            );
          }}
        </For>
        {!options().length ? (
          <tr>
            <td>&nbsp;</td>
            <td colSpan="2">No data has been supplied.</td>
          </tr>
        ) : null}
        <tr>
          <td>&nbsp;</td>
          <td class="p-3 text-sm">Time</td>
        </tr>
      </tbody>
    </table>
  );
};

const Benchmarks: Component<{ list: Array<GraphData> }> = (props) => {
  const [current, setCurrent] = createSignal(0);
  const [expanded, setExpanded] = createSignal(false);
  return (
    <>
      <Chart rows={props.list[current()].data} />
      <Show
        when={expanded()}
        fallback={
          <button class="py-3 text-sm chevron chevron-right button mt-8 text-solid-default font-semibold hover:text-gray-500" onClick={() => setExpanded(true)}>
            Show more benchmarks
          </button>
        }
      >
        <div class="space-x-2 space-y-10">
          {props.list.map((item, index) => {
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
        <p class="py-5">{props.list[current()].description}</p>
        {props.list[current()].link ? (
          <a target="_blank" rel="noopener noreferrer" href={props.list[current()].link}>
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
