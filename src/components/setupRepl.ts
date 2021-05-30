import CompilerWorker from 'solid-repl/lib/compiler.js?worker';
import FormatterWorker from 'solid-repl/lib/formatter.js?worker';

import 'monaco-editor/min/vs/editor/editor.main.css';

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';

(window as any).MonacoEnvironment = {
  getWorker: function (_moduleId, label: string) {
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
};

export const compiler = new CompilerWorker();
export const formatter = new FormatterWorker();