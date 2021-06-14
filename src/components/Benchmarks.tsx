import type { Component } from 'solid-js';
import { createSignal, createMemo, Show } from 'solid-js';

export interface GraphData {
  id: string;
  name: string;
  description: string;
  link: string;
  data: Array<RowData>
}
interface RowData {
  label: string;
  active?: boolean;
  score: number;
}

const Chart: Component<{ rows: Array<RowData> }> = (props) => {
  const maxValue = createMemo(() => Math.max(...props.rows.map((row) => row.score)));
  const options = createMemo(() =>
    props.rows.map((row) => ({
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

const Benchmarks: Component<{ list: Array<GraphData> }> = (props) => {
  const [current, setCurrent] = createSignal(0);
  const [expanded, setExpanded] = createSignal(false);
  return (
    <>
      <Chart rows={props.list[current()].data} />
      <Show
        when={expanded()}
        fallback={
          <button class="py-3 block text-sm" onClick={() => setExpanded(true)}>
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
