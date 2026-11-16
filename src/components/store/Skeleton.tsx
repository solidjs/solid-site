import { Repeat } from "solid-js";
import styles from "./Store.module.css";

/** Placeholder cards: the prerendered page, and the wait for Shopify. */
export function Skeleton() {
  return (
    <ul class={styles.grid} aria-hidden="true">
      <Repeat count={4}>
        {() => (
          <li class={styles.skeleton}>
            <span class={styles.skeletonImage} />
            <span class={styles.skeletonLine} />
          </li>
        )}
      </Repeat>
    </ul>
  );
}
