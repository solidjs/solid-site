import { useContext, lazy } from "solid-js";
import { RouteHOC, RouterContext } from "../router";
import Link from "./Link";

import styles from "./App.scss";

const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const Settings = lazy(() => import("../pages/Settings"));

const App = RouteHOC(() => {
  const [, { matches }] = useContext(RouterContext);
  return (
    <>
      <ul class={styles.inline}>
        <li classList={{ [styles.selected]: matches("home") }}>
          <Link path="home">Home</Link>
        </li>
        <li classList={{ [styles.selected]: matches("profile") }}>
          <Link path="profile">Profile</Link>
        </li>
        <li classList={{ [styles.selected]: matches("settings") }}>
          <Link path="settings">Settings</Link>
        </li>
      </ul>
      <div class={styles.tab}>
        <Suspense fallback="Loading...">
          <Switch>
            <Match when={matches("home")}>
              <Home />
            </Match>
            <Match when={matches("profile")}>
              <Profile />
            </Match>
            <Match when={matches("settings")}>
              <Settings />
            </Match>
          </Switch>
        </Suspense>
      </div>
    </>
  );
});

export default App;
