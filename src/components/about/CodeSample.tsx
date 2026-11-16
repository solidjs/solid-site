import { For } from "solid-js";
import { useI18n } from "../../i18n";
import { CopyButton } from "../CopyButton";
import { tokenize } from "../home/highlight";
import hl from "../home/highlight.module.css";
import styles from "./CodeSample.module.css";

/** Code panel with a copy button, highlighted with the home page's tokenizer and colours (static, dependency-free). */
export function CodeSample(props: { code: string; label: string }) {
  const { t, tx } = useI18n();
  const tokens = () => tokenize(props.code);
  return (
    <figure class={styles.figure}>
      <figcaption class={styles.caption}>
        <span>{tx(props.label)}</span>
        <CopyButton text={props.code} label={t("Copy {label}", { label: t(props.label) })} />
      </figcaption>
      <pre class={styles.pre} tabindex={0}>
        <code>
          <For each={tokens()} keyed={false}>
            {(token) => <span class={hl[token().kind]}>{token().text}</span>}
          </For>
        </code>
      </pre>
    </figure>
  );
}
