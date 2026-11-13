import { Image } from "@kobalte/core/image";
import styles from "./Avatar.module.css";

export interface AvatarProps {
  src?: string;
  /** Person's name: used as alt text and to derive initials for the fallback. */
  name: string;
  /** Pixel size, default 48. */
  size?: number;
  class?: string;
}

const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join("");

/** Round avatar (Kobalte Image) with an initials fallback when the image is missing or fails. */
export function Avatar(props: AvatarProps) {
  return (
    <Image fallbackDelay={0} class={[styles.avatar, props.class]} style={{ "--avatar-size": `${props.size ?? 48}px` }}>
      <Image.Img class={styles.img} src={props.src} alt={props.name} loading="lazy" decoding="async" />
      <Image.Fallback class={styles.fallback} aria-hidden="true">{initials(props.name)}</Image.Fallback>
    </Image>
  );
}
