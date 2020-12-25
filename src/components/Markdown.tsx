
import type { Component } from 'solid-js';
import { createComputed, createMemo } from 'solid-js';
import commonmark from 'commonmark';
import { scrollIntoView } from "scroll-js";

const handleSectionClick = (id) => {
  scrollIntoView(
    document.getElementById(`${id}`),
    document.body,
    { behavior: 'smooth', top: -500, easing: 'ease-in-out' }
  );
};

const Markdown: Component = ({ children }) => {
  return "derp";
  const docs = createMemo(() => {
    let anchors;
    return commonmark.parse(children).map((el) => {
      
  });
  return <div>{docs}</div>;
};

export default Markdown;
