/**
 * Runnable Solid 2.0 examples for the homepage REPL. Each one is a complete app whose entry file
 * is `main.tsx` (the REPL convention). Keep them valid per the solid2 reference: they execute live.
 * They follow the v2 tutorials (solidjs/solid-docs, src/tutorials) so the homepage and the tutorial teach the same shapes.
 */
export interface ReplFile {
  name: string;
  source: string;
}

const MOUNT = `render(() => <App />, document.getElementById("app")!);`;

export const ASYNC_EXAMPLE: ReplFile[] = [
  {
    name: "main.tsx",
    source: `import { createMemo, createSignal, For, isPending, Loading } from "solid-js";
import { render } from "@solidjs/web";

const CITIES: Record<string, string[]> = {
  California: ["Los Angeles", "San Francisco", "San Diego"],
  Florida: ["Miami", "Orlando", "Tampa"],
  "New York": ["New York City", "Buffalo", "Rochester"],
  Texas: ["Houston", "Dallas", "Austin"],
};

// Stand-ins for network requests.
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const getStates = async () => (await sleep(500), Object.keys(CITIES));
const getCities = async (state: string) => (await sleep(500), CITIES[state] ?? []);

function App() {
  // Async memos read like plain values, even when one depends on another.
  const states = createMemo(getStates);
  const [state, setState] = createSignal(() => states()[0]);
  const cities = createMemo(() => getCities(state()));
  // A writable signal derived from the list: picking a new state resets the
  // city on its own, with no effect to keep them in sync.
  const [city, setCity] = createSignal(() => cities()[0]);

  return (
    <Loading fallback={<p>Loading…</p>}>
      <select onChange={(e) => setState(e.currentTarget.value)}>
        <For each={states()}>{(name) => <option>{name}</option>}</For>
      </select>{" "}
      <select disabled={isPending(cities)} onChange={(e) => setCity(e.currentTarget.value)}>
        <For each={cities()}>{(name) => <option>{name}</option>}</For>
      </select>
      <p>
        Selection: {city()}, {state()}
      </p>
    </Loading>
  );
}

${MOUNT}
`,
  },
];

export const STORES_EXAMPLE: ReplFile[] = [
  {
    name: "main.tsx",
    source: `import { createMemo, createStore, For } from "solid-js";
import { render } from "@solidjs/web";

type Item = { id: number; name: string; price: number; qty: number };

function App() {
  const [cart, setCart] = createStore<{ items: Item[] }>({
    items: [
      { id: 1, name: "Stickers", price: 3, qty: 2 },
      { id: 2, name: "T-shirt", price: 25, qty: 1 },
    ],
  });
  const total = createMemo(() => cart.items.reduce((sum, item) => sum + item.price * item.qty, 0));
  let nextId = 3;

  // Setters hand you a draft: change it like a plain object. Only what you
  // touched updates, so a quantity change re-renders one number, not the row.
  const change = (id: number, by: number) =>
    setCart((draft) => {
      const index = draft.items.findIndex((item) => item.id === id);
      draft.items[index].qty += by;
      if (draft.items[index].qty === 0) draft.items.splice(index, 1);
    });

  const addMug = () =>
    setCart((draft) => {
      draft.items.push({ id: nextId, name: \`Mug #\${nextId++}\`, price: 12, qty: 1 });
    });

  return (
    <>
      <ul>
        <For each={cart.items} fallback={<li>Your cart is empty.</li>}>
          {(item) => (
            <li>
              {item.name}: {item.qty} × \${item.price}{" "}
              <button onClick={() => change(item.id, 1)}>+</button>
              <button onClick={() => change(item.id, -1)}>−</button>
            </li>
          )}
        </For>
      </ul>
      <button onClick={addMug}>Add a mug</button>
      <p>Total: \${total()}</p>
    </>
  );
}

${MOUNT}
`,
  },
];

