import { For } from "solid-js";
import { useI18n } from "../../i18n";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { Section } from "../Section";
import { ECOSYSTEM } from "./data";
import styles from "./Ecosystem.module.css";

export function Ecosystem() {
  const { t } = useI18n();
  return (
    <Section
      id="ecosystem"
      eyebrow="Ecosystem"
      title="Everything around the core"
      description="Official and community projects for routing, components, primitives, docs, testing and linting. Check each project's README for its Solid 2.0 status."
    >
      <ul class={styles.grid}>
        <For each={ECOSYSTEM} keyed={(p) => p.name}>
          {(p) => (
            <li>
              <Link href={p().href} class={styles.tile} showExternalIcon={false}>
                <span class={styles.icon}><Icon name={p().icon} size={20} /></span>
                <span class={styles.name}>{p().name}</span>
                <span class={styles.desc}>{t(p().description)}</span>
                <span class="visually-hidden"> {t("(opens in a new tab)")}</span>
              </Link>
            </li>
          )}
        </For>
      </ul>
    </Section>
  );
}
