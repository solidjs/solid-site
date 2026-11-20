import { For } from "solid-js";
import { useI18n } from "../i18n";
import { COPYRIGHT_HOLDER, COPYRIGHT_YEAR, FOOTER_COLUMNS, isExternalHref, LICENSE_URL, SITE_NAME, SOCIAL_LINKS, SOLID_2 } from "../site";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Link } from "./Link";
import styles from "./Footer.module.css";

/** Multi-column site footer: brand + tagline, link columns, then a bottom bar with copyright, licence and socials. */
export function Footer() {
  const { t, tSplit, localePath, locale } = useI18n();
  // "Released under the {license}." is translated as one sentence (word order differs by language), then split around
  // the placeholder so the licence name can be a link.
  const licenseSentence = () => tSplit("Released under the {license}.", "license");
  return (
    <footer class={styles.footer}>
      <Container size="wide">
        <div class={styles.panel}>
          <div class={styles.top}>
            <a href={localePath("/")} aria-label={t("{name} home", { name: SITE_NAME })} class={styles.stat}>
              <span class={styles.statValue}>{SOLID_2.version}</span>
              <span class={styles.statLabel}>{t("Solid 2.0 is live")}</span>
            </a>
            <div class={styles.actions}>
            <ul role="list" class={styles.social}>
              <For each={SOCIAL_LINKS} keyed={(s) => s.href}>
                {(s) => (
                  <li>
                    <Link href={s().href} class={styles.socialLink} aria-label={s().label}>
                      <Icon name={s().icon} size={18} />
                    </Link>
                  </li>
                )}
              </For>
            </ul>
            <div class={styles.lang}>
              <LanguageSwitcher />
            </div>
            </div>
          </div>
          <div class={styles.grid}>
            <For each={FOOTER_COLUMNS} keyed={(c) => c.title}>
              {(col) => (
                <nav class={styles.column} aria-label={t(col().title)}>
                  <h2 class={styles.heading}>{t(col().title)}</h2>
                  <ul role="list" class={styles.list}>
                    <For each={col().links} keyed={(l) => l.href}>
                      {(link) => (
                        <li>
                          <Link href={link().href} class={styles.link} showExternalIcon={isExternalHref(link().href)}>
                            {t(link().label)}
                          </Link>
                        </li>
                      )}
                    </For>
                  </ul>
                </nav>
              )}
            </For>
          </div>
          <div class={styles.bottom}>
            <div class={styles.legalBlock}>
              <p class={styles.legal}>
                {t("© {year} {holder}.", { year: COPYRIGHT_YEAR, holder: COPYRIGHT_HOLDER })} {licenseSentence()[0]}
                <Link href={LICENSE_URL} inline class={styles.legalLink}>{t("MIT License")}</Link>
                {licenseSentence()[1]}
              </p>
              <p class={styles.build}>
                {t("Last published {date} · SolidBase {version}", {
                  date: new Intl.DateTimeFormat(locale().lang, { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${__BUILD_DATE__}T00:00:00Z`)),
                  version: __SOLIDBASE_VERSION__,
                })}
              </p>
            </div>
          </div>
          <div class={styles.wordmark} aria-hidden="true">solid</div>
        </div>
      </Container>
    </footer>
  );
}
