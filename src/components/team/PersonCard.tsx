import { Show } from "solid-js";
import { Avatar } from "../Avatar";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { githubUrl, type Person } from "../../team/people";
import styles from "./Team.module.css";

/** Maintainer card: round avatar, name, role, bio and profile links. */
export function PersonCard(props: { person: Person }) {
  return (
    <li class={styles.person}>
      <Avatar src={props.person.img} name={props.person.name} size={96} />
      <h3 class={styles.personName}>{props.person.name}</h3>
      <p class={styles.personRole}>{props.person.role}</p>
      <Show when={props.person.bio}>
        <p class={styles.personBio}>{props.person.bio}</p>
      </Show>
      <div class={styles.personLinks}>
        <Link href={githubUrl(props.person.github)} class={styles.iconLink} aria-label={`${props.person.name} on GitHub`}>
          <Icon name="github" size={20} />
        </Link>
      </div>
    </li>
  );
}
