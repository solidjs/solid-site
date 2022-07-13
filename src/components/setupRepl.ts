import CompilerWorker from 'solid-repl/lib/compiler?worker';
import FormatterWorker from 'solid-repl/lib/formatter?worker';

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import onigasm from 'onigasm/lib/onigasm.wasm?url';

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

export const compiler = new CompilerWorker();
export const formatter = new FormatterWorker();
