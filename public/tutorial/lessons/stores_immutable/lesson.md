Stores are most often created in Solid using Solid's State proxies. Sometimes we wish to interface with immutable libraries like Redux, Apollo, or XState and need to perform granular updates against these.

Solid provides a diffing method `reconcile` that enhances the `setState` call and lets us diff the data from these immutable sources only notifying the granular updates.

> Todo Example

The behavior of reconcile is configurable. A custom `key` can be set and there is a `merge` option which ignores structural cloning and only diffs the leaves.
