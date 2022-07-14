import { Component, createSignal, ErrorBoundary, lazy } from 'solid-js';
import { isServer } from 'solid-js/web';
import type { Tab } from 'solid-repl';
import { useAppContext } from './AppContext';
export const Repl = lazy(() =>
  !isServer ? import('./setupRepl') : Promise.resolve({ default: () => [] }),
);

let count = 0;
const OldRepl: Component<{ tabs: Tab[] }> = (props) => {
  count++;
  const context = useAppContext();
  const [tabs, setTabs] = createSignal(props.tabs);
  const [current, setCurrent] = createSignal(props.tabs[0].name, {
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
