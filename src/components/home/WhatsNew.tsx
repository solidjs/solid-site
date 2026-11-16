import { useI18n } from "../../i18n";
import { SOLID_2 } from "../../site";
import { Button } from "../Button";
import { Repl } from "../repl/Repl";
import { Section } from "../Section";
import { Tabs } from "../Tabs";
import { SNIPPETS } from "./data";
import { CodeBlock } from "./highlight";
import styles from "./WhatsNew.module.css";

const buildItems = (t: (english: string, vars?: Record<string, string | number>) => string) => SNIPPETS.map((s) => ({
  value: s.value,
  label: s.label,
  content: () => (
    <div class={styles.panel}>
      <div class={styles.copy}>
        <h3 class={styles.heading}>{t(s.title)}</h3>
        <p class={styles.text}>{t(s.description)}</p>
        <p class={styles.hint}>{t("Edit the code and the preview updates live.")}</p>
      </div>
      <Repl
        label={t("{label} live example", { label: t(s.label) })}
        files={s.files}
        devtools={s.devtools}
        placeholder={<CodeBlock code={s.files[0].source} label={t("{label} example", { label: t(s.label) })} />}
      />
    </div>
  ),
}));

export function WhatsNew() {
  const { t } = useI18n();
  const items = buildItems(t);
  return (
    <Section
      id="whats-new"
      tone="subtle"
      eyebrow="Solid 2.0"
      title="What's new in Solid 2.0"
      description="Async is part of the reactive graph, stores update through drafts, and actions make optimistic UI the default. Try each one live, right here."
      actions={
        <Button href={SOLID_2.migrationGuide} iconAfter="arrow-right">Migration guide</Button>
      }
    >
      <Tabs label="Solid 2.0 features" items={items} class={styles.tabs} />
    </Section>
  );
}
