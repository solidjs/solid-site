import { Separator as KSeparator } from "@kobalte/core/separator";
import styles from "./Separator.module.css";

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  class?: string;
}

/** Thin divider line (Kobalte Separator, renders <hr> with proper semantics). */
export function Separator(props: SeparatorProps) {
  return <KSeparator orientation={props.orientation ?? "horizontal"} class={[styles.separator, props.class]} />;
}
