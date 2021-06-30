import TerserAtomic from "terser-config-atomic"

export default {
  ...TerserAtomic,
  safari10: false, // set to true by Vite, so we should unset it again
  compress: {
    ...TerserAtomic.compress,
    ecma: 2020,
  },
}
