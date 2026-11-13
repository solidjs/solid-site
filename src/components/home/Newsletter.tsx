import { For } from "solid-js";
import { SOCIAL_LINKS } from "../../site";
import { Button } from "../Button";
import { Container } from "../Container";
import styles from "./Newsletter.module.css";

/**
 * The previous site posted emails to newsletter.solidjs.com, which no longer answers. Rather than
 * ship a form that cannot submit, this band links to the channels where news is published.
 * TODO(content): replace with a real signup form once a newsletter endpoint exists.
 */
export function Newsletter() {
  return (
    <section class={styles.band} aria-labelledby="stay-title">
      <Container class={styles.inner}>
        <div>
          <h2 id="stay-title" class={styles.title}>Stay in the loop</h2>
          <p class={styles.text}>
            Release news and community updates land on the blog first, then on our social channels.
          </p>
        </div>
        <div class={styles.actions}>
          <Button href="/blog" variant="primary">Read the blog</Button>
          <For each={SOCIAL_LINKS.slice(0, 3)} keyed={(s) => s.label}>
            {(s) => <Button href={s().href} icon={s().icon}>{s().label}</Button>}
          </For>
        </div>
      </Container>
    </section>
  );
}
