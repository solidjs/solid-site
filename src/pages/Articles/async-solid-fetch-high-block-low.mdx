*This is part one of a deep dive into how Solid 2.0 handles async. Part one is about reads.*

Humor me for a moment. I want to open with a mental exercise. Or better yet, try this on your current codebase.

Pick one value your UI renders. It could be a user, a list, a setting. Something that lives in a component today. And now make it come from the server. Don't move anything. Don't redesign. Same component. Same screen. The value is just remote now.

*How many files did you touch?*

It should be one. A value that is async is still a value, it just takes 80ms to get there. But in most solutions you immediately are presented with this tension:

You could fetch and await inline but that means three things. You need to put the loading affordance right there. Every child doesn't appear until this is resolved. And you need to be aware of all async below you as you could be causing waterfalls. It is no wonder client side apps have classically had cascading loading spinner hell.

The best practice is the opposite. Lift the async fetches as high as you can to prevent waterfalls, and move the affordance down as low as you can to block less of the UI. But that means you touch every single component along the path. Props become `Promise<User>` and they no longer can participate in normal composed behavior. You can't format a user's name once and use it in three places without either blocking right there or pushing that logic down into the leaves. That isn't always an option if they are reusable components.

Every async value that is used in a framework has 4 distinct moments in its lifecycle: creating (the fetch), consuming (the await), blocking (the boundary), and reading (the JSX). Creating and reading are the same as synchronous values, but consuming and blocking create a unique tension that honestly is mirrored in JavaScript language itself with `async functions` and `await`. They become welded together. Except they serve different masters. Consume is a developer-experience decision. Block is a user-experience decision. You only get to make one choice.

![The tension between consuming and blocking on an async value](/img/blog/async-solid-fetch-high-block-low/consume-block-tension.png)

Solid's position is simple. This tension was never necessary. If we break this correlation at its poles, not only do you not have to make the dreaded choice, we can do the right thing automatically.

## A Memo That Happens to Be Async

That's all there is to it, really:

```tsx
import { createMemo, Loading } from "solid-js";

async function fetchStory(id: number): Promise<Story> {
  const res = await fetch(`/api/stories/${id}`);
  return res.json();
}

function StoryDetail(props) {
  const story = createMemo(() => fetchStory(props.id));

  return (
    <Loading fallback={<Skeleton />}>
      <article>
        <h1>{story().title}</h1>
        <p>{story().text}</p>
      </article>
    </Loading>
  );
}
```

There is no special primitive. No `loading` flag. No `story()?.title`. `story()` is a `Story`, not a `Story | undefined`. The types reflect what you see. If it is running, it is there.

`<Loading>` covers the subtree until its first real value resolves. When `props.id` changes later, the `fallback` does *not* come back. The old story stays on screen while the new one is in flight. Initial readiness and revalidation are different situations, and the framework treats them differently by default.

If that looks like suspiciously little code, good. That's the common thread here.

## Passing Props Isn't Reading

I've always contended that Solid's Signals are a bit of a superpower. But it doesn't get much more evident than this. Async is all about reads.

*Am I ready to display content? Is what I'm showing stale?*

Reads are what Signals have always solved. The same architecture that gave us fine-grained guarantees and performance points to the solution to our problem.

Components run once. There is no re-render, so there is no component to suspend on async. Components aren't the ones that wait. Even under a fallback, we never have to redo settled work.

JSX expressions and props compile to accessors that evaluate where they're *used*, not where they're written. So when a not-ready value flows through a component as a prop, nothing happens. Passing isn't reading. Only the expressions that actually consume the value participate in waiting.

This means with:

```tsx
function StoryPage(props) {
  const story = createMemo(() => fetchStory(props.id));
  return <StoryLayout story={story()} />;
}

function StoryLayout(props) {
  return (
    <div class="layout">
      <Sidebar />
      <main>
        <StoryDetail story={props.story} />
      </main>
    </div>
  );
}
```

`StoryLayout` renders immediately. The sidebar renders immediately. `story={story()}` looks like it should blow up — we're calling the accessor before the data exists — but that expression is lazy. It evaluates when `StoryDetail` finally reads `props.story.title`, and that's the only place waiting happens.

Derivations work the same way:

```tsx
function StoryDetail(props) {
  // A memo over an async value — no await, no .then
  const byline = createMemo(() => `${props.story.author} · ${props.story.points} points`);

  return (
    <header>
      <h1>{props.story.title}</h1>
      <p>{byline()}</p>
    </header>
  );
}
```

`byline` doesn't know `story` was async. It doesn't block the component. It becomes async itself. Under the hood, a read of a not-ready value throws a `NotReadyError` that the graph catches and retries on resolution. You'll never handle one yourself. It's why there are no promise types in any of these signatures. The promise stopped being your problem at the `createMemo` that created it.

Because this is all about reads, async rides the same graph flattening and isolation — children effectively become siblings — that gives Solid its clear execution model and extraordinary performance.

## Fetch High, Block Low

So let's do the two moves in the opening we thought we couldn't afford. Lift the fetch from `StoryDetail` up to the top of the app, and push the loading boundary down to wrap just the detail pane:

```tsx
function App() {
  const [selectedId, setSelectedId] = createSignal(1);
  const story = createMemo(() => fetchStory(selectedId()));

  return <StoryPage story={story()} onSelect={setSelectedId} />;
}

function StoryPage(props) {
  return (
    <div class="layout">
      <StoryList onSelect={props.onSelect} />
      <main>
        <Loading fallback={<DetailSkeleton />}>
          <StoryDetail story={props.story} />
        </Loading>
      </main>
    </div>
  );
}
```

The fetch now starts at the top, as early as possible. The skeleton now covers only the pane that actually waits. The list never flickers.

