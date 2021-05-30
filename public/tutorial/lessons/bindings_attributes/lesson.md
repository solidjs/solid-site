Solid uses JSX for its templating. Components only render once so the compiler looks at the structure of the JSX to decide how to setup Effects to update the DOM. This is done with a simple heuristic.

Dynamic attributes in JSX are expressions wrapped in `{ }`. However, only those that access Signals can update. So Solid's compiler only wraps expressions that contain function calls. This also includes object property access (`obj.property`) as object getters and proxies can hold Signals.

> Todo Example