import { For } from "solid-js";
import { githubUrl, maintainers } from "../../team/people";
import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { Link } from "../Link";
import { Section } from "../Section";
import styles from "./Maintainers.module.css";

export function Maintainers() {
  return (
    <Section
      id="maintainers"
      eyebrow="Team"
      title="Maintainers"
      description="The people who steward Solid, its tooling and its community."
    >
      <ul class={styles.grid}>
        <For each={maintainers} keyed={(p) => p.github}>
          {(p) => (
            <li class={styles.person}>
              <Avatar src={p().img} name={p().name} size={80} />
              <Link href={githubUrl(p().github)} class={styles.name} showExternalIcon={false}>
                {p().name}
                <span class="visually-hidden"> on GitHub (opens in a new tab)</span>
              </Link>
              <span class={styles.role}>{p().role}</span>
            </li>
          )}
        </For>
      </ul>
      <div class={styles.more}>
        <Button href="/team" iconAfter="arrow-right">View all</Button>
      </div>
    </Section>
  );
}
