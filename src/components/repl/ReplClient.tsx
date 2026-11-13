// Browser-only. Loaded through clientOnly() in ./Repl.tsx, so none of this runs during prerender.
// Modelled on SolidBase's default-theme REPL client; the vite plugin that makes solid-repl bundle
// (CSS scoping, styled-system alias, worker format) is registered in vite.config.ts.
import CompilerWorker from "solid-repl/dist/compiler?worker";
import FormatterWorker from "solid-repl/dist/formatter?worker";
import SolidRepl from "solid-repl/dist/repl.jsx";
import "solid-repl/dist/bundle.css";
import { createSignal, createUniqueId, onSettled } from "solid-js";
import type { ReplFile } from "./examples";
import styles from "./Repl.module.css";

// One pair of workers for the whole page: switching examples must not pay the start-up cost again.
let workers: { compiler: Worker; formatter: Worker } | undefined;
const getWorkers = () => (workers ??= { compiler: new CompilerWorker(), formatter: new FormatterWorker() });

const isDark = () => document.documentElement.dataset.theme?.includes("dark") ?? false;

export interface ReplClientProps {
  files: ReplFile[];
  devtools?: boolean;
}

export default function ReplClient(props: ReplClientProps) {
  const { compiler, formatter } = getWorkers();
  const id = `repl-${createUniqueId()}`;
  const initial = () => props.files.map((f) => ({ ...f }));
  const [tabs, setTabs] = createSignal(initial());
  const [dark, setDark] = createSignal(false);

  // The theme is a data attribute we own (see ThemeToggle), so follow it with an observer.
  onSettled(() => {
    setDark(isDark());
    const observer = new MutationObserver(() => setDark(isDark()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  });

  return (
    <SolidRepl
      id={id}
      compiler={compiler}
      formatter={formatter}
      dark={dark()}
      tabs={tabs()}
      setTabs={setTabs}
      reset={() => setTabs(initial())}
      hideDevtools={!props.devtools}
      vertical={false}
    />
  );
}
