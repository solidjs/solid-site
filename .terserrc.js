import TerserAtomic from "terser-config-atomic"

export default {
  ...TerserAtomic,
  compress: {
    ...TerserAtomic.compress,
    ecma: 2020,
  },
}
