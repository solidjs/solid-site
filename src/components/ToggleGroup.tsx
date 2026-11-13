import { ToggleGroup as KToggleGroup } from "@kobalte/core/toggle-group";
import type { JSX } from "@solidjs/web";
import { For } from "solid-js";
import styles from "./ToggleGroup.module.css";

export interface ToggleOption {
  value: string;
  label: JSX.Element;
  /** Accessible name when label is icon-only. */
  ariaLabel?: string;
}
export interface ToggleGroupProps {
  options: ToggleOption[];
  /** Selected values (multi-select). Controlled. */
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  /** Accessible name of the group (e.g. "Filter by tag"). */
  label: string;
  class?: string;
}

/** Pill toggle group for filters (Kobalte ToggleGroup, multiple selection). */
export function ToggleGroup(props: ToggleGroupProps) {
  return (
    <KToggleGroup
      multiple
      class={[styles.group, props.class]}
      aria-label={props.label}
      value={props.value}
      defaultValue={props.defaultValue}
      onChange={(v: string[]) => props.onChange?.(v)}
    >
      <For each={props.options} keyed={(o) => o.value}>
        {(o) => (
          <KToggleGroup.Item class={styles.item} value={o().value} aria-label={o().ariaLabel}>
            {o().label}
          </KToggleGroup.Item>
        )}
      </For>
    </KToggleGroup>
  );
}
