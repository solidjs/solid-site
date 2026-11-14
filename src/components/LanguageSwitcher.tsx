import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { For, Show } from "solid-js";
import { LOCALES, useI18n } from "../i18n";
import { Icon } from "./Icon";
import styles from "./LanguageSwitcher.module.css";

/**
 * Language menu. Renders nothing while the site has a single language, so adding a locale in src/i18n/locales.ts is
 * all it takes for it to appear. Each entry is a real link to the same page in that language (crawlable, works
 * without JavaScript), labelled in its own language.
 */
export function LanguageSwitcher() {
  const { locale, t, pathIn } = useI18n();
  return (
    <Show when={LOCALES.length > 1}>
      <DropdownMenu placement="bottom-end" gutter={8}>
        <DropdownMenu.Trigger class={styles.trigger} aria-label={t("Change language")}>
          <Icon name="languages" size={18} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content class={styles.content} data-no-scroll>
            <For each={LOCALES} keyed={(l) => l.code}>
              {(l) => (
                <DropdownMenu.Item
                  as="a"
                  class={styles.item}
                  href={pathIn(l().code)}
                  lang={l().lang}
                  hreflang={l().lang}
                  data-checked={l().code === locale().code ? "" : undefined}
                  aria-current={l().code === locale().code ? "true" : undefined}
                >
                  <span>{l().label}</span>
                  <Show when={l().code === locale().code}>
                    <Icon name="check" size={14} class={styles.indicator} />
                  </Show>
                </DropdownMenu.Item>
              )}
            </For>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>
    </Show>
  );
}
