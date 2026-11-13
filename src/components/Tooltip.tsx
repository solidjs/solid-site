import { Tooltip as KTooltip } from "@kobalte/core/tooltip";
import type { JSX } from "@solidjs/web";
import type { ParentProps } from "solid-js";
import styles from "./Tooltip.module.css";

export interface TooltipProps extends ParentProps {
  /** Tooltip text. */
  content: JSX.Element;
  placement?: "top" | "bottom" | "left" | "right";
  class?: string;
  /** Accessible name for icon-only triggers. */
  label?: string;
  /** Click handler for the trigger button. */
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
}

/** Tooltip whose trigger is a `<button>` containing the children. The portal content is client-only. */
export function Tooltip(props: TooltipProps) {
  return (
    <KTooltip placement={props.placement ?? "top"} gutter={8} openDelay={300}>
      <KTooltip.Trigger class={props.class} aria-label={props.label} onClick={props.onClick}>
        {props.children}
      </KTooltip.Trigger>
      <KTooltip.Portal>
        <KTooltip.Content class={styles.content}>
          <KTooltip.Arrow />
          {props.content}
        </KTooltip.Content>
      </KTooltip.Portal>
    </KTooltip>
  );
}
