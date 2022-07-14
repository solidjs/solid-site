import type { Component } from 'solid-js';
import { useI18n } from '@solid-primitives/i18n';
import { createSignal, createMemo, For, Show } from 'solid-js';
import { createVisibilityObserver } from '@solid-primitives/intersection-observer';

export interface GraphData {
  id: string;
  name: string;
  description: string;
  link: string;
  data: RowData[];
  scale: string;
}
interface RowData {
  label: string;
  active?: boolean;
  score: number;
}

const Chart: Component<{ rows: RowData[]; scale: string; direction: string }> = (props) => {
  const maxValue = createMemo(() => Math.max(...props.rows.map((row) => row.score)));
  const options = createMemo(() =>
    props.rows
      .sort((a, b) => a.score - b.score)
      .map((row) => ({
        ...row,
        width: `${(row.score / maxValue()) * 100}%`,
      })),
  );
  return (
    <table class="w-full table-fixed">
      <tbody>
        <For each={options()}>
          {(row) => {
            let chartRef: HTMLDivElement;
            const useVisibilityObserver = createVisibilityObserver();
            const isVisible = useVisibilityObserver(() => chartRef);
            return (
              <tr>
                <td class="w-1/6 text-xs">{row.label}</td>
                <td class="w-4/6 py-1">
                  <div
                    ref={(ref) => (chartRef = ref)}
                    class="relative z-10 rounded-3xl overflow-hidden"
                  >
                    <div
                      class="transition-transform -translate-x-full duration-700 w-full h-full rounded-3xl ltr:text-right rtl:text-left text-xxs py-1"
                      classList={{
                        'bg-solid-light text-white font-semibold': row.active,
                        'bg-gray-100 dark:bg-solid-darkLighterBg': !row.active,
                      }}
                      style={{
                        width: row.width,
                        transform: `translateX(${
                          isVisible() ? '0%' : props.direction === 'right' ? '-100%' : '100%'
                        })`,
                      }}
                    >
                      {row.score ? (
                        <figure>
                          <span class="inline-block p-1 px-2 rounded-full">
                            {row.score.toLocaleString()}
                          </span>
                        </figure>
                      ) : (
                        ''
                      )}
                    </div>
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
          <td class="p-3 text-xs">{props.scale}</td>
        </tr>
      </tbody>
    </table>
  );
};

const Benchmarks: Component<{ list: GraphData[] }> = (props) => {
  const [t] = useI18n();
  const [current, setCurrent] = createSignal(0);
  const [expanded, setExpanded] = createSignal(false);
  const direction = createMemo(() => (t('global.dir', {}, 'ltr') == 'rtl' ? 'left' : 'right'));
  return (
    <>
      <Chart
        scale={props.list[current()].scale}
        rows={props.list[current()].data}
        direction={direction()}
      />
      <Show
        when={expanded()}
        fallback={
          <button
            class={`py-3 text-sm chevron button text-solid-default dark:text-solid-darkdefault font-semibold hover:text-gray-500 dark:hover:text-gray-300 chevron-${direction()}`}
            onClick={() => setExpanded(true)}
          >
            {t('home.benchmarks.show_more', {}, 'Show more client + server benchmarks')}
          </button>
        }
      >
        <div class="mt-4 flex flex-col space-y-2 m-auto lg:space-y-0 lg:m-0 lg:flex-row">
          {props.list.map((item, index) => {
            return (
              <button
                onClick={() => setCurrent(index)}
                class="text-xs lg:mr-1 p-3 rounded md:hover:bg-gray-400 dark:md:hover:bg-gray-400 transition duration-150 hover:text-white"
                classList={{
                  'active text-white bg-solid-light': current() === index,
                  'bg-gray-100 dark:bg-gray-500': current() !== index,
                }}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        <div>
          <div class="pt-5 text-xs block">{props.list[current()]?.description}</div>
          <Show when={props.list[current()]?.link}>
            <a
              target="_blank"
              class="button text-xs block mt-3 text-solid-default dark:text-solid-darkdefault chevron chevron-right font-semibold hover:text-gray-500 dark:hover:text-gray-300"
              rel="noopener noreferrer"
              href={props.list[current()].link}
            >
              {t('home.benchmarks.view')}
            </a>
          </Show>
        </div>
      </Show>
    </>
  );
};

export default Benchmarks;
