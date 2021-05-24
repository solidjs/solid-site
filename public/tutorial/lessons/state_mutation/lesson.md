While Solid strongly recommends using shallow immutable patterns for updating state. The path syntax removes all the extraneous object cloning and verbosity. However, sometimes mutation is just easier to reason about. For that reason Solid provides an Immer inspired `produce` state modifier that allows you to mutate a writable proxy version of your state object inside your `setState` call.

This is a nice tool to have to allow small zones of mutation without relinquishing control.

> Todo Example

While `produce` with State probably handles the vast majority of cases Solid also has a mutable State object that is available from `createMutable`. While not the recommended approach for internal APIs it is sometimes useful for interopt or compatibility with 3rd party systems.