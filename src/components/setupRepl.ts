import CompilerWorker from 'solid-repl/dist/compiler?worker';
import FormatterWorker from 'solid-repl/dist/formatter?worker';
import LinterWorker from 'solid-repl/dist/linter?worker';

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import { languages } from 'monaco-editor';
import onigasm from 'onigasm/lib/onigasm.wasm?url';

window.MonacoEnvironment = {
  getWorker: function (_moduleId: unknown, label: string) {
    switch (label) {
      case 'css':
        return new cssWorker();
      case 'json':
        return new jsonWorker();
      case 'typescript':
      case 'javascript':
        return new tsWorker();
      default:
        return new editorWorker();
    }
  },
  onigasm,
};

const solidTypes = import.meta.glob('/node_modules/solid-js/**/*.{d.ts,json}', {
  eager: true,
  as: 'raw',
});

for (const path in solidTypes) {
  languages.typescript.typescriptDefaults.addExtraLib(solidTypes[path], `file://${path}`);
  languages.typescript.javascriptDefaults.addExtraLib(solidTypes[path], `file://${path}`);
}

export const compiler = new CompilerWorker();
export const formatter = new FormatterWorker();
export const linter = new LinterWorker();
