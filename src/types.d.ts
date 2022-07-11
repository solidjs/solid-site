declare module 'github-slugger' {
  export function slug(str: string): string;
}

declare module '*.mdx' {
  let MDXComponent: (props) => JSX.Element;
  export default MDXComponent;
}
