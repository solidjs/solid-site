import { For } from "solid-js";
import { COPYRIGHT_HOLDER, COPYRIGHT_YEAR, FOOTER_COLUMNS, isExternalHref, LICENSE_NOTE, SITE_NAME, SITE_TAGLINE, SOCIAL_LINKS, SOLID_2 } from "../site";
import { Badge } from "./Badge";
import { Container } from "./Container";
import { Icon } from "./Icon";
import { Link } from "./Link";
import { Logo } from "./Logo";
import { Separator } from "./Separator";
import styles from "./Footer.module.css";

/** Multi-column site footer: brand + tagline, link columns, then a bottom bar with copyright, licence and socials. */
export function Footer() {
  return (
    <footer class={styles.footer}>
      <Container size="wide">
        <div class={styles.grid}>
          <div class={styles.brand}>
            <a href="/" aria-label={`${SITE_NAME} home`} class={styles.logo}>
              <Logo height={26} />
            </a>
            <p class={styles.tagline}>{SITE_TAGLINE}</p>
            <Badge tone="brand">Solid 2.0: {SOLID_2.status}</Badge>
          </div>
          <For each={FOOTER_COLUMNS} keyed={(c) => c.title}>
            {(col) => (
              <nav class={styles.column} aria-label={col().title}>
                <h2 class={styles.heading}>{col().title}</h2>
                <ul role="list" class={styles.list}>
                  <For each={col().links} keyed={(l) => l.href}>
                    {(link) => (
                      <li>
                        <Link href={link().href} class={styles.link} showExternalIcon={isExternalHref(link().href)}>
                          {link().label}
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
            &copy; {COPYRIGHT_YEAR} {COPYRIGHT_HOLDER}. {LICENSE_NOTE}
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
