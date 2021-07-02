import TerserAtomic from "terser-config-atomic"

export default {
  ...TerserAtomic,
  safari10: false, // set to true by Vite, so we should unset it again
  compress: {
    ...TerserAtomic.compress,
    ecma: 2020, // we target es2020
    unsafe_comps: false, // causes the typescript linter to detect all the words as reserved
  },
}
