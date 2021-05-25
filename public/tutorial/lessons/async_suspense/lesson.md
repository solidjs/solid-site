While `lazy` and Resources can be used on their own, Solid also provides a mechanism for coordinating the display of multiple async events. `Suspense` serves as a boundary that can show a fallback placeholder instead of the partially loaded content as these async events resolve.

This can improve user experience by removing visual jank caused by too many intermediate and partial loading states. `Suspense` automatically detects any descendant async reads and acts accordingly. You can nest as many `Suspense` components as needed and only the nearest ancestor will transform to fallback when loading state is detected.

> Todo Example