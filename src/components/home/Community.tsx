import { For } from "solid-js";
import { useI18n } from "../../i18n";
import { Card } from "../Card";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { Section } from "../Section";
import { COMMUNITY } from "./data";
import styles from "./Community.module.css";

export function Community() {
  const { t } = useI18n();
  return (
    <Section
      id="community"
      tone="subtle"
      eyebrow="Community"
      title="Built in the open"
      description="Solid is MIT licensed and developed on GitHub. Questions and help happen on Discord."
    >
      <ul class={styles.grid}>
        <For each={COMMUNITY} keyed={(c) => c.title}>
          {(c) => (
            <Card
              as="li"
              icon={c().icon}
              title={c().title}
              description={c().description}
              interactive
              class={styles.card}
              footer={
                <Link href={c().href} class={styles.cta}>
                  {t(c().cta)} <Icon name="arrow-right" size={14} />
                </Link>
              }
            />
          )}
        </For>
      </ul>
    </Section>
  );
}
