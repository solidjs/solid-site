import { Badge as KBadge } from "@kobalte/core/badge";
import type { ParentProps } from "solid-js";
import styles from "./Badge.module.css";

export interface BadgeProps extends ParentProps {
  tone?: "neutral" | "brand" | "accent" | "success" | "warning";
  class?: string;
}

/** Small status / tag pill (Kobalte Badge). */
export function Badge(props: BadgeProps) {
  return (
    <KBadge class={[styles.badge, styles[props.tone ?? "neutral"], props.class]}>
      {props.children}
    </KBadge>
  );
}
