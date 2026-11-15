import { dynamic, type JSX } from "@solidjs/web";
import { Show, type ParentProps } from "solid-js";
import { useI18n } from "../i18n";
import { Icon, type IconName } from "./Icon";
import styles from "./Card.module.css";

export interface CardProps extends ParentProps {
  /** Heading text. */
  title?: JSX.Element;
  /** Heading level, default 3. */
  level?: 2 | 3 | 4;
  description?: JSX.Element;
  icon?: IconName;
  /** Big number/label shown first (numbered principle cards, e.g. "01"). */
  index?: string;
  /** Footer slot (links, meta). */
  footer?: JSX.Element;
  /** Lift on hover — set when the whole card is a link target. */
  interactive?: boolean;
  as?: "div" | "article" | "li";
  class?: string;
}

/** Surface card with optional icon, index, title, description, body and footer. */
export function Card(props: CardProps) {
  const { tx } = useI18n();
  const Tag = dynamic(() => props.as ?? "div");
  const Heading = dynamic(() => `h${props.level ?? 3}` as "h3");
  return (
    <Tag class={[styles.card, { [styles.interactive]: props.interactive }, props.class]}>
      <Show when={props.index}>
        <span class={styles.index} aria-hidden="true">{props.index}</span>
      </Show>
      <Show when={props.icon}>
        <span class={styles.icon}><Icon name={props.icon!} size={22} /></span>
      </Show>
      <Show when={props.title}>
        <Heading class={styles.title}>{tx(props.title)}</Heading>
      </Show>
      <Show when={props.description}>
        {(d) => <p class={styles.description}>{tx(d())}</p>}
      </Show>
      {props.children}
      <Show when={props.footer}>
        {(f) => <div class={styles.footer}>{f()}</div>}
      </Show>
    </Tag>
  );
}
