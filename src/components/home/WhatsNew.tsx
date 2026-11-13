import { SOLID_2 } from "../../site";
import { Button } from "../Button";
import { Section } from "../Section";
import { Tabs } from "../Tabs";
import { SNIPPETS } from "./data";
import { CodeBlock } from "./highlight";
import styles from "./WhatsNew.module.css";

const buildItems = () => SNIPPETS.map((s) => ({
  value: s.value,
  label: s.label,
  content: () => (
    <div class={styles.panel}>
      <div class={styles.copy}>
        <h3 class={styles.heading}>{s.title}</h3>
        <p class={styles.text}>{s.description}</p>
      </div>
      <CodeBlock code={s.code} label={`${s.label} example`} />
    </div>
  ),
}));

export function WhatsNew() {
  const items = buildItems();
  return (
    <Section
      id="whats-new"
      tone="subtle"
      eyebrow="Solid 2.0 release candidate"
      title="What's new in Solid 2.0"
      description="Async is part of the reactive graph, effects say what they track, and stores update through drafts. A few of the changes, in code."
      actions={
        <Button href={SOLID_2.migrationGuide} iconAfter="arrow-right">Migration guide</Button>
      }
    >
      <Tabs label="Solid 2.0 features" items={items} class={styles.tabs} />
    </Section>
  );
}
