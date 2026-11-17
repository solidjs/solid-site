import { createSignal, Show, type ParentProps } from "solid-js";
import { Icon, type IconName } from "./Icon";
import { Link } from "./Link";
import styles from "./Embeds.module.css";

/* Lightweight, dependency-free replacements for the embeds used by legacy articles. */

const NOTICE_ICON = { info: "info", warning: "warning", tip: "lightbulb" } as const satisfies Record<string, IconName>;

/** Callout box for MDX: `<Notice>`, `<Notice type="warning">`. */
export function Notice(props: ParentProps & { type?: keyof typeof NOTICE_ICON; title?: string }) {
  const type = () => props.type ?? "info";
  return (
    <aside class={[styles.notice, styles[type()]]} role="note">
      <Icon name={NOTICE_ICON[type()]} size={20} class={styles.noticeIcon} />
      <div class={styles.noticeBody}>
        <Show when={props.title}><strong>{props.title}</strong></Show>
        {props.children}
      </div>
    </aside>
  );
}

interface LiteEmbedProps {
  /** Accessible title of the player. */
  title: string;
  /** iframe URL, loaded only after the visitor clicks play (no third-party requests before that). */
  src: string;
  /** Link to open the media on its own site. */
  href: string;
  ratio?: string;
  allow?: string;
  /** Thumbnail shown behind the play button. Must be self-hosted: a third-party image would load before the click. */
  poster?: string;
}

function LiteEmbed(props: LiteEmbedProps) {
  const [active, setActive] = createSignal(false);
  return (
    <div class={styles.embed} data-poster={props.poster ? "" : undefined} style={{ "aspect-ratio": props.ratio ?? "16 / 9" }}>
      <Show
        when={active()}
        fallback={
          <button
            type="button"
            class={styles.play}
            style={props.poster ? { "background-image": `url("${props.poster}")` } : undefined}
            onClick={() => setActive(true)}
          >
            <span class={styles.playIcon}><Icon name="play" size={32} /></span>
            <span>Play: {props.title}</span>
            <small>Loads content from a third party when you click.</small>
          </button>
        }
      >
        <iframe
          class={styles.frame}
          src={props.src}
          title={props.title}
          allow={props.allow ?? "fullscreen; picture-in-picture; encrypted-media"}
          allowfullscreen
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
        />
      </Show>
      <Link class={styles.openLink} href={props.href} showExternalIcon>Open in new tab</Link>
    </div>
  );
}

/** Privacy-friendly YouTube embed (youtube-nocookie, loaded on click). */
export function YouTube(props: { youTubeId: string; title?: string; poster?: string }) {
  return (
    <LiteEmbed
      poster={props.poster}
      title={props.title ?? "YouTube video"}
      src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(props.youTubeId)}?autoplay=1&rel=0`}
      href={`https://www.youtube.com/watch?v=${encodeURIComponent(props.youTubeId)}`}
    />
  );
}

/** Twitch VOD embed (loaded on click). */
export function Twitch(props: { twitchId: string; title?: string }) {
  return (
    <LiteEmbed
      title={props.title ?? "Twitch video"}
      src={`https://player.twitch.tv/?video=v${encodeURIComponent(props.twitchId)}&parent=www.solidjs.com&autoplay=true`}
      href={`https://www.twitch.tv/videos/${encodeURIComponent(props.twitchId)}`}
    />
  );
}

/** Spotify episode embed (loaded on click). `spotifyLink` like "episode/2acyt1NRqjXMnX4LZqDyTV". */
export function Spotify(props: { spotifyLink: string; title?: string }) {
  return (
    <LiteEmbed
      title={props.title ?? "Spotify episode"}
      src={`https://open.spotify.com/embed/${props.spotifyLink}`}
      href={`https://open.spotify.com/${props.spotifyLink}`}
      ratio="16 / 5"
      allow="encrypted-media"
    />
  );
}

/** Tweet as a plain link card (no widgets.js). `tweetLink` like "user/status/123". */
export function Tweet(props: { tweetLink: string }) {
  const user = () => props.tweetLink.split("/")[0];
  return (
    <blockquote class={styles.tweet}>
      <Icon name="x" size={18} />
      <p>
        Post by <strong>@{user()}</strong>
      </p>
      <Link href={`https://x.com/${props.tweetLink}`} showExternalIcon inline>View on X</Link>
    </blockquote>
  );
}

