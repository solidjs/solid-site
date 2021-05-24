State is Solid's answer to nested reactivity. It is a proxy object whose properties can be tracked and can contain other objects which automatically become wrapped in proxies themselves, and so on.

To keep things light Solid only creates underlying signals for properties that are accessed under tracking scopes. And so, all signals in State are created lazily as requested.

The `createState` call takes the initial value and returns a read/write tuple similar to Signals. The first element is the state proxy which is readonly, and the second is a setter function. The `setState` function in its most basic form takes an object whose properties will be merged with the current state.

We can also define getters in our state definition to define calculated values or wrap other reactive primitives.

> Todo Example

By separating reads and writes (getters and setters) we maintain better control over the reactivity of our system without the risk of losing track of changes to our proxy when passed through layers of components.
