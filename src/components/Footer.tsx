import { For } from "solid-js";
import { useI18n } from "../i18n";
import { COPYRIGHT_HOLDER, COPYRIGHT_YEAR, FOOTER_COLUMNS, isExternalHref, LICENSE_URL, SITE_NAME, SITE_TAGLINE, SOCIAL_LINKS } from "../site";
import { Badge } from "./Badge";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { Link } from "./Link";
import { Logo } from "./Logo";
import { Separator } from "./Separator";
import styles from "./Footer.module.css";

/** Multi-column site footer: brand + tagline, link columns, then a bottom bar with copyright, licence and socials. */
export function Footer() {
  const { t, tSplit, localePath } = useI18n();
  // "Released under the {license}." is translated as one sentence (word order differs by language), then split around
  // the placeholder so the licence name can be a link.
  const licenseSentence = () => tSplit("Released under the {license}.", "license");
  return (
    <footer class={styles.footer}>
      <Container size="wide">
        <div class={styles.grid}>
          <div class={styles.brand}>
            <a href={localePath("/")} aria-label={t("{name} home", { name: SITE_NAME })} class={styles.logo}>
              <Logo height={26} />
            </a>
            <p class={styles.tagline}>{t(SITE_TAGLINE)}</p>
            <Badge tone="brand">{t("Solid 2.0 is live")}</Badge>
          </div>
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
        <Separator />
        <div class={styles.bottom}>
          <p class={styles.legal}>
            {t("© {year} {holder}.", { year: COPYRIGHT_YEAR, holder: COPYRIGHT_HOLDER })} {licenseSentence()[0]}
            <Link href={LICENSE_URL} inline>{t("MIT License")}</Link>
            {licenseSentence()[1]}
          </p>
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
        </div>
      </Container>
    </footer>
  );
}
