import {
  createSignal,
  createContext,
  useTransition,
} from "solid-js";

// Super simplistic pushstate router that matches on absolute paths
const RouterContext = createContext();
function RouteHOC(Comp) {
  return (props = {}) => {
    const [location, setLocation] = createSignal(
        (props.url ? props.url : window.location.pathname.split(".")[0]).slice(
          1
        )
      ),
      matches = (match) => match === location(),
      [, start] = useTransition({ timeoutMs: 250 });
    return (
      <RouterContext.Provider
        value={[
          location,
          { setLocation: (v) => start(() => setLocation(v)), matches },
        ]}
      >
        <Comp />
      </RouterContext.Provider>
    );
  };
}

export { RouteHOC, RouterContext };
