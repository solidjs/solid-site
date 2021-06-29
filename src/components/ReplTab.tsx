import { Component, createSignal, ErrorBoundary } from 'solid-js';
import { createTabList, Repl, Tab } from 'solid-repl';
import { compiler, formatter } from './setupRepl';

const OldRepl: Component<{ tabs: Tab[] }> = (props) => {
  const initialTabs = props.tabs || [
    {
      name: 'main',
      type: 'tsx',
      source: '',
    },
  ];
  const [tabs, setTabs] = createTabList(initialTabs);
  const [current, setCurrent] = createSignal(`${initialTabs[0].name || 'main'}.tsx`);
  return (
    <ErrorBoundary
      fallback={
        <>Repl failed to load. You may be using a browser that doesn't support Web Workers.</>
      }
    >
      <Repl
        compiler={compiler}
        formatter={formatter}
        isHorizontal={true}
        interactive={true}
        actionBar={true}
        editableTabs={true}
        dark={false}
        tabs={tabs()}
        setTabs={setTabs}
        current={current()}
        setCurrent={setCurrent}
      />
    </ErrorBoundary>
  );
};
export default OldRepl;