Notice anything? Do this same refactor with a *hardcoded story object*, a plain synchronous constant lifted from child to parent. It's identical. Same component structure. Same props. The async version costs exactly what the sync version costs, plus one `<Loading>` placed where the design wants a skeleton. A concession you'd always have to make.

Where you create a value is a performance decision. Where you block on it is a design decision. Neither is an architecture decision anymore, because neither touches the components between them.

## Nesting Isn't a Waterfall

The opening highlighted one more concern. When blocking, you'd better know about every `await` beneath you. Let's challenge that.

```tsx
function StoryDetail(props) {
  const story = createMemo(() => fetchStory(props.storyId));

  return (
    <article>
      <h1>{story().title}</h1>
      <p>{story().text}</p>
      <Comments storyId={props.storyId} />
    </article>
  );
}

function Comments(props) {
  const comments = createMemo(() => fetchComments(props.storyId));

  return (
    <ul>
      <For each={comments()}>{comment => <CommentRow comment={comment} />}</For>
    </ul>
  );
}
```

`Comments` sits below JSX that reads `story()`. In an await-based (or `use`) model that's a waterfall by construction. The child can't exist until the parent's data resolves. But here both requests run in parallel.

It's the same mechanism as earlier. Components run once, immediately. The whole tree mounts up front, and only the expressions that read async values wait. `Comments` never reads `story()`. It reads `props.storyId`, which is readily available. Requests are ordered by data dependency, not by where the UI design has the components sit.

That doesn't mean waterfalls are impossible. It means a real waterfall is now something you can see in the code:

```tsx
const story = createMemo(() => fetchStory(props.storyId));
const author = createMemo(() => fetchAuthor(story().authorId));
```

`author` can't start until `story` resolves as the id comes from the response. That's sequential because the data is sequential. But anything derived from the same input runs in parallel, however deeply it's nested.

## Pending Is a Question, Not State

Initial load is the easy part. What is more interesting is when a value you already have starts changing.

Let's add search:

```tsx
import { createSignal, createMemo, isPending, For } from "solid-js";

function Search() {
  const [query, setQuery] = createSignal("");
  const results = createMemo(() => searchStories(query()));

  return (
    <>
      <input onInput={e => setQuery(e.target.value)} />
      <ul class={{ stale: isPending(results) }}>
        <For each={results()}>{story => <ResultRow story={story} />}</For>
      </ul>
    </>
  );
}
```

When you type a character `query` changes, `results` recompute, and a request goes out. The old results stay on screen. No fallback. No unmount. No flash of skeleton. No special logic.

Instead we have `isPending(results)`, a new way to answer "Is this on the way?" This isn't global. It's not some app-wide trigger that will show spinners everywhere. It's a per signal question that can be asked anywhere. On the async source. Below the async source. On a derived prop. Even above an async source but below the source of change.

Here it dims the stale list. On a different page it disables a submit button.

That's the difference between state and a question. State has to live somewhere. A question can be answered anywhere.

## API-less Transitions

So now you click a story in the list. `selectedId` changes, the `story` memo goes pending, and the detail pane stays exactly where it is, showing the old story, until the new one is ready. Then it swaps in whole. At no point does the UI disagree with itself by combining stale and in-flight content.

If you've used React or Solid in the past you might know this behavior as "Transitions". In 2.0 the entire API is gone. The graph doesn't show inconsistent state because it *can't*. Pending signals hold their previous value, and everything derived from them holds too, until the whole update is ready to land together.

What was previously an opt-in is now the default. If you want the user to feel the navigation, that's what `isPending` is for:

```tsx
function App() {
  const [selectedId, setSelectedId] = createSignal(1);

  return (
    <>
      <StoryList selectedId={selectedId()} onSelect={setSelectedId} />
      <main class={{ pending: isPending(selectedId) }}>
        <StoryPage storyId={selectedId()} />
      </main>
    </>
  );
}
```

This time the fetch lives inside `StoryPage` — where a real router would put it, with the page that owns it.

`App` knows nothing about the fetch now. But `isPending(selectedId)` doesn't care. Change starts with the write and it holds until everything is settled. The source signal is the first to know regardless of where the async lives.

When you click a story, the highlight doesn't move. It holds its old value like everything else. If it moved early, you'd have the new selection pointing at the old content. Pair the pending class with a short CSS transition delay and the pane only greys out when the swap is slow enough to notice.

And if the design wants the highlight to move on click? We have a primitive for that. `latest(selectedId)` hands you the value the graph is still working toward. Two questions: `isPending` for "is something coming?", `latest` for "what is it?" Each gets asked exactly where the design needs the answer.

```tsx
function App() {
  const [selectedId, setSelectedId] = createSignal(1);

  return (
    <>
      <StoryList selectedId={latest(selectedId)} onSelect={setSelectedId} />
      <main class={{ pending: isPending(selectedId) }}>
        <StoryPage storyId={selectedId()} />
      </main>
    </>
  );
}
```

You didn't start a transition. You set a signal. Reactivity did the rest.

## The Graph Always Knows

If you've been following, the fetch now has lived at every level of this app: in the details component, in the page, at the root, and back in the page again. Each with almost no consequence and with little code change.

Latency is a property of the value now and is queryable. In a true Solid manner Components just disappear. They are functions that happened to be called once. You fetch high because it's fast, and you block low because it's good design. For the first time those are free.

So while this is a performance win as unnecessary waterfalls fall away as a consequence of the design, the real win is the freedom to arrange your async, your affordances, your components, your code the way that makes sense to you. Not defined by the structure of the framework. It's the same promise that synchronous Solid's Signals provided and now it completes the whole async story as well.

That's reads. Writes are better. Until next week.
