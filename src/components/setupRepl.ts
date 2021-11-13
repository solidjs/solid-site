import { isServer } from 'solid-js/web';

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import * as simple from './simple';

if (!isServer)
  (window as any).MonacoEnvironment = {
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
  };

// @ts-ignore wrong type in Vite
export const compiler = isServer
  ? undefined
  : new (await import('solid-repl/lib/compiler?worker')).default();
// @ts-ignore wrong type in Vite
export const formatter = isServer
  ? undefined
  : new (await import('solid-repl/lib/formatter?worker')).default();

export const { Repl, createTabList } = isServer ? simple : await import('solid-repl');