export const PROJECTIONS_EXAMPLE: ReplFile[] = [
  {
    name: "main.tsx",
    source: `import { createProjection, createSignal, For } from "solid-js";
import { render } from "@solidjs/web";

const ROWS = Array.from({ length: 1000 }, (_, id) => ({ id, label: \`Row \${id}\` }));

function App() {
  const [selected, setSelected] = createSignal(0);
  const [checked, setChecked] = createSignal(ROWS.length);

  // A projection is a store derived from other state. A click changes two
  // keys, so only the two rows that read them update, not all 1,000.
  let previous: number | undefined;
  const selection = createProjection<Record<number, true>>((draft) => {
    const id = selected();
    if (previous !== undefined) delete draft[previous];
    draft[id] = true;
    previous = id;
  }, {});

  let checks = 0;
  const isSelected = (id: number) => {
    checks++;
    return !!selection[id];
  };
  const select = (id: number) => {
    checks = 0;
    setSelected(id);
    setTimeout(() => setChecked(checks));
  };

  return (
    <>
      <p>Rows that re-ran on the last click: {checked()}</p>
      <ul style={{ height: "240px", overflow: "auto", padding: 0 }}>
        <For each={ROWS}>
          {(row) => (
            <li
              style={{ "list-style": "none", cursor: "pointer", "font-weight": isSelected(row.id) ? "bold" : "normal" }}
              onClick={() => select(row.id)}
            >
              {row.label}
            </li>
          )}
        </For>
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
    source: `import { action, createOptimisticStore, createSignal, For, Loading, refresh } from "solid-js";
import { render } from "@solidjs/web";

type Todo = { id: number; text: string; done: boolean; pending?: boolean };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// A pretend server. Saves take a second, and you can make the next one fail.
let saved: Todo[] = [
  { id: 1, text: "Read the docs", done: true },
  { id: 2, text: "Try optimistic actions", done: false },
];
let nextId = 3;
const api = {
  failNext: false,
  async list() {
    await sleep(200);
    return structuredClone(saved);
  },
  async save(update: (todos: Todo[]) => Todo[]) {
    await sleep(1000);
    if (api.failNext) {
      api.failNext = false;
      throw new Error("The server rejected that change.");
    }
    saved = update(saved);
  },
};

function App() {
  const [todos, setTodos] = createOptimisticStore<Todo[]>(() => api.list(), []);
  const [error, setError] = createSignal("");

  // Write the change you expect, then do the real work. The guess shows at once
  // and is discarded when the action settles, so a failure needs no rollback code.
  const toggle = action(function* (id: number) {
    setTodos((draft) => {
      const todo = draft.find((todo) => todo.id === id)!;
      todo.done = !todo.done;
      todo.pending = true;
    });
    yield api.save((list) => list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    refresh(todos);
  });

  const add = action(function* (text: string) {
    const todo = { id: nextId++, text, done: false };
    setTodos((draft) => {
      draft.push({ ...todo, pending: true });
    });
    yield api.save((list) => [...list, todo]);
    refresh(todos);
  });

  const run = (result: Promise<void>) => {
    setError("");
    result.catch((err: Error) => setError(err.message));
  };

  return (
    <Loading fallback={<p>Loading todos…</p>}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const input = event.currentTarget.elements.namedItem("text") as HTMLInputElement;
          if (input.value.trim()) run(add(input.value.trim()));
          input.value = "";
        }}
      >
        <input name="text" placeholder="New todo" /> <button>Add</button>
      </form>
      <For each={todos}>
        {(todo) => (
          <label style={{ display: "block", opacity: todo.pending ? 0.5 : 1 }}>
            <input type="checkbox" checked={todo.done} onChange={() => run(toggle(todo.id))} /> {todo.text}
          </label>
        )}
      </For>
      <label>
        <input type="checkbox" onChange={(event) => (api.failNext = event.currentTarget.checked)} /> Fail the next save
      </label>
      <p role="alert">{error()}</p>
    </Loading>
  );
}

${MOUNT}
`,
  },
];
