
const isProd = process.env["npm_lifecycle_event"] === "build";

module.exports = {
  darkMode: false,
  theme: {
    extend: {
      container: {
        padding: '5rem',
      },
      colors: {
        primary: "#4483c1",
        solid: {
          DEFAULT: '#2c4f7c',
          dark: '#335d92',
          medium: '#446b9e',
          light: '#4f88c6'
        }
      },
      fontFamily: {
        display: [
          // "Gordita",
          " ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography')
  ],
  purge: {
    enabled: isProd,
    mode: "layers",
    layers: ["base", "components", "utilities"],
    content: ["src/**/*.html", "src/**/*.tsx"],
  },
}