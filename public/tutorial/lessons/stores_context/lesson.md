Solid provides a Context API to pass data around without relying on passing through props. This is useful for hoisted state and global stores. Using Context has the benefit of being created as part of the reactive system and managed by it.

To get started we create a Context object. This object contains a `Provider` component used to inject our store. However, it is common practice to wrap the `Provider` components and `useContext`calls with versions already configured for the specific Context. And that's exactly what we are going to do in this tutorial.

> Todo Example
