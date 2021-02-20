import { Component, createEffect, createMemo } from 'solid-js';

import prism from 'markdown-it-prism';

import markdown from 'markdown-it';
import anchor from 'markdown-it-anchor';

import 'prismjs/themes/prism-coy.css';

import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-typescript';

const Markdown: Component<{ onLoadSections?: Function }> = (props) => {
  const doc = createMemo(() => {
    const sections: Section[] = [];

    const md = markdown({ html: true, typographer: true })
      .use(prism)
      // Options available here: https://www.npmjs.com/package/markdown-it-anchor
      .use(anchor, {
        level: 1,
        callback: (token, { slug, title }) => {
          console.log(token);
          sections.push({ slug, title, level: token.tag });
        },
      });

    const html = md.render(props.children as string);

    return {
      html,
      sections:
        sections[1] && sections[1].level === 'h3'
          ? sections.filter((section) => section.level === 'h1')
          : sections.filter((section) => section.level !== 'h1'),
    };
  });

  createEffect(() => {
    if (props.onLoadSections) props.onLoadSections(doc().sections);
  });

  return <div class="prose" innerHTML={doc().html} />;
};

export default Markdown;

export interface Section {
  slug: string;
  title: string;
  level: string;
}
