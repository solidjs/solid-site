Lifecycles in Solid are few as everything lives and dies by the reactive system. The reactive system is created and updates synchronously so the only scheduling comes down to Effects which are pushed to the end of the update.

We've found that developers doing simple tasks don't often think this way so to make things a little easier we've aliased a non-tracking (never reruns) `createEffect` call with `onMount`. It is just an Effect call but you can use it with confidence that it will only run once for your component once all initial rendering is done.

> Todo Example