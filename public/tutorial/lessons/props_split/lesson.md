Merging props is not the only operation we do. Often we use destructuring to use some of the props on the current component but then split off others to pass through to components.

For this purpose Solid has `splitProps`. It takes the props object and arrays of keys representing each object we want to accept those props. It returns an array per argument, plus one. The last element in the array with be an object with the rest of the remaining props that weren't specified much like a rest parameter.

```jsx
// This destructuring
const { valueA, valueB, others... } = props;

// in Solid would be:
const [local, others] = splitProps(props, ["valueA", "valueB"])
```

> Todo Example