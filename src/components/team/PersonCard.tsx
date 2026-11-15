import { Show } from "solid-js";
import { Avatar } from "../Avatar";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { useI18n } from "../../i18n";
import { githubUrl, type Person } from "../../team/people";
import styles from "./Team.module.css";

/** Maintainer card: round avatar, name, role, bio and profile links. */
export function PersonCard(props: { person: Person }) {
  const { t } = useI18n();
  return (
    <li class={styles.person}>
      <Avatar src={props.person.img} name={props.person.name} size={96} />
      <h3 class={styles.personName}>
        <Link href={githubUrl(props.person.github)} class={styles.cardLink}>{props.person.name}</Link>
      </h3>
      <p class={styles.personRole}>{t(props.person.role)}</p>
      <Show when={props.person.bio}>
        <p class={styles.personBio}>{t(props.person.bio!)}</p>
      </Show>
      <div class={styles.personLinks}>
        <Link href={githubUrl(props.person.github)} class={styles.iconLink} aria-label={t("{name} on GitHub", { name: props.person.name })}>
          <Icon name="github" size={20} />
        </Link>
      </div>
    </li>
  );
}
