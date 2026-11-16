import { useI18n } from "../../i18n";
import { Button } from "../Button";
import { Container } from "../Container";
import { Icon } from "../Icon";
import styles from "./StoreCallout.module.css";

/** Call out to the Solid Store, below the newsletter band. */
export function StoreCallout() {
  const { t } = useI18n();
  return (
    <section class={styles.band} aria-labelledby="store-callout-title">
      <Container class={styles.inner}>
        <span class={styles.icon}><Icon name="shopping-bag" size={26} /></span>
        <div class={styles.body}>
          <h2 id="store-callout-title" class={styles.title}>{t("Rep Solid with stickers and swag")}</h2>
          <p class={styles.text}>{t("Shirts, stickers, mugs and more from the Solid Store. All profits go to Solid's Open Collective.")}</p>
        </div>
        <Button href="/store" variant="primary" size="lg" iconAfter="arrow-right">Visit the Solid Store</Button>
      </Container>
    </section>
  );
}
