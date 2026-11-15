import { Button as KButton } from "@kobalte/core/button";
import { createSignal, onSettled } from "solid-js";
import { useI18n } from "../i18n";
import { Icon } from "./Icon";
import styles from "./CopyButton.module.css";

export interface CopyButtonProps {
  /** Text copied to the clipboard. */
  text: string;
  /** Accessible name, default "Copy to clipboard". */
  label?: string;
  class?: string;
}

/** Icon button that copies `text`, swaps to a check for 2s and announces "Copied" via a polite live region. */
export function CopyButton(props: CopyButtonProps) {
  const { t, tx } = useI18n();
  const [copied, setCopied] = createSignal(false);
  let timer: ReturnType<typeof setTimeout> | undefined;
  onSettled(() => () => clearTimeout(timer));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(props.text);
    } catch {
      return; // clipboard blocked: leave the button unchanged rather than claim success
    }
    setCopied(true);
    clearTimeout(timer);
    timer = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <KButton class={[styles.button, props.class]} onClick={copy} aria-label={tx(props.label) ?? t("Copy to clipboard")}>
      <Icon name={copied() ? "check" : "copy"} size={16} />
      <span class="visually-hidden" role="status">{copied() ? t("Copied") : ""}</span>
    </KButton>
  );
}
