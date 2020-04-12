import { useContext, lazy } from "solid-js";
import { RouteHOC, RouterContext } from "../router";
// import Link from "./Link";

import "./App.scss";

const Index = lazy(() => import("../pages/Index"));
const Profile = lazy(() => import("../pages/Profile"));
const Settings = lazy(() => import("../pages/Settings"));

const App = RouteHOC(() => {
  const [, { matches }] = useContext(RouterContext);
  return <>
    <Suspense fallback="Loading...">
      <Switch>
        <Match when={matches("index")}>
          <Index />
        </Match>
        <Match when={matches("profile")}>
          <Profile />
        </Match>
        <Match when={matches("settings")}>
          <Settings />
        </Match>
      </Switch>
    </Suspense>
  </>;
});

export default App;
