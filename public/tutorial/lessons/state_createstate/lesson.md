State is Solid's answer to nested reactivity. It is a proxy object whose properties can be tracked and can contain other objects which automatically become wrapped in proxies themselves, and so on.

To keep things light Solid only creates underlying signals for properties that are accessed under tracking scopes. And so, all signals in State are created lazily as requested.

The `createState` call takes the initial value and returns a read/write tuple similar to Signals. The first element is the state proxy which is readonly, and the second is a setter function.

The setter function in its most basic form takes an object whose properties will be merged with the current state. It also supports path syntax so that we can do nested updates. In this way we can still maintain control of our reactivity but do pinpoint updates.

> Solid's path syntax has many forms and includes some powerful syntax to do iteration and ranges. Refer to the API documentation for a full reference.

Let's look at how much easier it is to achieve nested reactivity with State. We can replace the initialization of our component with this:

```js
const [state, setState] = createState({ todos: [] });
const addTodo = (text) => {
  setState('todos', (todos) => [...todos, { id: ++todoId, text, completed: false }]);
};
const toggleTodo = (id) => {
  const index = state.todos.findIndex((t) => t.id === id);
  setState('todos', index, 'completed', (completed) => !completed);
};
```

We make use of State's path syntax with function setters that allow us to take the previous state and return the new state on nested values.

And that's it. The rest of the template will already react granularly (check the Console on clicking the checkbox).
