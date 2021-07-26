
const name = 'Italiano';
const locale = 'it-IT';
const nav = [
  { title: 'Iniziare', path: '/guide' },
  { title: 'Documentazione', path: '/docs/latest/api' },
  { title: 'Risorse', path: '/resources' },
  { title: 'Tutorial', path: '/tutorial' },
  { title: 'Esempi', path: '/examples' },
  { title: 'Playground', path: 'https://playground.solidjs.com', external: true },
  { title: 'Media', path: '/media' },
];

const footer = {
  declaration: "Solid è un progetto open source supportato da un team di contributori pubblici. È distribuito con licenza MIT. Questa libreria e comunità sono rese possibili da un team principale e collaboratori dedicati.",
  updated: 'Ultimo aggiornamento {{date}} su Solid v{{version}}',
};

export default function() {
  return {
    name,
    locale,
    ...nav,
    ...footer,
  };
};
