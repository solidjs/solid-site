import compilerWorker from 'solid-repl/lib/compiler?worker';
import formatterWorker from 'solid-repl/lib/formatter?worker';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import onigasm from 'onigasm/lib/onigasm.wasm?url';
import Repl from 'solid-repl/lib/repl';
import { ComponentProps } from 'solid-js';

window.MonacoEnvironment = {
  getWorker: function (_moduleId: unknown, label: string) {
    switch (label) {
      case 'css':
        return new cssWorker();
      case 'typescript':
      case 'javascript':
        return new tsWorker();
      default:
        return new editorWorker();
    }
  },
  onigasm,
};

const compiler = new compilerWorker();
const formatter = new formatterWorker();

const MyRepl = (props: Omit<ComponentProps<typeof Repl>, 'compiler' | 'formatter'>) => {
  return <Repl compiler={compiler} formatter={formatter} {...props} />;
};

export default MyRepl;
