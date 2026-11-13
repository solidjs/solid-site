import { Dialog as KDialog } from "@kobalte/core/dialog";
import type { JSX } from "@solidjs/web";
import { Show, type ParentProps } from "solid-js";
import { Icon } from "./Icon";
import styles from "./Dialog.module.css";

export interface DialogProps extends ParentProps {
  /** Contents of the trigger button. */
  trigger: JSX.Element;
  title: JSX.Element;
  description?: JSX.Element;
  triggerClass?: string;
}

/** Modal dialog (Kobalte Dialog). Portal content mounts only on the client when opened. */
export function Dialog(props: DialogProps) {
  return (
    <KDialog>
      <KDialog.Trigger class={props.triggerClass}>{props.trigger}</KDialog.Trigger>
      <KDialog.Portal>
        <KDialog.Overlay class={styles.overlay} />
        <div class={styles.positioner}>
          <KDialog.Content class={styles.content}>
            <div class={styles.head}>
              <KDialog.Title class={styles.title}>{props.title}</KDialog.Title>
              <KDialog.CloseButton class={styles.close} aria-label="Close">
                <Icon name="close" size={18} />
              </KDialog.CloseButton>
            </div>
            <Show when={props.description}>
              <KDialog.Description class={styles.description}>{props.description}</KDialog.Description>
            </Show>
            {props.children}
          </KDialog.Content>
        </div>
      </KDialog.Portal>
    </KDialog>
  );
}
