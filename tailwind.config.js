const theme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['index.html', 'src/**/*.tsx'],
  mode: 'jit',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            fontFamily: 'Gordita !important' ,
            h1: {
              fontWeight: '600',
              fontSize: '1.75rem',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '1rem',
              marginTop: '2rem',
              color: '#2c4f7c'
            },
            h2: {
              fontWeight: '600',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '1rem',
              marginTop: '2rem',
              color: '#2c4f7c'
            },
            code: {
              fontFamily: 'Gordita !important' ,
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
      },
      container: {
        center: true,
      },
      colors: {
        primary: '#4483c1',
        solid: {
          default: '#2c4f7c',
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
  plugins: [require('@tailwindcss/typography')],
};
