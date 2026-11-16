import { useI18n } from "../../i18n";
import { URLS } from "../../site";
import { Button } from "../Button";
import { Icon } from "../Icon";
import styles from "./Support.module.css";

/** Call to action inside the Sponsors section: fund Solid through Open Collective, or buy something from the store. */
export function Support() {
  const { t } = useI18n();
  return (
    <aside class={styles.card} aria-labelledby="support-title">
        <span class={styles.icon}><Icon name="heart" size={26} /></span>
        <div class={styles.body}>
          <h2 id="support-title" class={styles.title}>{t("Support Solid financially")}</h2>
          <p class={styles.text}>
            {t("Solid is free and open source, built by volunteers and funded by people like you. Contributions through Open Collective pay for maintainers, infrastructure and events, and every expense is public.")}
          </p>
        </div>
        <div class={styles.actions}>
          <Button href={URLS.opencollective} variant="primary" size="lg" icon="opencollective">Donate on Open Collective</Button>
          <Button href="/store" size="lg" icon="shopping-bag">Visit the Solid Store</Button>
        </div>
    </aside>
  );
}
