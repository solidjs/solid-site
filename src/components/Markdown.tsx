import type { Component } from 'solid-js';
import { createMutable } from 'solid-js';
import markdownTreeParser from 'markdown-tree-parser';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism.css';

(function addJSXSupport() {
  let javascript = Prism.util.clone(Prism.languages.javascript);
  Prism.languages.jsx = Prism.languages.extend('markup', javascript);
  // @ts-ignore
  Prism.languages.jsx.tag.pattern = /<\/?[\w.:-]+\s*(?:\s+[\w.:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?})))?\s*)*\/?>/i;
  // @ts-ignore
  Prism.languages.jsx.tag.inside['attr-value'].pattern = /=[^{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i;
  let jsxExpression = Prism.util.clone(Prism.languages.jsx);
  delete jsxExpression.punctuation;
  jsxExpression = Prism.languages.insertBefore(
    'jsx',
    'operator',
    {
      punctuation: /=(?={)|[{}[\];(),.:]/,
    },
    { jsx: jsxExpression },
  );
  Prism.languages.insertBefore(
    'inside',
    'attr-value',
    {
      script: {
        // Allow for one level of nesting
        pattern: /=(\{(?:\{[^}]*}|[^}])+})/i,
        inside: jsxExpression,
        alias: 'language-javascript',
      },
    },
    // @ts-ignore
    Prism.languages.jsx.tag,
  );
})();

function slugify(text) {
  return text
    .toString() // Cast to string
    .toLowerCase() // Convert the string to lowercase letters
    .normalize('NFD') // The normalize() method returns the Unicode Normalization Form of a given string.
    .trim() // Remove whitespace from both sides of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

const Markdown: Component<{ onLoadSections: Function }> = ({ children, onLoadSections }) => {
  const doc = createMutable(() => {
    let sections = [];
    const astToSolid = (nodes) => {
      return nodes.map((node) => {
        switch (node.name) {
          case 'heading':
            let el = document.createElement(`h${node.level}`);
            el.className = `pb-3 ${sections.length === 0 ? 'mb-5' : 'my-5'} text-${
              3 - node.level
            }xl border-b text-solid`;
            el.append(...astToSolid(node.values));
            el.setAttribute('id', slugify(el.innerHTML));
            const title = document.createElement('textarea');
            title.innerHTML = el.innerHTML;
            sections.push({
              id: el.id,
              title: title.value,
            });
            return el;
          case 'link':
            return (
              <a class="text-gray-500 hover:text-solid" href={node.href}>
                {node.title}
              </a>
            );
          case 'text':
          case 'paragraph':
            return node.value ? node.value : astToSolid(node.values);
          case 'code':
            if (node.type === 'block') {
              let code = document.createElement('code');
              code.setAttribute('classNames', 'language-jsx');
              if (node.value) {
                code.innerHTML = Prism.highlight(node.value, Prism.languages.typescript, 'jsx');
              }
              if (node.values) {
                code.innerHTML =
                  code.innerHTML +
                  Prism.highlight(astToSolid(node.values)[0], Prism.languages.typescript, 'jsx');
              }
              return (
                <div class="code leading-6 shadow-lg my-8 border rounded-md p-6 ">
                  <pre style={{ background: 'none' }} class="poetry">
                    {code}
                  </pre>
                </div>
              );
            } else {
              return <code>{node.value}</code>;
            }
          // Catchall for clean-up/future additions
          default:
            console.log(node);
        }
      });
    };
    const doc = astToSolid(markdownTreeParser(children).ast);
    onLoadSections(sections);
    return doc;
  });
  return <div class="leading-8">{doc}</div>;
};

export default Markdown;
