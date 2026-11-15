import { SITE_TAGLINE, SOLID_2, URLS } from "../../site";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Container } from "../Container";
import { CopyButton } from "../CopyButton";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { CREATE_COMMAND } from "./data";
import { HeroArt } from "./HeroArt";
import artStyles from "./HeroArt.module.css";
import { LiveStats } from "./Stats";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section class={styles.hero} aria-labelledby="home-title">
      <div class={styles.panel}>
        <HeroArt class={`${artStyles.art} ${styles.art}`} />
        <Container size="wide" class={styles.inner}>
          <Link href="/blog" class={styles.announce}>
            <Badge tone="brand">New</Badge>
            <span>Solid 2.0 is live. Read the latest</span>
            <Icon name="arrow-right" size={14} />
          </Link>
          <div class={styles.copy}>
            <h1 id="home-title" class={styles.title}>
              <span>Fine-grained reactivity.</span>
              <span>No virtual DOM.</span>
              <span class={styles.accent}>Async built in.</span>
            </h1>
            <div class={styles.side}>
              <p class={styles.lead}>
                {SITE_TAGLINE} Solid 2.0 adds first-class async, split effects and draft-first stores to the
                framework developers already love for its speed.
              </p>
              <div class={styles.actions}>
                <Button href={URLS.docs} variant="primary" size="lg">Read the docs</Button>
                <Button href={URLS.tutorial} size="lg">Take the tutorial</Button>
              </div>
              <div class={styles.install}>
                <Icon name="code" size={16} class={styles.prompt} />
                <code class={styles.command}>{CREATE_COMMAND}</code>
                <CopyButton text={CREATE_COMMAND} label="Copy create command" />
              </div>
              <p class={styles.note}>
                Solid {SOLID_2.version} is the current release.
              </p>
            </div>
          </div>
        </Container>
      </div>
      <Container size="wide">
        <LiveStats />
      </Container>
    </section>
  );
}
