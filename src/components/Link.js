
import { useContext } from "solid-js";
import { RouterContext } from "../router";

import "./Link.scss";

const Link = (props) => {
  const [, {setLocation}] = useContext(RouterContext);
  const navigate = (e) => {
    if (e) e.preventDefault();
    window.history.pushState("", "", `/${props.path}.html`);
    setLocation(props.path);
  };
  return (
    <a class={styles.link} href={`/${props.path}.html`} onClick={navigate}>
      {props.children}
    </a>
  );
};

export default Link;
