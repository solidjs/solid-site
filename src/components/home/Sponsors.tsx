import { For, Show } from "solid-js";
import { URLS } from "../../site";
import { Button } from "../Button";
import { Link } from "../Link";
import { Section } from "../Section";
import type { Sponsor, SponsorTier } from "./data";
import { SPONSORS } from "./sponsor-data";
import styles from "./Sponsors.module.css";

const TIERS: { tier: SponsorTier; title: string }[] = [
  { tier: "gold", title: "Gold" },
  { tier: "silver", title: "Silver" },
  { tier: "bronze", title: "Bronze" },
  { tier: "supporter", title: "Supporters" },
];

function Tier(props: { title: string; tier: SponsorTier; sponsors: Sponsor[] }) {
  return (
    <div class={[styles.tier, styles[props.tier]]}>
      <h3 class={styles.tierTitle}>{props.title}</h3>
      <ul class={styles.logos}>
        <For each={props.sponsors} keyed={(s) => s.name}>
          {(s) => (
            <li>
              <Link href={s().href} class={styles.logo} showExternalIcon={false} aria-label={`${s().name} (opens in a new tab)`}>
                <img src={s().logo} alt="" loading="lazy" decoding="async" width="160" height="54" />
              </Link>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}

export function Sponsors() {
  return (
    <Section
      id="sponsors"
      eyebrow="Sponsors"
      title="Thank you to our supporters"
      description="Sponsors fund the maintainers, infrastructure and events that keep Solid independent."
      actions={
        <Button href={URLS.opencollective} variant="primary" icon="heart">Become a sponsor</Button>
      }
    >
      <For each={TIERS} keyed={(t) => t.tier}>
        {(t) => {
          const list = () => SPONSORS.filter((s) => s.tier === t().tier);
          return (
            <Show when={list().length > 0}>
              <Tier title={t().title} tier={t().tier} sponsors={list()} />
            </Show>
          );
        }}
      </For>
    </Section>
  );
}
