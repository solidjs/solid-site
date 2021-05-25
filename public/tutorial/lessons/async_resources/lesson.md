Resources are special Signals made specifically to handle Async loading. They can be driven by a source signal that provides the query to a async data fetcher function that returns a promise.

The contents of fetcher function can be anything. You can hit typical REST endpoints or GraphQL or anything that generates a promise. Resources are not opinionated on the means you load the data only that they are driven by promises.

The resulting Resource Signal, also contains reactive `loading` and `error` properties that make it easy to control our view based on the current status.

> Todo Example