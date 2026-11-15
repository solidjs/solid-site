import type { JSX } from "@solidjs/web";
import { For } from "solid-js";
import styles from "./Timeline.module.css";

export interface TimelineEvent {
  /** Human-readable date, e.g. "30 Sep 2021". */
  label: string;
  /** Machine-readable date for <time> (YYYY, YYYY-MM or YYYY-MM-DD). */
  iso: string;
  title: JSX.Element;
  description?: JSX.Element;
}

/** Vertical timeline rendered as an ordered list of <time>-stamped events. */
export function Timeline(props: { events: TimelineEvent[] }) {
  return (
    <ol class={styles.list}>
      <For each={props.events} keyed={(e) => `${e.iso}|${String(e.title)}`}>
        {(event) => (
          <li class={styles.item}>
            <time class={styles.date} datetime={event().iso}>{event().label}</time>
            <h3 class={styles.title}>{event().title}</h3>
            {event().description ? <p class={styles.description}>{event().description}</p> : null}
          </li>
        )}
      </For>
    </ol>
  );
}
