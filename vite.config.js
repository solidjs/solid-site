// @ts-check
// import { defineConfig } from 'vite';
// import solid from 'vite-plugin-solid';
// import WindiCSS from 'vite-plugin-windicss';

// export default defineConfig({
//   plugins: [
//     solid(),
//     WindiCSS({
//       scan: {
//         fileExtensions: ['tsx', 'html', 'jsx', 'ts', 'js'],
//       },
//     }),
//     {
//       name: 'dev',
//       // HACK: This hack is necessary for now while I investigate
//       // the reason vite serves the url /docs/latest/api with
//       // /docs/latest/src/main.tsx...
//       configureServer(server) {
//         server.middlewares.use((req, _res, next) => {
//           if (/main\.tsx/.test(req.url)) {
//             req.url = '/src/main.tsx';
//             next();
//           } else next();
//         });
//       },
//     },
//   ],
//   optimizeDeps: {
//     include: [
//       'prismjs/components/prism-typescript',
//       'prismjs/components/prism-jsx',
//       'prismjs/components/prism-json',
//       'prismjs/components/prism-bash',
//     ],
//   },
//   build: {
//     polyfillDynamicImport: false,
//     target: 'esnext',
//   },
// });
