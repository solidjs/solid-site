import { Accordion as KAccordion } from "@kobalte/core/accordion";
import type { JSX } from "@solidjs/web";
import { For } from "solid-js";
import { Icon } from "./Icon";
import styles from "./Accordion.module.css";

export interface AccordionItem {
  value: string;
  title: JSX.Element;
  content: JSX.Element;
}
export interface AccordionProps {
  items: AccordionItem[];
  /** Allow several panels open at once. */
  multiple?: boolean;
  defaultValue?: string[];
  class?: string;
}

/** FAQ-style accordion (Kobalte). Panels animate via the --kb-accordion-content-height variable. */
export function Accordion(props: AccordionProps) {
  return (
    <KAccordion collapsible multiple={props.multiple} defaultValue={props.defaultValue} class={[styles.root, props.class]}>
      <For each={props.items} keyed={(i) => i.value}>
        {(item) => (
          <KAccordion.Item value={item().value} class={styles.item}>
            <KAccordion.Header class={styles.header}>
              <KAccordion.Trigger class={styles.trigger}>
                <span>{item().title}</span>
                <Icon name="chevron-down" size={18} class={styles.chevron} />
              </KAccordion.Trigger>
            </KAccordion.Header>
            <KAccordion.Content class={styles.content}>
              <div class={styles.inner}>{item().content}</div>
            </KAccordion.Content>
          </KAccordion.Item>
        )}
      </For>
    </KAccordion>
  );
}
