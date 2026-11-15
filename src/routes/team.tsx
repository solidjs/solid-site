import { Meta, Title } from "@solidjs/meta";
import { For, Show } from "solid-js";
import { Button } from "../components/Button";
import { Link } from "../components/Link";
import { PageHeader } from "../components/PageHeader";
import { Section } from "../components/Section";
import { ContributorWall } from "../components/team/ContributorWall";
import { PersonCard } from "../components/team/PersonCard";
import styles from "../components/team/Team.module.css";
import { URLS } from "../site";
import { contributors, ecosystem, maintainers, translators, type Supporter } from "../team/people";

const DESCRIPTION = "The maintainers, translators and community contributors who build and support SolidJS.";
const CONTRIBUTING = "https://github.com/solidjs/solid/blob/main/CONTRIBUTING.md";
const DOCS_CONTRIBUTING = "https://github.com/solidjs/solid-docs/blob/main/CONTRIBUTING.md";

function SupporterList(props: { items: readonly Supporter[]; label: string }) {
  return (
    <ul class={styles.list} aria-label={props.label}>
      <For each={props.items}>
        {(s) => (
          <li class={styles.item}>
            <span class={styles.itemName}>
              {s.link ? <Link href={s.link}>{s.name}</Link> : s.name}
            </span>
            <Show when={s.company}>
              <span class={styles.itemMeta}>{s.company}</span>
            </Show>
            <p class={styles.itemDetail}>{s.detail}</p>
          </li>
        )}
      </For>
    </ul>
  );
}

export default function TeamPage() {
  return (
    <>
      <Title>Team & Contributors | Solid</Title>
      <Meta name="description" content={DESCRIPTION} />
      <PageHeader
        eyebrow="Team"
        title="The people behind Solid"
        description="Solid is built by its maintainers and hundreds of contributors around the world."
      />

      <Section id="maintainers" title="Maintainers" description="The people who steer Solid and its ecosystem." size="wide">
        <ul class={styles.grid} aria-label="Maintainers">
          <For each={maintainers}>{(p) => <PersonCard person={p} />}</For>
        </ul>
      </Section>

      <Section id="thanks" title="Special thanks" tone="subtle" description="Design, writing, moderation and infrastructure help along the way.">
        <SupporterList items={contributors} label="Special thanks" />
      </Section>

      <Section id="ecosystem" title="Ecosystem" description="Friends of Solid building on and around it.">
        <SupporterList items={ecosystem} label="Ecosystem supporters" />
      </Section>

      <Section id="translators" title="Translators" tone="subtle" description="Volunteers who translated Solid's documentation.">
        <ul class={styles.list} aria-label="Translators">
          <For each={translators}>
            {(t) => (
              <li class={styles.item}>
                <span class={styles.itemName}><Link href={t.link}>{t.name}</Link></span>
                <span class={styles.itemMeta}><span aria-hidden="true">{t.flag}</span> {t.language}</span>
              </li>
            )}
          </For>
        </ul>
      </Section>

      <Section id="contributors" title="All contributors" description="Everyone who has shipped code to Solid, Solid Start and Solid Router.">
        <ContributorWall />
      </Section>

      <Section
        id="join"
        title="Become a contributor"
        tone="subtle"
        description="Fixes, docs, translations and ideas are all welcome. Everyone participating is expected to follow our code of conduct."
      >
        <div class={styles.cta}>
          <Button href={CONTRIBUTING} variant="primary" icon="github">Contributing guide</Button>
          <Button href={DOCS_CONTRIBUTING} icon="book">Help with the docs</Button>
          <Button href={URLS.discord} icon="discord">Join Discord</Button>
          <Button href="/code-of-conduct" icon="shield">Code of conduct</Button>
        </div>
      </Section>
    </>
  );
}
