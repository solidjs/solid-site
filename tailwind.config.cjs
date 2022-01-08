const theme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['index.html', 'src/**/*.tsx'],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      transitionProperty: {
        composite: 'transform, opacity',
      },
      zIndex: {
        negative: -1,
      },
      boxShadow: {
        'top-2xl': '0 -25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      transitionDuration: {
        0: '0ms',
        5000: '5000ms',
      },
      fontSize: {
        xxs: '.55rem',
      },
      screens: {
        'pointer-fine': {
          raw: '(pointer: fine)',
        },
      },
      colors: {
        primary: '#4483c1',
        solid: {
          default: '#2c4f7c',
          darkdefault: '#b8d7ff', //'#87b1e6',
          darkgray: '#252525',
          gray: '#414042',
          mediumgray: '#9d9d9d',
          lightgray: '#f3f5f7',
          dark: '#07254A',
          medium: '#446b9e',
          light: '#4f88c6',
          accent: '#0cdc73',
          secondaccent: '#0dfc85',
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': '#333',
            '--tw-prose-invert-body': '#ccc',
            '--tw-prose-headings': theme('colors.solid.default'),
            '--tw-prose-invert-headings': theme('colors.solid.darkdefault'),
            color: 'var(--tw-prose-body)',
            fontFamily: 'Gordita',
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            h1: {
              fontWeight: '600',
              fontSize: '1.75rem',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '1rem',
              marginTop: '2rem',
              color: 'var(--tw-prose-headings)',
            },
            h2: {
              fontWeight: '600',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '1rem',
              marginTop: '2rem',
              color: 'var(--tw-prose-headings)',
            },
            a: {
              color: '#999',
              textDecoration: 'none',
              '&:hover': {
                color: '#2c4f7c',
              },
            },
          },
        },
      }),
      backgroundImage: (theme) => ({
        hero: "url('/src/assets/shapes/header.svg')",
        'blocks-one': "url('/src/assets/shapes/blocks1.svg')",
        'blocks-two': "url('/src/assets/shapes/blocks2.svg')",
        'blocks-three': "url('/src/assets/shapes/blocks3.svg')",
        doc: 'linear-gradient(to left, #fff, #fff 50%, rgba(243, 244, 246) 10%)',
        darkDoc: 'linear-gradient(to left, #000, #000 50%, rgba(20, 20, 20) 10%)',
      }),
      container: {
        center: true,
      },
      borderRadius: {
        '6xl': '3.5rem',
      },
      fontFamily: {
        display: ['Gordita', ...theme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-dir')],
};
