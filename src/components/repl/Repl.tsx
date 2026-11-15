import { clientOnly } from "@solidjs/web";
import type { JSX } from "@solidjs/web";
import { createSignal, Errored, onSettled, Show } from "solid-js";
import { useI18n } from "../../i18n";
import type { ReplFile } from "./examples";
import styles from "./Repl.module.css";

// solid-repl needs Web Workers, dockview and CodeMirror, so it never renders on the server.
const ReplClient = clientOnly(() => import("./ReplClient"));

export interface ReplProps {
  files: ReplFile[];
  /** Static stand-in: prerendered into the HTML and shown until the REPL is in view and loaded. */
  placeholder: JSX.Element;
  devtools?: boolean;
  /** Accessible name for the embedded editor region. */
  label: string;
}

/**
 * A live, editable Solid REPL. The compiler, editor and preview are heavy, so nothing loads until the
 * REPL is within a screenful of the viewport; until then (and with JS off) the placeholder shows.
 */
export function Repl(props: ReplProps) {
  const { t, tx } = useI18n();
  let root!: HTMLDivElement;
  const [near, setNear] = createSignal(false);

  onSettled(() => {
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(root);
    return () => observer.disconnect();
  });

  return (
    <div ref={root} class={["sb-repl", styles.repl]} role="region" aria-label={tx(props.label)}>
      <Show when={near()} fallback={props.placeholder}>
        <Errored
          fallback={(error) => {
            console.error(error());
            return (
              <div class={styles.status}>
                {t("The live editor could not load. The code above still shows the full example.")}
              </div>
            );
          }}
        >
          <ReplClient files={props.files} devtools={props.devtools} fallback={props.placeholder} />
        </Errored>
      </Show>
    </div>
  );
}
