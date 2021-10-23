import { Component, createEffect, createMemo, JSX, splitProps } from 'solid-js';

import prism from 'markdown-it-prism';

import markdown from 'markdown-it';
import anchor from 'markdown-it-anchor';

import 'prism-themes/themes/prism-ghcolors.css';

import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-typescript';

const Markdown: Component<Props> = (props) => {
  const [internal, external] = splitProps(props, ['class', 'onLoadSections', 'children']);
  const doc = createMemo(() => {
    const sections: Section[] = [];

    const md = markdown({ html: true, typographer: true })
      .use(prism)
      // Options available here: https://www.npmjs.com/package/markdown-it-anchor
      .use(anchor, {
        level: 1,
        callback: (token, { slug, title }) => {
          sections.push({ slug, title, level: token.tag });
        },
      });

    const html = md.render(internal.children as string);

    return {
      html,
      sections:
        sections[1] && sections[1].level === 'h3'
          ? sections.filter((section) => section.level === 'h1')
          : sections.filter((section) => section.level !== 'h1'),
    };
  });

  createEffect(() => {
    if (internal.onLoadSections) internal.onLoadSections(doc().sections);
  });

  return <div class={`prose ${internal.class || ''}`} innerHTML={doc().html} {...external} />;
};

export default Markdown;

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {
  onLoadSections?: Function;
}

export interface Section {
  slug: string;
  title: string;
  level: string;
}
