import { For } from "solid-js";
import { useI18n } from "../../i18n";
import { Button } from "../Button";
import styles from "./Typography.module.css";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 .,;:!?&@#%()[]{}<>/=+-*";

const FACES = [
  {
    name: "Geist",
    role: "Headings, body text and interface",
    description: "The sans-serif used across the site: bold and tightly spaced in headlines, regular weight in body text.",
    family: "var(--font-sans)",
    weights: [
      { name: "Regular", value: 400 },
      { name: "Medium", value: 500 },
      { name: "Semibold", value: 600 },
      { name: "Bold", value: 700 },
    ],
    sample: "Reactive",
    href: "https://vercel.com/font",
  },
  {
    name: "Geist Mono",
    role: "Code, numbers and technical labels",
    description: "The monospaced companion for code samples, install commands, statistics and small technical captions. Its zero is slashed.",
    family: "var(--font-mono)",
    weights: [
      { name: "Regular", value: 400 },
      { name: "Medium", value: 500 },
      { name: "Semibold", value: 600 },
    ],
    sample: "createSignal(0)",
    href: "https://vercel.com/font",
  },
] as const;

/** The type scale as the site uses it: each row is set with the real token, so it stays in step with the CSS. */
const SCALE = [
  { label: "Display", token: "--text-display-sm", style: { "font-weight": "var(--weight-display)", "letter-spacing": "var(--tracking-display)", "line-height": "var(--leading-tight)" }, sample: "Fine-grained reactivity" },
  { label: "Heading 1", token: "--text-4xl", style: { "font-weight": "var(--weight-bold)", "letter-spacing": "var(--tracking-tight)" }, sample: "Simple and performant" },
  { label: "Heading 2", token: "--text-3xl", style: { "font-weight": "var(--weight-bold)", "letter-spacing": "var(--tracking-heading)" }, sample: "Components run once" },
  { label: "Heading 3", token: "--text-2xl", style: { "font-weight": "var(--weight-semibold)", "letter-spacing": "var(--tracking-heading)" }, sample: "Signals track what they read" },
  { label: "Body large", token: "--text-lg", style: { "font-weight": "var(--weight-regular)" }, sample: "Solid compiles JSX into direct DOM updates, with no virtual DOM in between." },
  { label: "Body", token: "--text-base", style: { "font-weight": "var(--weight-regular)" }, sample: "Updates run only the code that reads the value that changed, so the work stays proportional to the change." },
  { label: "Small", token: "--text-sm", style: { "font-weight": "var(--weight-regular)" }, sample: "Supporting text, captions under figures and secondary information." },
  { label: "Label", token: "--text-xs", style: { "font-family": "var(--font-mono)", "text-transform": "uppercase", "letter-spacing": "0.08em" }, sample: "GitHub stars · npm downloads / week" },
] as const;

const PRINCIPLES = [
  { title: "Tight headings", description: "Large type is bold with slightly negative letter-spacing, so headlines stay compact." },
  { title: "Comfortable reading", description: "Body text is regular weight with a line height of about 1.6 and lines kept to a readable length." },
  { title: "Mono for code and numbers", description: "Use Geist Mono for code, commands, figures and small technical labels, not for decoration." },
] as const;

/** Typefaces, the type scale and a few principles for the Media page. */
export function Typography() {
  const { t } = useI18n();
  return (
    <div class={styles.wrap}>
      <ul class={styles.faces} role="list">
        <For each={FACES} keyed={(f) => f.name}>
          {(f) => (
            <li class={styles.face}>
              <div class={styles.faceHead}>
                <span class={styles.aa} style={{ "font-family": f().family }} aria-hidden="true">Aa</span>
                <div>
                  <h3 class={styles.faceName} style={{ "font-family": f().family }}>{f().name}</h3>
                  <p class={styles.faceRole}>{t(f().role)}</p>
                </div>
              </div>
              <p class={styles.faceText}>{t(f().description)}</p>
              <p class={styles.glyphs} style={{ "font-family": f().family }} aria-hidden="true">{GLYPHS}</p>
              <ul class={styles.weights} role="list">
                <For each={f().weights} keyed={(w) => w.value}>
                  {(w) => (
                    <li>
                      <span class={styles.weightSample} style={{ "font-family": f().family, "font-weight": w().value }}>{f().sample}</span>
                      <span class={styles.weightName}>{t(w().name)} {w().value}</span>
                    </li>
                  )}
                </For>
              </ul>
              <div class={styles.faceActions}>
                <Button href={f().href} icon="download" size="sm">{t("Get {name}", { name: f().name })}</Button>
              </div>
            </li>
          )}
        </For>
      </ul>
      <p class={styles.license}>
        {t("Geist and Geist Mono are open source under the SIL Open Font License. This site serves both from its own domain.")}
      </p>

      <h3 class={styles.subhead}>{t("Type scale")}</h3>
      <ul class={styles.scale} role="list">
        <For each={SCALE} keyed={(r) => r.label}>
          {(r) => (
            <li class={styles.row}>
              <div class={styles.rowMeta}>
                <span class={styles.rowLabel}>{t(r().label)}</span>
                <code class={styles.rowToken}>{r().token}</code>
              </div>
              <p class={styles.rowSample} style={{ "font-size": `var(${r().token})`, ...r().style }}>{t(r().sample)}</p>
            </li>
          )}
        </For>
      </ul>

      <h3 class={styles.subhead}>{t("Principles")}</h3>
      <ul class={styles.principles} role="list">
        <For each={PRINCIPLES} keyed={(p) => p.title}>
          {(p) => (
            <li class={styles.principle}>
              <h4>{t(p().title)}</h4>
              <p>{t(p().description)}</p>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
