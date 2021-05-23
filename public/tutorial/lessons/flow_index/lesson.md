Sometimes there is no good reference to compare rows when dealing with primitives or arrays of arrays. In these cases, conceptually, the index is the key to the list. For that we have the `<Index>`.

`<Index>` has a similar signature to to `<For>` except this time the item is the signal and the index is fixed.

```jsx
<Index each={cats()}>{(cat, i) =>
  <li>
    <a target="_blank" href={`https://www.youtube.com/watch?v=${cat().id}`}>
      {i + 1}: {cat().name}
    </a>
  </li>
}</Index>
```
