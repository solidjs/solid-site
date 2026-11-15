import { Tabs as KTabs } from "@kobalte/core/tabs";
import type { JSX } from "@solidjs/web";
import { For } from "solid-js";
import { useI18n } from "../i18n";
import styles from "./Tabs.module.css";

export interface TabItem {
  value: string;
  label: JSX.Element;
  /** Render function: panels are built where they are mounted, so hydration ids match the server. */
  content: () => JSX.Element;
}
export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  /** Accessible name for the tab list. */
  label: string;
  class?: string;
}

/** Tabs (Kobalte): arrow-key navigation, roving focus, `data-selected` styling. */
export function Tabs(props: TabsProps) {
  const { tx } = useI18n();
  return (
    <KTabs class={[styles.root, props.class]} defaultValue={props.defaultValue ?? props.items[0]?.value}>
      <KTabs.List class={styles.list} aria-label={tx(props.label)} data-no-scroll>
        <For each={props.items} keyed={(i) => i.value}>
          {(item) => <KTabs.Trigger class={styles.trigger} value={item().value}>{tx(item().label)}</KTabs.Trigger>}
        </For>
        <KTabs.Indicator class={styles.indicator} />
      </KTabs.List>
      <For each={props.items} keyed={(i) => i.value}>
        {(item) => <KTabs.Content class={styles.content} value={item().value}>{item().content()}</KTabs.Content>}
      </For>
    </KTabs>
  );
}
