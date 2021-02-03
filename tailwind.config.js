const theme = require('tailwindcss/defaultTheme');

module.exports = {
  dark: false,
  theme: {
    extend: {
      container: {
        padding: '3rem',
        center: true,
      },
      colors: {
        primary: '#4483c1',
        solid: {
          DEFAULT: '#2c4f7c',
          dark: '#335d92',
          gray: '#414042',
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
  purge: ['public/**/*.html', 'src/**/*.tsx'],
};
