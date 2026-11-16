import { Meta, Title } from "@solidjs/meta";
import { useI18n } from "../i18n";
import { For } from "solid-js";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { LOGO_VARIANTS } from "../components/media/assets";
import { LogoAsset } from "../components/media/LogoAsset";
import { Swatch } from "../components/media/Swatch";
import { Typography } from "../components/media/Typography";
import styles from "../components/media/Media.module.css";
import { PageHeader } from "../components/PageHeader";
import { Section } from "../components/Section";
import { URLS } from "../site";

const DESCRIPTION = "Download the Solid logo as SVG and find the brand colours, usage guidelines and press resources for Solid.";

const COLOURS = [
  { token: "--color-brand", name: "Brand" },
  { token: "--color-brand-soft", name: "Brand soft" },
  { token: "--color-brand-bright", name: "Brand bright" },
  { token: "--color-accent", name: "Accent" },
  { token: "--color-graphite", name: "Graphite" },
] as const;

// TODO(content): replace with official guidance from the Solid brand owners.
const GUIDELINES = [
  { title: "Give it room", description: "Keep clear space around the logo of at least the height of the mark." },
  { title: "Do not distort", description: "Scale proportionally. Do not stretch, skew, rotate or crop the logo." },
  { title: "Do not recolour", description: "Use the provided light and dark variants rather than changing colours or adding effects." },
  { title: "Keep contrast", description: "Place the logo on backgrounds where it stays clearly legible; use the dark variants on dark surfaces." },
  { title: "Do not imply endorsement", description: "Do not use the logo in a way that suggests official sponsorship or affiliation without agreement." },
] as const;

export default function Media() {
  const { t } = useI18n();
  return (
    <>
      <Title>{t("Media and brand assets | Solid")}</Title>
      <Meta name="description" content={t(DESCRIPTION)} />
      <PageHeader
        eyebrow="Media"
        title="Brand assets"
        description="Logos, colours and typography for writing about Solid or building with it."
      />

      <Section id="logos" size="wide" title="Logos" description="Each variant is shown on the surface it is designed for. Download the SVG or copy its URL.">
        <ul class={styles.logos} role="list">
          <For each={LOGO_VARIANTS} keyed={(v) => v.id}>
            {(variant) => <li><LogoAsset variant={variant()} /></li>}
          </For>
        </ul>
      </Section>

      <Section
        id="colours"
        tone="subtle"
        title="Colours"
        description="Values are read live from the site's design tokens and follow the current light or dark theme."
      >
        <ul class={styles.swatches} role="list">
          <For each={COLOURS} keyed={(c) => c.token}>
            {(c) => <Swatch token={c().token} name={c().name} />}
          </For>
        </ul>
      </Section>

      <Section
        id="typography"
        title="Typography"
        description="Geist is the brand typeface, with Geist Mono for code. Here is how the two are used across the site."
      >
        <Typography />
      </Section>

      <Section id="guidelines" tone="subtle" title="Usage guidelines" description="General brand rules. Official guidance is still to come.">
        <ul class={styles.guidelines} role="list">
          <For each={GUIDELINES} keyed={(g) => g.title}>
            {(g, i) => <Card as="li" index={`0${i() + 1}`} title={g().title} description={g().description} />}
          </For>
        </ul>
      </Section>

      <Section
        id="press"
        title="Press and questions"
        // TODO(content): add a dedicated press contact to site.ts and link it here.
        description="For press enquiries or brand questions, reach the team through Discord or GitHub."
        actions={
          <>
            <Button href={URLS.discord} icon="discord">Discord</Button>
            <Button href={URLS.github} icon="github">GitHub</Button>
          </>
        }
      />
    </>
  );
}
