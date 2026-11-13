import { For } from "solid-js";
import styles from "./highlight.module.css";

type Kind = "comment" | "string" | "keyword" | "number" | "tag" | "call" | "plain";
interface Token {
  kind: Kind;
  text: string;
}

const KEYWORDS =
  "import|from|export|const|let|function|return|yield|await|async|new|type|as|if|else|default";
// Order matters: comments and strings first so keywords inside them are not coloured.
const RE = new RegExp(
  [
    String.raw`(?<comment>\/\/[^\n]*)`,
    String.raw`(?<string>"(?:[^"\\]|\\.)*"|` + "`(?:[^`\\\\]|\\\\.)*`" + String.raw`)`,
    String.raw`(?<tag></?[A-Z][A-Za-z.]*|</?[a-z][a-z0-9]*)`,
    String.raw`(?<keyword>\b(?:${KEYWORDS})\b)`,
    String.raw`(?<number>\b\d+(?:\.\d+)?\b)`,
    String.raw`(?<call>\b[A-Za-z_$][\w$]*(?=\())`,
  ].join("|"),
  "g",
);

/** Tiny dependency-free tokenizer for the homepage's TS/TSX snippets. */
export function tokenize(code: string): Token[] {
  const out: Token[] = [];
  let last = 0;
  for (const m of code.matchAll(RE)) {
    if (m.index > last) out.push({ kind: "plain", text: code.slice(last, m.index) });
    const kind = (Object.keys(m.groups!).find((k) => m.groups![k] !== undefined) ?? "plain") as Kind;
    out.push({ kind, text: m[0] });
    last = m.index + m[0].length;
  }
  if (last < code.length) out.push({ kind: "plain", text: code.slice(last) });
  return out;
}

/** Highlighted code block. The <pre> is focusable so keyboard users can scroll it. */
export function CodeBlock(props: { code: string; label: string }) {
  const tokens = () => tokenize(props.code);
  return (
    <pre class={styles.pre} tabindex={0} aria-label={props.label}>
      <code>
        <For each={tokens()} keyed={false}>
          {(t) => <span class={styles[t().kind]}>{t().text}</span>}
        </For>
      </code>
    </pre>
  );
}
