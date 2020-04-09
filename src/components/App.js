import { useContext, lazy } from "solid-js";
import { RouteHOC, RouterContext } from "../router";
// import Link from "./Link";

import "./App.scss";

const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const Settings = lazy(() => import("../pages/Settings"));

const App = RouteHOC(() => {
  const [, { matches }] = useContext(RouterContext);
  return (
    <>
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
    </>
  );
});

export default App;
