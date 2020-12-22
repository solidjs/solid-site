

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        padding: '5rem',
      },
      colors: {
        // This color has accessibility issues
        primary: "#4483c1",
        solid: {
          DEFAULT: '#2c4f7c',
          dark: '#335d92',
          medium: '#446b9e',
          light: '#4f88c6'
        }
      },
      fontFamily: {},
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography')
  ],
}