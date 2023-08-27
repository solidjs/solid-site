import { batch, Component, createSignal, ErrorBoundary } from 'solid-js';
import { Tab } from 'solid-repl';
import Repl from 'solid-repl/dist/repl';
import { compiler, formatter, linter } from './setupRepl';
import { useAppState } from '../AppContext';

let count = 0;
const OldRepl: Component<{ tabs: Tab[] }> = (props) => {
  count++;
  const context = useAppState();
  const initialTabs = props.tabs || [
    {
      name: 'main.jsx',
      source: '',
    },
  ];
  const [tabs, setTabs] = createSignal(initialTabs);
  const [current, setCurrent] = createSignal(initialTabs[0].name, {
    equals: false,
  });
  return (
    <ErrorBoundary
      fallback={
        <>Repl failed to load. You may be using a browser that doesn't support Web Workers.</>
      }
    >
      <Repl
        id={`repl-${count}`}
        compiler={compiler}
        formatter={formatter}
        linter={linter}
        reset={() => {
          batch(() => {
            setTabs(initialTabs);
            setCurrent(initialTabs[0].name);
          });
        }}
        hideDevtools={true}
        isHorizontal={true}
        dark={context.isDark}
        tabs={tabs()}
        setTabs={setTabs}
        current={current()}
        setCurrent={setCurrent}
      />
    </ErrorBoundary>
  );
};
export default OldRepl;
