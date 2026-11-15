import { Badge as KBadge } from "@kobalte/core/badge";
import type { ParentProps } from "solid-js";
import { useI18n } from "../i18n";
import styles from "./Badge.module.css";

export interface BadgeProps extends ParentProps {
  tone?: "neutral" | "brand" | "accent" | "success" | "warning";
  class?: string;
}

/** Small status / tag pill (Kobalte Badge). */
export function Badge(props: BadgeProps) {
  const { tx } = useI18n();
  return (
    <KBadge class={[styles.badge, styles[props.tone ?? "neutral"], props.class]}>
      {tx(props.children)}
    </KBadge>
  );
}
