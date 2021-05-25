Most bundlers (like Webpack, Rollup, Parcel, Vite) automatically handle code splitting when you use a dynamic import. Solid's `lazy` method allows us to wrap the component's dynamic import for deferred lazy loading. The output is a Component that can be used as normal in our JSX template with the exception that internally it dynamically loads the underlying imported code when it is rendered the first time, halting that branch of rendering until the code is available.

> Todo Example
