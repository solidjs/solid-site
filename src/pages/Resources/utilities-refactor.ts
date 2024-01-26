import utilities from './Utilities.data';
import { writeFile } from 'node:fs';

const updated = [
  {
    status: '🤷',
    reason: 'Not sure if it works still',
    link: 'https://github.com/solidjs/solid-styled-jsx',
    title: 'solid-styled-jsx',
  },

  {
    status: '✔',
    reason: 'Supported and maintained by core',
    link: 'https://github.com/solidjs/solid-router',
    title: 'solid-router',
  },

  {
    status: '✔',
    reason: 'Supported and maintained by core',
    link: 'https://github.com/solidjs/solid/blob/main/packages/solid-element',
    title: 'solid-element',
  },

  {
    status: '✔',
    reason: 'Should be okay since it only relies on For and Show',
    link: 'https://github.com/milahu/solidjs-treeview-component',
    title: 'solidjs-treeview-component',
  },

  {
    status: '❌',
    reason: 'No recent update in 1 year, last supported solid 1.6.0',
    link: 'https://github.com/mikeplus64/solid-typefu-router5',
    title: 'solid-typefu-router5',
  },

  {
    status: '✔',
    reason: 'Supported and maintained by core',
    link: 'https://github.com/solidjs/solid-meta',
    title: 'solid-meta',
  },

  {
    status: '✔',
    reason: 'Supported and maintained by core',
    link: 'https://github.com/solidjs/solid-refresh',
    title: 'solid-refresh',
  },

  {
    status: '❌',
    reason: 'Last updated 3 years ago',
    link: 'https://github.com/solidjs/solid-jest',
    title: 'solid-jest',
  },

  {
    status: '✔',
    reason: 'Supported and maintained by core/ecosystem team',
    link: 'https://github.com/solidjs/solid-testing-library',
    title: 'solid-testing-library',
  },

  {
    status: '✔',
    reason: 'Supported and maintained by core',
    link: 'https://github.com/thetarnav/solid-devtools',
    title: 'Solid Developer Tools',
  },

  {
    status: '✔',
    reason: 'Supported and maintained by core',
    link: 'https://github.com/solidjs/solid-playground',
    title: 'solid-playground',
  },

  {
    status:
      "✔', reason: 'Hasn',t been updated in 8 months but is still good to go. No necessary deps to use this package.",
    link: 'https://github.com/amoutonbrady/solid-heroicons',
    title: 'solid-heroicons',
  },

  {
    status: '✔',
    reason: 'Works fine, last update 3 months ago.',
    link: 'https://github.com/x64Bits/solid-icons',
    title: 'solid-icons',
  },

  {
    status: '🤷',
    reason: 'Seems okay, last update was a year ago. Could use another set of eyes on this one',
    link: 'https://github.com/amoutonbrady/esbuild-plugin-solid',
    title: 'esbuild-plugin-solid',
  },

  {
    status: '✔',
    reason: 'Supported and maintained by core',
    link: 'https://github.com/ryansolid/dom-expressions/tree/main/packages/lit-dom-expressions',
    title: 'lit-dom-expressions',
  },

  {
    status: '✔',
    reason: 'Supported and maintained by core',
    link: 'https://github.com/ryansolid/dom-expressions/tree/main/packages/babel-plugin-jsx-dom-expressions',
    title: 'babel-plugin-jsx-dom-expressions',
  },

  {
    status: '❌',
    reason: 'Deprecated and archived',
    link: 'https://github.com/solidjs/create-solid',
    title: 'create-solid',
  },

  {
    status: '✔',
    reason: 'Supported and maintained by core',
    link: 'https://github.com/ryansolid/dom-expressions',
    title: 'dom-expressions',
  },

  {
    status: '❌',
    reason: 'Not updated in 4 years',
    link: 'https://github.com/high1/solid-typescript-rollup',
    title: 'solid-typescript-rollup',
  },

  {
    status: '❌',
    reason: 'Last updated 2 years ago.',
    link: 'https://gitlab.com/enom/solid-parcel-starter',
    title: 'solid-parcel-starter',
  },

  {
    status: '❌',
    reason: 'Last updated 3 years ago.',
    link: 'https://github.com/amoutonbrady/solid-snowpack-starter',
    title: 'solid-snowpack-starter',
  },

  {
    status: '✔',
    reason: 'Renamed to mitosis',
    link: 'https://github.com/builderio/jsx-lite',
    title: 'jsx-lite',
  },

  {
    status: '❌',
    reason: 'Not updated in 3-4 years',
    link: 'https://github.com/high1/solid-typescript-starter',
    title: 'solid-typescript-starter',
  },

  {
    status: '❌',
    reason: "By Ryan but doesn't seem to be maintained. Last update 3-4 years ago",
    link: 'https://github.com/ryansolid/solid-ts-webpack',
    title: 'solid-ts-webpack',
  },

  {
    status: '✔',
    reason: 'Supported and maintained by core',
    link: 'https://github.com/solidjs/templates',
    title: 'solidjs/templates',
  },

  {
    status: '❌',
    reason: 'Last updated 3 years ago.',
    link: 'https://github.com/amoutonbrady/snowpack-solid',
    title: 'snowpack-solid',
  },

  {
    status: '❌',
    reason: 'Last updated 3-4 years ago',
    link: 'https://github.com/amoutonbrady/parcel2-solid-ts-starter',
    title: 'parcel2-solid-ts-starter',
  },

  {
    status: '❌',
    reason: 'Archived. Last updated 4 years ago.',
    link: 'https://github.com/MrFoxPro/solid-rollup-boilerplate',
    title: 'solid-rollup-boilerplate',
  },

  {
    status: '✔',
    reason: 'Supported and maintained by core',
    link: 'https://github.com/solidjs/solid-transition-group',
    title: 'solid-transition-group',
  },

  {
    status: '✔',
    reason: 'Supported and maintained by core',
    link: 'https://github.com/solidjs/solid-start',
    title: 'solid-start',
  },

  {
    status: '✔',
    reason: 'Supported and maintained by core',
    link: 'https://github.com/solidjs/vite-plugin-solid',
    title: 'vite-plugin-solid',
  },

  {
    status: '✔',
    reason: 'Still maintained and used. Last update 2 months ago.',
    link: 'https://github.com/thisbeyond/solid-dnd',
    title: 'solid-dnd',
  },

  {
    status: '🤷',
    reason:
      "Maintained by Ryan but no updates for 3 years and not sure if it's even used to be honest.",
    link: 'https://github.com/solidjs/react-solid-state',
    title: 'react-solid-state',
  },

  {
    status: '❌',
    reason: 'Archived and deprecated',
    link: 'https://github.com/skrylnikov/reatom-solid',
    title: 'reatom-solid',
  },

  {
    status: '❌',
    reason: 'Last update 3 years ago',
    link: 'https://github.com/storeon/solidjs',
    title: 'solid-storeon',
  },

  {
    status: '✔',
    reason: 'Still supported and maintained by @effector. Last update 4 months ago.',
    link: 'https://github.com/effector/effector/tree/master/packages/effector-solid',
    title: 'effector-solid',
  },

  {
    status: '✔',
    reason: 'Last updated 2 years ago but supported and maintained by core',
    link: 'https://github.com/solidjs/solid-styled-components',
    title: 'solid-styled-components',
  },

  {
    status: '✔',
    reason: 'Last update 3 months ago, should be okay',
    link: 'https://github.com/Acidic9/emotion-solid',
    title: 'emotion-solid',
  },

  {
    status: '🤷',
    reason: 'Last update 4 years ago but no issues and it might still work fine',
    link: 'https://github.com/andgate/solid-orbit',
    title: 'solid-orbit',
  },

  { status: '✔', reason: 'Good to go :)', link: 'https://github.com/lume/lume', title: 'LUME' },

  {
    status: '✔',
    reason: 'Icons should be fine',
    link: 'https://www.npmjs.com/package/phosphor-solid',
    title: 'phosphor-solid',
  },

  {
    status: '✔',
    reason: 'Still maintained. Last update one month ago',
    link: 'https://github.com/tsparticles/solid',
    title: '@tsparticles/solid',
  },

  {
    status: '❌',
    reason: 'Last update 4 years ago. Ask @foolswisdom',
    link: 'https://github.com/mosheduminer/solid-form-action',
    title: 'solid-form-action',
  },

  {
    status: '❌',
    reason: "Last update 3 years ago. Using deprecated dependecy 'solid-app-router'",
    link: 'https://github.com/wobsoriano/vite-solid-tailwind-starter',
    title: 'vite-solid-tailwind-starter',
  },

  {
    status: '❌',
    reason: 'Last update 2-3 years ago',
    link: 'https://www.npmjs.com/package/solid-urql',
    title: 'solid-urql',
  },

  {
    status: '❌',
    reason: 'Last update 3 years ago.',
    link: 'https://github.com/pablo-abc/solid-reach',
    title: 'solid-reach',
  },

  {
    status: '✔',
    reason: 'Popular and maintained',
    link: 'https://github.com/pablo-abc/felte',
    title: 'Felte',
  },

  {
    status: '✔',
    reason: 'Maintained',
    link: 'https://github.com/joshwilsonvu/eslint-plugin-solid',
    title: 'eslint-plugin-solid',
  },

  {
    status: '❌',
    reason: 'Deprecated and archived',
    link: 'https://github.com/amoutonbrady/solid-i18n',
    title: '@amoutonbrady/solid-i18n',
  },

  {
    status: '✔',
    reason: 'Good to go :)',
    link: 'https://github.com/davedbase/solid-slider',
    title: 'solid-slider',
  },

  {
    status: '🤷',
    reason:
      'Last update 3 years ago but still used and mentioned sometimes. Should be okay to use to be honest',
    link: 'https://github.com/minht11/solid-virtual-container',
    title: 'solid-virtual-container',
  },

  {
    status: '✔',
    reason: 'Still updated occasionally. Should be okay to keep',
    link: 'https://github.com/uNmAnNeR/imaskjs/tree/master/packages/solid-imask',
    title: 'solid-imask',
  },

  {
    status: '✔',
    reason: 'Good',
    link: 'https://github.com/wobsoriano/solid-zustand/',
    title: 'solid-zustand',
  },

  {
    status: '🤷',
    reason: 'Looks good but no recent update. Last update 8 months ago.',
    link: 'https://github.com/wobsoriano/solid-supabase',
    title: 'solid-supabase',
  },

  {
    status: '❌',
    reason: 'Archived',
    link: 'https://github.com/otonashixav/solid-flip',
    title: 'solid-flip',
  },

  {
    status: '🤷',
    reason:
      "Last update 2-3 years ago but seems simple as it's just providing bindings. Ask lxsmnsyc",
    link: 'https://github.com/lxsmnsyc/solid-uppy',
    title: 'solid-uppy',
  },

  {
    status: '✔',
    reason: 'Good',
    link: 'https://github.com/LXSMNSYC/babel-plugin-solid-labels',
    title: 'babel-plugin-solid-labels',
  },

  {
    status: '✔',
    reason: 'Good',
    link: 'https://github.com/LXSMNSYC/solid-headless',
    title: 'solid-headless',
  },

  {
    status: '✔',
    reason: 'Good',
    link: 'https://github.com/LXSMNSYC/solid-tiptap',
    title: 'solid-tiptap',
  },

  {
    status: '✔',
    reason: 'Good',
    link: 'https://github.com/LXSMNSYC/solid-popper',
    title: 'solid-popper',
  },

  {
    status: '✔',
    reason: 'Good',
    link: 'https://aquaductape.github.io/solid-dismiss/',
    title: 'solid-dismiss',
  },

  {
    status: '🤷',
    reason: 'Last update 1 year ago',
    link: 'https://github.com/niliadu/solid-js-form',
    title: 'solid-js-form',
  },

  {
    status: '🤷',
    reason: 'Last update 3 years ago but popular?',
    link: 'https://github.com/isaacHagoel/solid-dnd-directive',
    title: 'solid-dnd-directive',
  },

  {
    status: '❌',
    reason: 'Last update 3-4 years ago',
    link: 'https://github.com/rturnq/solid-auth0',
    title: 'solid-auth0',
  },

  {
    status: '✔',
    reason: "It's Dave :) Update link though to solidjs-community/solid-primitives",
    link: 'https://github.com/davedbase/solid-primitives',
    title: 'solid-primitives',
  },

  {
    status: '❌',
    reason: 'Dead link, should be removed',
    link: 'https://guillotin.recodable.io/',
    title: '@guillotin/solid',
  },

  {
    status: '❌',
    reason: 'Dead, should be removed',
    link: 'https://github.com/sophiabrandt/solid-heroes',
    title: 'solid-heroes',
  },

  {
    status: '🤷',
    reason: 'Should be okay, ask lxsmnsyc',
    link: 'https://github.com/lxsmnsyc/solid-giphy',
    title: 'solid-giphy',
  },

  {
    status: '❌',
    reason: 'Last update 3 years ago',
    link: 'https://github.com/one-aalam/solid-starter-kit',
    title: 'solid-starter-kit',
  },

  {
    status: '✔',
    reason: 'Last update 3 months ago, should be okay',
    link: 'https://github.com/andi23rosca/tiptap-solid',
    title: 'tiptap-solid',
  },

  {
    status: '❌',
    reason:
      "Literally just a native library. Why is solid in the name if it's just used for showcasing it and not using any Solid stuff...",
    link: 'https://github.com/swise0/solid-toast-notify',
    title: 'solid-toast-notify',
  },

  {
    status: '✔',
    reason: 'Looks good and popular',
    link: 'https://github.com/andi23rosca/solid-markdown',
    title: 'solid-markdown',
  },

  {
    status: '❌',
    reason: 'Last update 3 years ago and using old `solid-app-router` dep',
    link: 'https://github.com/aldy505/vite-plugin-pages-solid',
    title: 'vite-plugin-pages-solid',
  },

  {
    status: '🤷',
    reason: 'Last update 2 years ago but ask Alex Lohr',
    link: 'https://github.com/atk/solid-register',
    title: 'solid-register',
  },

  {
    status: '✔',
    reason: "It's MICROSOFT! Also, it's popular and maintained",
    link: 'https://github.com/microsoft/playwright',
    title: '@playwright/experimental-ct-solid',
  },

  {
    status: '🤷',
    reason: 'Last update 2 years ago but sorta popular and might still be usable',
    link: 'https://github.com/merged-js/solid-apollo',
    title: 'solid-apollo',
  },

  {
    status: '❌',
    reason: 'Last update 3 years ago. Using solid-js 1.1.2...',
    link: 'https://github.com/merged-js/react-solid',
    title: 'react-solid',
  },

  {
    status: '❌',
    reason:
      'Should be good. Update url maybe to https://inlang.com/m/n860p17j/library-inlang-paraglideJsAdapterSolidStart or https://github.com/opral/monorepo/tree/main/inlang/source-code/paraglide/paraglide-js-adapter-solidstart',
    link: 'https://inlang.com/c/solid',
    title: 'ParaglideJS',
  },

  {
    status: '✔',
    reason: 'Last update 5 months ago',
    link: 'https://github.com/SanichKotikov/solid-i18n',
    title: 'solid-i18n',
  },

  {
    status: '❌',
    reason: 'Last update 3 years ago',
    link: 'https://github.com/poudels14/slate-solid',
    title: 'slate-solid',
  },

  {
    status: '✔',
    reason: 'Still maintained looks like',
    link: 'https://solid-libs.github.io/solid-bootstrap/#/',
    title: 'solid-bootstrap',
  },

  {
    status: '🤷',
    reason: 'Last update 10 months ago, need another pair of eyes',
    link: 'https://github.com/orenelbaum/babel-plugin-solid-undestructure',
    title: 'babel-plugin-solid-undestructure',
  },

  {
    status: '❌',
    reason: 'Last updated 3 years ago',
    link: 'https://github.com/git-ced/solid-plyr',
    title: 'solid-plyr',
  },

  {
    status: '❌',
    reason: 'Last update 1-2 years ago, unsure if it still works',
    link: 'https://github.com/aminya/solid-simple-table',
    title: 'solid-simple-table',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago',
    link: 'https://gitlab.com/john.carroll.p/rx-controls',
    title: 'rx-controls-solid',
  },

  {
    status: '🤷',
    reason: 'Last update 1 year ago, ask Milo and high1',
    link: 'https://github.com/high1/solid-social#readme',
    title: 'solid-social',
  },

  {
    status: '✔',
    reason: 'Still maintained',
    link: 'https://github.com/high1/solid-jsx',
    title: 'solid-jsx',
  },

  {
    status: '❌',
    reason: 'Last update 3 years ago, might be more useful as a learning resource',
    link: 'https://github.com/jherr/chrome-extension-boilerplate-solid',
    title: 'chrome-extension-boilerplate-solid',
  },

  {
    status: '✔',
    reason: 'Looks good, maintained',
    link: 'https://github.com/LXSMNSYC/solid-marked',
    title: 'solid-marked',
  },

  {
    status: '🤷',
    reason: 'Last update 9 months ago but popular and used',
    link: 'https://github.com/thisbeyond/solid-select',
    title: 'solid-select',
  },

  {
    status: '❌',
    reason: 'Last update 2-3 years ago',
    link: 'https://github.com/orenelbaum/babel-plugin-reactivars-solid',
    title: 'babel-plugin-reactivars-solid',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago',
    link: 'https://github.com/edemaine/meteor-solid',
    title: 'meteor-solid',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago',
    link: 'https://github.com/edemaine/solid-meteor-data',
    title: 'solid-meteor-data',
  },

  {
    status: '✔',
    reason: 'Last update 6 months ago but should be okay',
    link: 'https://github.com/wobsoriano/solid-firebase',
    title: 'solid-firebase',
  },

  {
    status: '✔',
    reason: 'Last update 1 year ago but might be usable?',
    link: 'https://github.com/nchudleigh/solid-virtual-list',
    title: 'solid-virtual-list',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago',
    link: 'https://github.com/tanvesh01/motion-signals',
    title: 'motion-signals',
  },

  { status: '❌', reason: "Unmaintained :'(", link: 'https://hope-ui.com/', title: 'hope-ui' },

  {
    status: '❌',
    reason: 'Last update 2 years ago',
    link: 'https://github.com/ionic-team/capacitor-solidjs-templates',
    title: 'capacitor-solidjs-templates',
  },

  {
    status: '✔',
    reason: 'Last update 2 years ago but should be usable',
    link: 'https://github.com/DigiChanges/solid-multiselect',
    title: 'solid-multiselect',
  },

  { status: '✔', reason: 'Maintained', link: 'https://suid.io', title: 'SUID - Material UI' },

  {
    status: '🤷',
    reason: 'Updated 2-3 years ago but seems usable',
    link: 'https://github.com/jaoaustero/solid-tawk-messenger',
    title: 'Tawk.to Messenger',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago',
    link: 'https://github.com/StudioLambda/TurboSolid',
    title: 'TurboSolid',
  },

  {
    status: '❌',
    reason: 'Dead, remove',
    link: 'https://github.com/dimensionhq/blitz',
    title: '@dimensionhq/blitz',
  },

  {
    status: '❌',
    reason: 'Not maintained',
    link: 'https://github.com/Aslemammad/solid-spring',
    title: 'solid-spring',
  },

  {
    status: '✔',
    reason: 'Maintained',
    link: 'https://github.com/fwouts/previewjs',
    title: 'previewjs',
  },

  {
    status: '❌',
    reason: 'Not maintained, https://github.com/specialdoom/solid-rev-kit/issues/5',
    link: 'https://github.com/specialdoom/solid-rev-kit',
    title: 'RevKit UI for SolidJS',
  },

  {
    status: '✔',
    reason: 'Maintained',
    link: 'https://github.com/lume/classy-solid',
    title: 'classy-solid',
  },

  {
    status: '❌',
    reason: 'Not maintained, last update 2 years ago',
    link: 'https://github.com/CompendiumDevTools/library',
    title: 'CompendiumDevTools',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago but cool project',
    link: 'https://github.com/AdityaSetyadi/form-gear',
    title: 'form-gear',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago',
    link: 'https://github.com/gstatem/gstatem',
    title: 'GStatem',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago',
    link: 'https://github.com/L1lith/Melon-Solid',
    title: 'melon-solid',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago',
    link: 'https://github.com/kajetansw/solar-forms',
    title: 'solar-forms',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago, looks unmaintained',
    link: 'https://github.com/Bedrock-Layouts/Solid-Bedrock',
    title: 'solid-bedrock',
  },

  {
    status: '❌',
    reason: 'Not maintained, last update 2 years ago. Should be okay to use though',
    link: 'https://github.com/everweij/solid-boundaries',
    title: 'solid-boundaries',
  },

  {
    status: '✔',
    reason: 'Last update 3 months ago',
    link: 'https://github.com/yonathan06/solid-cached-resource',
    title: 'solid-cached-resource',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago but cool project and popular',
    link: 'https://github.com/itaditya/solid-command-palette',
    title: 'solid-command-palette',
  },

  {
    status: '✔',
    reason: 'Maintained, last update 1 month ago',
    link: 'https://github.com/GIShub4/solid-map-gl',
    title: 'solid-map-gl',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago but cool project',
    link: 'https://github.com/tjjfvi/solid-native',
    title: 'solid-native',
  },

  {
    status: '❌',
    reason: 'Not maintained. Plus solid-primitives or core solid has everything',
    link: 'https://github.com/Exelord/solid-proxies',
    title: 'solid-proxies',
  },

  {
    status: '✔',
    reason: 'Last update 8 months ago, should be okay for a little bit more',
    link: 'https://github.com/Exelord/solid-services',
    title: 'solid-services',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago but might still be useful',
    link: 'https://github.com/yellowsink/solid-reactor',
    title: 'solid-reactor',
  },

  {
    status: '❌',
    reason:
      "Not maintained, last update 2 years ago. Also it's using the same name as the shadcn port so it can be confusing",
    link: 'https://github.com/pheggeseth/solid-ui',
    title: 'solid-ui',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago',
    link: 'https://github.com/TiagoCavalcante/solidjs-div-100vh',
    title: 'solidjs-div-100vh',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago',
    link: 'https://github.com/verdavaine/solidgraph',
    title: 'SolidGraph',
  },

  {
    status: '✔',
    reason:
      'Maintained by core. Update url to https://github.com/solidjs-community/solid-motionone',
    link: 'https://motion.dev/solid/quick-start',
    title: '@motionone/solid',
  },

  {
    status: '✔',
    reason: 'Maintained',
    link: 'https://github.com/Vexcited/solid-hcaptcha',
    title: 'solid-hcaptcha',
  },

  {
    status: '✔',
    reason: 'Maintained',
    link: 'https://github.com/gnomical/solid-theme-provider',
    title: 'solid-theme-provider',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago, very popular',
    link: 'https://github.com/ardeora/solid-toast',
    title: 'solid-toast',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago',
    link: 'https://github.com/SushiWaUmai/pyscript-solid',
    title: 'pyscript-solid',
  },

  {
    status: '✔',
    reason: 'Maintained',
    link: 'https://github.com/diragb/solid-custom-scrollbars',
    title: 'solid-custom-scrollbars',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago',
    link: 'https://github.com/StillScripts/solid-typer',
    title: 'solid-typer',
  },

  {
    status: '❌',
    reason: 'Archived',
    link: 'https://github.com/fastify/fastify-dx/tree/main/packages/fastify-dx-solid',
    title: 'fastify-dx-solid',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago, could be a nice learning tool for audio and solid',
    link: 'https://github.com/tahti-studio/solid-knobs',
    title: 'solid-knobs',
  },

  {
    status: '❌',
    reason: 'Removed and not maintained',
    link: 'https://swiperjs.com/solid',
    title: 'swiper/solid',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago',
    link: 'https://github.com/faassen/solid-dexie',
    title: 'solid-dexie',
  },

  {
    status: '✔',
    reason: "It's Dave and it's last update was 4 months ago",
    link: 'https://github.com/davedbase/solid-confetti-explosion',
    title: 'solid-confetti-explosion',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago',
    link: 'https://github.com/diragb/solid-custom-navigation',
    title: 'solid-custom-navigation',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago',
    link: 'https://github.com/diragb/solid-outside-click-handler',
    title: 'solid-outside-click-handler',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago',
    link: 'https://github.com/diragb/solid-copy-to-clipboard',
    title: 'solid-copy-to-clipboard',
  },

  {
    status: '✔',
    reason: 'Maintained',
    link: 'https://github.com/wobsoriano/solid-apexcharts',
    title: 'solid-apexcharts',
  },

  {
    status: '✔',
    reason: 'Update link to https://www.locatorjs.com/install/solidjs',
    link: 'https://www.locatorjs.com/',
    title: 'LocateJS',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago',
    link: 'https://github.com/KarthikeyanRanasthala/solid-bottomsheet',
    title: 'solid-bottomsheet',
  },

  {
    status: '❌',
    reason: 'Last update 9 months ago',
    link: 'https://github.com/smastrom/solid-collapse',
    title: 'solid-collapse',
  },

  {
    status: '✔',
    reason: 'Still maintained and useful',
    link: 'https://github.com/olgam4/bat',
    title: 'bat',
  },

  {
    status: '🤷',
    reason:
      'Last update 4 months ago, could be useful. Update npm page and add link to repo https://github.com/nksaraf/solid-mdx',
    link: 'https://www.npmjs.com/package/solid-mdx/v/0.0.6',
    title: 'solid-mdx',
  },

  {
    status: '✔',
    reason: 'Very useful, still maintained',
    link: 'https://tanstack.com/query/v4/docs/adapters/solid-query',
    title: '@tanstack/solid-query',
  },

  {
    status: '✔',
    reason: 'Last update 3 months ago, should work fine for the future',
    link: 'https://github.com/pureliani/solid-query',
    title: '@gapu/solid-query',
  },

  {
    status: '✔',
    reason: 'Maintained',
    link: 'https://tanstack.com/virtual/v3/docs/adapters/solid-virtual',
    title: '@tanstack/solid-virtual',
  },

  {
    status: '✔',
    reason:
      'Maintained, last update to the code 2 years ago but the core library is agnostic so this should be fine as a binding',
    link: 'https://tanstack.com/table/v8/docs/adapters/solid-table',
    title: '@tanstack/solid-table',
  },

  {
    status: '✔',
    reason: 'Maintained',
    link: 'https://ag-grid.com/react-data-grid/solidjs/',
    title: 'ag-grid-solid',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago, could be useful but core solid-router should be recommended',
    link: 'https://github.com/Supertigerr/solid-named-router',
    title: 'Solid Named Router',
  },

  {
    status: '✔',
    reason: 'Last update 2 years ago, but cool project and useful',
    link: 'https://github.com/miguelsalesvieira/solid-flow',
    title: 'solid-flow',
  },

  {
    status: '✔',
    reason:
      'Dead link, repo link: https://github.com/webblocksapp/solid-form-handler. Still maintained',
    link: 'https://solid-form-handler.com',
    title: 'solid-form-handler',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago, could be useful',
    link: 'https://github.com/chris-czopp/solid-test-recorder',
    title: 'solid-test-recorder',
  },

  {
    status: '✔',
    reason: 'Core library still maintained, solid version last updated 8 months ago',
    link: 'https://papanasi.js.org/',
    title: 'Papanasi: The Universal UI Library',
  },

  {
    status: '✔',
    reason: 'Last update 8 months ago',
    title: 'solid-formlet',
    link: 'https://github.com/functorism/solid-formlet',
  },

  {
    status: '✔',
    reason:
      'Last update was 10 months ago but could be useful. I suggest moving starter templates under a separate label',
    link: 'https://github.com/vanillacode314/solid-start-trpc-turborepo',
    title: 'solid-start-trpc-turborepo',
  },

  {
    status: '✔',
    reason: 'Maintained',
    title: 'Modular Forms',
    link: 'https://modularforms.dev/',
  },

  {
    status: '❌',
    reason: 'Update 1 year ago',
    title: 'vite-plugin-solid-markdown',
    link: 'https://github.com/xbmlz/vite-plugin-solid-markdown',
  },

  {
    status: '✔',
    reason: 'Last update 1 month ago and popular',
    title: 'vitesse-solid',
    link: 'https://github.com/xbmlz/vitesse-solid',
  },

  {
    status: '✔',
    reason: 'Maintained, popular, icons',
    title: 'lucide-solid',
    link: 'https://lucide.dev/',
  },

  { status: '✔', reason: 'We all love this one', link: 'https://kobalte.dev/', title: 'kobalte' },

  {
    status: '✔',
    reason: 'Maintained',
    title: '@klass/solid',
    link: 'https://github.com/flamrdevs/klass',
  },

  {
    status: '✔',
    reason: 'Last update 1 year ago but should be okay and maintainer is active member of discord',
    link: 'https://github.com/bigmistqke/solid-textarea-autosize',
    title: 'solid-textarea-autosize',
  },

  {
    status: '❌',
    reason: 'Last consistent maintenance was 1 year ago. Might still be usable?',
    title: '@cookbook/solid-intl',
    link: 'https://github.com/the-cookbook/solid-intl',
  },

  {
    status: '✔',
    reason: 'Maintained',
    title: '@sect/solid-hiding-header',
    link: 'https://github.com/sectsect/solid-hiding-header',
  },

  {
    status: '✔',
    reason: 'Icons',
    link: 'https://github.com/gnomical/solid-fontawesome',
    title: 'solid-fontawesome',
  },

  {
    status: '❌',
    reason: 'Archived',
    title: '@solidjs-material/core',
    link: 'https://github.com/ceopaludetto/solid-material',
  },

  {
    status: '✔',
    reason:
      'Last updated 1 year ago but should be good to use in the future. No maintenance however.',
    title: 'solid-color',
    link: 'https://github.com/xbmlz/solid-color',
  },

  {
    status: '✔',
    reason: 'Maintained but not really solid specific',
    title: 'Flowbite SolidJS',
    link: 'https://flowbite.com/docs/getting-started/solid-js/',
  },

  {
    status: '✔',
    reason: 'Maintained',
    title: 'solid-mason',
    link: 'https://github.com/lxsmnsyc/solid-mason',
  },

  {
    status: '✔',
    reason: 'Maintained and useful package for solid-start',
    title: 'create-jd-app',
    link: 'https://github.com/OrJDev/create-jd-app',
  },

  {
    status: '❌',
    reason: 'Archived and not recommended by maintainer',
    title: 'solid-trpc',
    link: 'https://github.com/OrJDev/solid-trpc',
  },

  {
    status: '❌',
    reason: 'Duplicate',
    title: 'solid-start-trpc',
    link: 'https://github.com/OrJDev/solid-trpc',
  },

  {
    status: '✔',
    reason: 'Maintained and example repo, might fit better in a different category',
    title: 'solid-start-auth-example',
    link: 'https://github.com/nextauthjs/solid-start-auth-example',
  },

  {
    status: '✔',
    reason: 'Maintained',
    title: 'lexical-solid',
    link: 'https://github.com/mosheduminer/lexical-solid',
  },

  {
    status: '✔',
    reason: 'Last update 10 months ago but may need future maintenance',
    title: '@wundergraph/solid-query',
    link: 'https://github.com/wundergraph/wundergraph/tree/main/packages/solid-query',
  },

  {
    status: '✔',
    reason: 'Last update 10 months ago but should be okay to use for a bit',
    title: 'solid-dzone',
    link: 'https://github.com/Jcanotorr06/solid-dzone',
  },

  {
    status: '✔',
    reason: 'Last update 10 months ago but should be okay to use for a bit',
    title: 'solid-marquee',
    link: 'https://github.com/Jcanotorr06/solid-marquee',
  },

  {
    status: '🤷',
    reason: 'Last update 10 months ago, seems unmaintained but cool project',
    title: 'solid-code-input',
    link: 'https://github.com/srsholmes/solid-code-input',
  },

  {
    status: '✔',
    reason: 'Maintained',
    title: 'ark-ui',
    link: 'https://github.com/chakra-ui/ark',
  },

  {
    status: '✔',
    reason: 'Maintained and useful',
    title: 'solid-undo-redo',
    link: 'https://github.com/elite174/solid-undo-redo',
  },

  {
    status: '✔',
    reason: 'Maintained',
    title: 'solid-simple-datepicker',
    link: 'https://github.com/elite174/solid-simple-datepicker',
  },

  {
    status: '✔',
    reason: 'Last updated 9 months ago but useful and can be used',
    title: 'solid-resizable-panels',
    link: 'https://github.com/elite174/solid-resizable-panels',
  },

  {
    status: '✔',
    reason: 'Maintained',
    title: 'solid-compose',
    link: 'https://github.com/mathieuprog/solid-compose',
  },

  {
    status: '❌',
    reason: 'Not maintained but useful. Last update 8 months ago',
    title: 'solidjs-scroll-essentials',
    link: 'https://github.com/sacarvy/solidjs-scroll-essentials',
  },

  {
    status: '✔',
    reason: 'Maintained',
    link: 'https://github.com/s0ftik3/solid-chartjs',
    title: 'solid-chartjs',
  },

  {
    status: '✔',
    reason: 'Maintained',
    title: '@rnwonder/solid-date-picker',
    link: 'https://github.com/rnwonder/solid-date-picker',
  },

  {
    status: '✔',
    reason: 'Maintained',
    title: 'solid-maplibre',
    link: 'https://github.com/shishkin/solid-maplibre',
  },

  {
    status: '❌',
    reason: 'Might be useful but not maintained in last 5 months',
    title: 'solidjs-paystack',
    link: 'https://github.com/rnwonder/solidjs-paystack',
  },

  {
    status: '❌',
    reason: 'Might be useful but not maintained in last 5 months',
    title: 'solidjs-flutterwave',
    link: 'https://github.com/rnwonder/solidjs-flutterwave',
  },

  {
    status: '✔',
    reason: 'Last update 4 months ago, useful',
    title: 'solid-wizard',
    link: 'https://github.com/DigiChanges/solid-wizard',
  },

  {
    status: '✔',
    reason: 'Maintained',
    title: 'solid-algo-wallets',
    link: 'https://github.com/SilentRhetoric/solid-algo-wallets',
  },

  {
    status: '✔',
    reason: 'Maintained',
    title: 'solid-swr',
    link: 'https://github.com/Tronikelis/solid-swr',
  },

  { status: '✔', reason: 'Maintained', link: 'https://css-hooks.com', title: '@css-hooks/solid' },

  {
    status: '✔',
    reason: 'Last update 3 months ago, useful',
    title: 'solid-monaco',
    link: 'https://github.com/alxnddr/solid-monaco',
  },

  {
    status: '❌',
    reason: "Last updated 3 months ago, doesn't seem overly useful",
    link: 'https://github.com/jessyhq/solid-spotify-embed',
    title: 'solid-spotify-embed',
  },

  {
    status: '✔',
    reason: 'Last update 3 months ago on creation, might still be useful',
    title: 'echarts-solid',
    link: 'https://github.com/alxnddr/echarts-solid',
  },

  {
    status: '❌',
    reason: 'Last update 2 years ago, might be a good resource to learn from?',
    title: 'solid-keep-alive',
    link: 'https://github.com/JulianSoto/solid-keep-alive',
  },

  { status: '✔', reason: 'Bird', link: 'https://corvu.dev', title: 'corvu' },
];

const convertData = () => {
  let data = `import { Resource, ResourceCategory, PackageType } from './Ecosystem'
const utilities: Array<Resource> = [

`;
  const current = [...utilities];
  console.log(current);

  for (const util of current) {
    const updatedUtil = updated.find((u) => u.title === util.title && u.link === u.link);

    if (!updatedUtil) {
      throw new Error(`Could not find [${util.title}] in updated list`);
    }

    if (updatedUtil.status === '❌') {
      util.maintained = false;
    }
  }
  data += JSON.stringify(current);

  data += `]

export default utilities
`;

  writeFile('src/pages/Resources/Utilities.data.ts', data, () => {});
};

convertData();
