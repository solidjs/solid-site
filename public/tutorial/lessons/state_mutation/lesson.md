Solid strongly recommends the use of shallow immutable patterns for updating state. By separating reads and writes we maintain better control over the reactivity of our system without the risk of losing track of changes to our proxy when passed through layers of components. This is much more amplified with State compared to Signals.

Sometimes, however, mutation is just easier to reason about. That's why Solid provides an Immer inspired `produce` state modifier that allows you to mutate a writable proxy version of your state object inside your `setState` call.

This is a nice tool to have to allow small zones of mutation without relinquishing control. Let's use `produce` on our Todos example by replacing our event handler code with:

```jsx
const addTodo = (text) => {
  setState(
    'todos',
    produce((todos) => {
      todos.push({ id: ++todoId, text, completed: false });
    }),
  );
};
const toggleTodo = (id) => {
  const index = state.todos.findIndex((t) => t.id === id);
  setState(
    'todos',
    index,
    produce((todo) => (todo.completed = !todo.completed)),
  );
};
```

While `produce` with State probably handles the vast majority of cases, Solid also has a mutable State object that is available from `createMutable`. While not the recommended approach for internal APIs it is sometimes useful for interopt or compatibility with 3rd party systems.
