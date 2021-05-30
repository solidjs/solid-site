Solid supports custom directives through the `use:` namespace. This is just a syntax sugar over `ref` but is useful in that it resembles typical bindings and there can be multiple on the same element without conflict. This makes it better tool for reusable DOM element behavior.

Custom directives are simply functions in the form `(element, valueAccesor)` where `valueAccessor` is a function that retrieves the bindings value. As long as the function is imported in scope you can use it with `use:`.

> Important: `use:` is detected by the compiler to be transformed, and the function is required to be in scope, so it cannot be part of spreads or applied to a component.

> Todo Example