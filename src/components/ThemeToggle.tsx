import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { createEffect, createSignal, For, onSettled } from "solid-js";
import { useI18n } from "../i18n";
import { Icon, type IconName } from "./Icon";
import { applyPreference, readStoredPreference, syncThemeColor, type ThemePreference } from "./theme";
import styles from "./ThemeToggle.module.css";

const OPTIONS: { value: ThemePreference; label: string; icon: IconName }[] = [
  { value: "light", label: "Light", icon: "sun" },
  { value: "dark", label: "Dark", icon: "moon" },
  { value: "system", label: "System", icon: "monitor" },
];

/**
 * Light / dark / system menu (Kobalte DropdownMenu radio group). The trigger renders both glyphs and
 * CSS picks one from <html data-theme>, so server HTML and hydration never disagree and there is no flash.
 */
export function ThemeToggle(props: { class?: string }) {
  const { t } = useI18n();
  const [pref, setPref] = createSignal<ThemePreference>("system");
  let ready = false;

  onSettled(() => {
    setPref(readStoredPreference());
    syncThemeColor();
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => pref() === "system" && applyPreference("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  });

  // Apply only after the user (or the stored value) has set it; never on the initial server-matching value.
  createEffect(pref, (p) => {
    if (!ready) {
      ready = true;
      return;
    }
    applyPreference(p);
  });

  return (
    <DropdownMenu placement="bottom-end" gutter={8}>
      <DropdownMenu.Trigger class={[styles.trigger, props.class]} aria-label={t("Change colour theme")}>
        <Icon name="sun" size={18} class={styles.sun} />
        <Icon name="moon" size={18} class={styles.moon} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content class={styles.content} data-no-scroll>
          <DropdownMenu.RadioGroup value={pref()} onChange={(v: string) => setPref(v as ThemePreference)}>
            <For each={OPTIONS} keyed={(o) => o.value}>
              {(o) => (
                <DropdownMenu.RadioItem class={styles.item} value={o().value}>
                  <Icon name={o().icon} size={16} />
                  <span>{t(o().label)}</span>
                  <DropdownMenu.ItemIndicator class={styles.indicator}>
                    <Icon name="check" size={14} />
                  </DropdownMenu.ItemIndicator>
                </DropdownMenu.RadioItem>
              )}
            </For>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  );
}
