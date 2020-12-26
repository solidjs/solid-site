// @ts-nocheck

import type { Component } from 'solid-js';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism.css';

(function addJSXSupport() {
  let javascript = Prism.util.clone(Prism.languages.javascript);
  Prism.languages.jsx = Prism.languages.extend('markup', javascript);
  Prism.languages.jsx.tag.pattern = /<\/?[\w.:-]+\s*(?:\s+[\w.:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?})))?\s*)*\/?>/i;
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
    Prism.languages.jsx.tag,
  );
})();

const TAGS = {
  '': <em />,
  _: <strong />,
  '*': <strong />,
  '~': <s />,
  '\n': <br />,
  ' ': <br />,
  '-': <hr />,
};

function outdent(str) {
  return str.replace(RegExp('^' + (str.match(/^(\t| )+/) || '')[0], 'gm'), '');
}

function encodeAttr(str) {
  return (str + '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const parse = (md, prevLinks = undefined) => {
  let tokenizer = /((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^``` *(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:!\[([^\]]*?)\]\(([^)]+?)\))|(\[)|(\](?:\(([^)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,6})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*]|~~)/gm,
    context = [],
    out = [],
    links = prevLinks || {},
    last = 0,
    chunk,
    prev,
    token,
    inner,
    t;
  function tag(token) {
    let desc = TAGS[token[1] || ''];
    let end = context[context.length - 1] == token;
    if (!desc) return token;
    if (!desc[1]) return desc[0];
    if (end) context.pop();
    else context.push(token);
    return desc[end | 0];
  }
  md = md
    .replace(/^\[(.+?)\]:\s*(.+)$/gm, (s, name, url) => {
      links[name.toLowerCase()] = url;
      return '';
    })
    .replace(/^\n+|\n+$/g, '');
  while ((token = tokenizer.exec(md))) {
    prev = md.substring(last, token.index);
    last = tokenizer.lastIndex;
    chunk = token[0];
    if (prev.match(/[^\\](\\\\)*\\$/)) {
      // escaped
    }
    // Code/Indent blocks:
    else if ((t = token[3] || token[4])) {
      let code = Prism.highlight(
        outdent(t.replace(/^\n+|\n+$/g, '')),
        Prism.languages.jsx,
        'typescript',
      );
      chunk = (
        <pre
          class={`code leading-5 shadow-lg p-8 my-9 bg-gray-50 ${
            token[4] ? 'poetry' : token[2].toLowerCase()
          }`}
        >
          <code class={`language-${token[2].toLowerCase()}`} innerHTML={code} />
        </pre>
      );
    }
    // > Quotes, -* lists:
    else if ((t = token[6])) {
      if (t.match(/\./)) {
        token[5] = token[5].replace(/^\d+/gm, '');
      }
      inner = parse(outdent(token[5].replace(/^\s*[>*+.-]/gm, '')));
      if (t == '>') t = 'blockquote';
      else {
        t = t.match(/\./) ? 'ol' : 'ul';
        inner = inner.replace(/^(.*)(\n|$)/gm, '<li>$1</li>');
      }
      chunk = document.createElement(t);
      chunk.appendChild(inner);
    }
    // Images:
    else if (token[8]) {
      chunk = <img src={encodeAttr(token[8])} alt={encodeAttr(token[7])} />;
    }
    // Links:
    else if (token[10]) {
      console.log('10', token);
      // out = out.replace('<a>', `<a href="${encodeAttr(token[11] || links[prev.toLowerCase()])}">`);
      // chunk = flush() + '</a>';
    } else if (token[9]) {
      console.log('9', token);
      chunk = <a />;
    }
    // Headings:
    else if (token[12] || token[14]) {
      t = 'h' + (token[14] ? token[14].length : token[13] > '=' ? 1 : 2);
      chunk = document.createElement(t);
      switch (t) {
        case 'h1':
          chunk.className = 'pb-3 my-5 text-2xl border-b text-solid';
          break;
        case 'h2':
          chunk.className = 'pb-3 my-5 text-xl border-b text-solid';
          break;
      }
      chunk.innerHTML = token[12] || token[15];
    }
    // `code`:
    else if (token[16]) {
      chunk = <code>{encodeAttr(token[16])}</code>;
    }
    // Inline formatting: *em*, **strong** & friends
    else if (token[17] || token[1]) {
      chunk = tag(token[17] || '--');
    }
    out.push(prev, chunk);
  }
  return out;
};

const Markdown: Component = ({ children }) => {
  return <div class="leading-8">{parse(children)}</div>;
};

export default Markdown;
