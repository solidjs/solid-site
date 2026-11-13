/**
 * Runnable Solid 2.0 RC examples for the homepage REPL. Each one is a complete app whose entry file
 * is `main.tsx` (the REPL convention). Keep them valid per the solid2 reference: they execute live.
 */
export interface ReplFile {
  name: string;
  source: string;
}

const MOUNT = `render(() => <App />, document.getElementById("app")!);`;

export const ASYNC_EXAMPLE: ReplFile[] = [
  {
    name: "main.tsx",
    source: `import { createMemo, createSignal, isPending, Loading } from "solid-js";
import { render } from "@solidjs/web";

const ROLES = ["Maintainer", "Contributor", "Author"];

// A stand-in for a network request.
const fetchUser = (id: number) =>
  new Promise<{ name: string; role: string }>((resolve) =>
    setTimeout(() => resolve({ name: \`User #\${id}\`, role: ROLES[id % 3] }), 800),
  );

function App() {
  const [id, setId] = createSignal(1);
  // A memo can return a promise. Reads suspend the nearest <Loading>.
  const user = createMemo(() => fetchUser(id()));

  return (
    <>
      <button onClick={() => setId(id() + 1)}>Next user</button>
      {/* First load shows the fallback; later loads keep the old UI on screen. */}
      <Loading fallback={<p>Loading…</p>}>
        <h2 style={{ opacity: isPending(() => user()) ? 0.4 : 1 }}>{user().name}</h2>
        <p>{user().role}</p>
      </Loading>
    </>
  );
}

${MOUNT}
`,
  },
];

export const EFFECTS_EXAMPLE: ReplFile[] = [
  {
    name: "main.tsx",
    source: `import { createEffect, createSignal } from "solid-js";
import { render } from "@solidjs/web";

function App() {
  const [count, setCount] = createSignal(0);
  let out!: HTMLPreElement;
  const log = (line: string) => out.append(line + "\\n");

  createEffect(
    // compute: tracked reads only. This half decides the dependencies.
    () => count(),
    // apply: side effects. Runs untracked, and can return a cleanup.
    (value) => {
      log(\`apply: count is \${value}\`);
      return () => log(\`cleanup: leaving \${value}\`);
    },
  );

  return (
    <>
      <button onClick={() => setCount(count() + 1)}>Clicked {count()} times</button>
      <pre ref={out} />
    </>
  );
}

${MOUNT}
`,
  },
];

export const STORES_EXAMPLE: ReplFile[] = [
  {
    name: "main.tsx",
    source: `import { createStore, For } from "solid-js";
import { render } from "@solidjs/web";

function App() {
  const [state, setState] = createStore({
    user: { name: "Ada" },
    todos: ["Try Solid 2.0"],
  });

  return (
    <>
      <h2>{state.user.name}'s list</h2>
      <button
        onClick={() =>
          // Setters hand you a draft: write to it like plain objects and arrays.
          setState((s) => {
            s.user.name = s.user.name === "Ada" ? "Grace" : "Ada";
            s.todos.push(\`Task \${s.todos.length + 1}\`);
          })
        }
      >
        Update draft
      </button>
      <ul>
        <For each={state.todos}>{(todo) => <li>{todo}</li>}</For>
      </ul>
    </>
  );
}

${MOUNT}
`,
  },
];

export const ACTIONS_EXAMPLE: ReplFile[] = [
  {
    name: "main.tsx",
    source: `import { action, createOptimisticStore, For, Loading, refresh } from "solid-js";
import { render } from "@solidjs/web";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// A pretend server that takes a moment to answer.
let saved = ["Try Solid 2.0"];
const api = {
  list: async () => {
    await sleep(300);
    return [...saved];
  },
  add: async (todo: string) => {
    await sleep(1200);
    saved = [...saved, todo];
  },
};

function App() {
  const [todos, setTodos] = createOptimisticStore<string[]>(() => api.list(), []);

  const addTodo = action(function* (todo: string) {
    setTodos((list) => {
      list.push(todo); // shows right away, reverts when the action settles
    });
    yield api.add(todo); // the request
    refresh(todos); // reconcile with the server
  });

  return (
    <Loading fallback={<p>Loading…</p>}>
      <button onClick={() => addTodo(\`Task \${saved.length + 1}\`)}>Add todo (1.2s request)</button>
      <ul>
        <For each={todos}>{(todo) => <li>{todo}</li>}</For>
      </ul>
    </Loading>
  );
}

${MOUNT}
`,
  },
];
