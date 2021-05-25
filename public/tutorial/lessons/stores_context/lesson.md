Solid provides a Context API to pass data around without relying on passing through props. This is useful for hoisted state and global stores. Using Context has the benefit of being created as part of the reactive system and managed by it.

To get started we create a Context object. This object contains a `Provider` component used to inject our store. However, it is common practictice to wrap the providers in `useContext`calls. And that's exactly what we are going to do in the example below.

> Todo Example
