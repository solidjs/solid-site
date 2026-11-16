import { For, Show } from "solid-js";
import { useI18n } from "../../i18n";
import { Link } from "../Link";
import { Section } from "../Section";
import type { Sponsor, SponsorTier } from "./data";
import { SPONSORS } from "./sponsor-data";
import { Support } from "./Support";
import styles from "./Sponsors.module.css";

const TIERS: { tier: SponsorTier; title: string }[] = [
  { tier: "gold", title: "Gold" },
  { tier: "silver", title: "Silver" },
  { tier: "bronze", title: "Bronze" },
  { tier: "supporter", title: "Supporters" },
];

/**
 * Logos have very different shapes, so giving them all one height makes wide wordmarks huge and square marks tiny.
 * Instead they share roughly one area: tall for squarish marks, short for long wordmarks, within a min and max.
 */
const AREA = 3640; // px squared
const MAX_HEIGHT = 44;
const MAX_WIDTH = 140;
function markSize(ratio: number) {
  let height = Math.min(MAX_HEIGHT, Math.sqrt(AREA / ratio));
  if (height * ratio > MAX_WIDTH) height = MAX_WIDTH / ratio;
  return { width: `${(height * ratio) / 16}rem`, height: `${height / 16}rem` };
}

function Tier(props: { title: string; tier: SponsorTier; sponsors: Sponsor[] }) {
  const { t } = useI18n();
  return (
    <div class={[styles.tier, styles[props.tier]]}>
      <h3 class={styles.tierTitle}>{t(props.title)}</h3>
      <ul class={styles.logos}>
        <For each={props.sponsors} keyed={(s) => s.name}>
          {(s) => (
            <li>
              <Link href={s().href} class={styles.logo} showExternalIcon={false} aria-label={`${s().name} ${t("(opens in a new tab)")}`}>
                <span class={styles.mark} aria-hidden="true" style={{ "--logo": `url("${s().logo}")`, ...markSize(s().ratio) }} />
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
      description="Sponsors pay for maintainers, infrastructure and events."
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
      <Support />
    </Section>
  );
}
