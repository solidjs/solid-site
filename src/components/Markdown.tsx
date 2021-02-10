import 'prismjs/themes/prism.css';

import Prism, { highlight, languages } from 'prismjs';
import markdownTreeParser from 'markdown-tree-parser';
import { Component, createEffect, createMemo, onCleanup } from 'solid-js';

import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';

addJSXSupport();

const Markdown: Component<{ onLoadSections?: Function; onSectionChange?: Function }> = (props) => {
  const doc = createMemo(() => {
    const { ast } = markdownTreeParser(props.children);
    return htmlFromAst(ast);
  });

  createEffect(() => {
    if (!props.onLoadSections) return;
    const { sections } = doc();
    props.onLoadSections(sections);

    // TODO: Make it work in both scroll direction
    const observer = new IntersectionObserver(
      ([anchor]) => {
        if (anchor.boundingClientRect.top < 0) return;

        const url = new URL(location.href);
        url.hash = `#${anchor.target.id}`;

        history.replaceState(null, anchor.target.id, url.href);

        props.onSectionChange && props.onSectionChange(url.hash);
      },
      { root: null, threshold: 0 },
    );

    for (const section of sections) observer.observe(section.anchor);

    onCleanup(() => observer && observer.disconnect());
  });

  return <div class="leading-8">{doc().content}</div>;
};

export default Markdown;

function slugify(text: string) {
  return text
    .toString() // Cast to string
    .toLowerCase() // Convert the string to lowercase letters
    .normalize('NFD') // The normalize() method returns the Unicode Normalization Form of a given string.
    .trim() // Remove whitespace from both sides of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

export interface Section {
  id: string;
  title: string;
  anchor: HTMLAnchorElement;
}

function htmlFromAst(nodes?: any[]): { sections: Section[]; content: '' | any[] } {
  const sections = [];

  if (!nodes || !nodes.length) {
    return { sections, content: '' };
  }

  const content = nodes.map((node) => {
    switch (node.name) {
      case 'heading':
        /**
         * We create an empty anchor link here that will
         * be inserted into each header as absolute and positionned
         * 80px (size of the header) above the heading. This way
         * we can smoothly scrool to that title without it being
         * hidden under the sticky header atop.
         */
        const anchor = document.createElement('a');
        anchor.classList.add('absolute');
        anchor.style.bottom = 'calc(100% + 80px)';
        const el = document.createElement(`h${node.level}`);
        el.classList.add(
          'pb-3',
          !sections.length ? 'mb-5' : 'my-5',
          `text-${3 - node.level}xl`,
          'border-b',
          'text-solid',
          'relative',
        );
        el.append(...htmlFromAst(node.values).content);
        anchor.setAttribute('id', slugify(el.innerHTML));
        el.prepend(anchor);
        const title = document.createElement('textarea');
        title.innerHTML = el.textContent;
        if (node.level <= 2) {
          sections.push({ id: anchor.id, title: title.value, anchor });
        }
        return el;
      case 'orderedlist':
        return (
          <ol class="list-decimal ml-9 my-4">
            {node.values.map((item) => (
              <li>{htmlFromAst([item]).content}</li>
            ))}
          </ol>
        );
      case 'list':
        return (
          <ul class="list-disc ml-9 my-4">
            {node.values.map((item) => (
              <li>{htmlFromAst([item]).content}</li>
            ))}
          </ul>
        );
      case 'link':
        return (
          <a class="text-gray-500 hover:text-solid" href={node.href}>
            {node.title}
          </a>
        );
      case 'italic':
        return <em>{node.value}</em>;
      case 'blockquote':
        const content = node.values.map(({ value }) => {
          const { ast } = markdownTreeParser(value);
          return htmlFromAst(ast).content;
        });

        return (
          <blockquote class="p-4 my-5 bg-yellow-50 border border-dashed rounded-lg">
            {content}
          </blockquote>
        );
      case 'text':
      case 'paragraph':
        return node.value ? node.value : htmlFromAst(node.values).content;
      case 'code':
      case 'inline-code':
        if (node.type !== 'block') {
          return <code class="code p-2 rounded whitespace-pre-wrap">{node.value}</code>;
        }

        const code = document.createElement('code');
        code.classList.add('language-jsx');

        if (node.value) {
          code.innerHTML = highlight(node.value, languages.typescript, 'jsx');
        }

        if (node.values) {
          const [markup] = htmlFromAst(node.values).content;
          code.innerHTML += highlight(markup, languages.typescript, 'jsx');
        }

        if (!code.innerHTML) return;

        return (
          <div class="code leading-6 text-sm shadow-md my-8 rounded-md py-5 px-6">
            <pre style="background: none; white-space: pre-wrap" class="poetry">
              {code}
            </pre>
          </div>
        );

      // Catchall for clean-up/future additions
      default:
        console.log({ node });
    }
  });

  return { sections, content };
}

function addJSXSupport() {
  const javascript = Prism.util.clone(languages.javascript);
  languages.jsx = languages.extend('markup', javascript);
  // @ts-ignore
  languages.jsx.tag.pattern = /<\/?[\w.:-]+\s*(?:\s+[\w.:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?})))?\s*)*\/?>/i;
  // @ts-ignore
  languages.jsx.tag.inside['attr-value'].pattern = /=[^{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;

  const { punctuation: _, ...jsx } = Prism.util.clone(languages.jsx);

  const inside = languages.insertBefore(
    'jsx',
    'operator',
    {
      punctuation: /=(?={)|[{}[\];(),.:]/,
    },
    { jsx },
  );

  languages.insertBefore(
    'inside',
    'attr-value',
    {
      script: {
        // Allow for one level of nesting
        pattern: /=(\{(?:\{[^}]*}|[^}])+})/i,
        inside,
        alias: 'language-javascript',
      },
    },
    // @ts-ignore
    languages.jsx.tag,
  );
}
