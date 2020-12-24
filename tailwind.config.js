const theme = require('tailwindcss/defaultTheme');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  dark: false,
  theme: {
    extend: {
      container: {
        padding: '4rem',
        center: true,
      },
      colors: {
        primary: '#4483c1',
        solid: {
          DEFAULT: '#2c4f7c',
          dark: '#335d92',
          medium: '#446b9e',
          light: '#4f88c6',
        },
      },
      fontFamily: {
        display: ['Gordita', ...theme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
  purge: {
    enabled: isProd,
    mode: 'layers',
    layers: ['base', 'components', 'utilities'],
    content: ['public/**/*.html', 'src/**/*.tsx'],
  },
};
