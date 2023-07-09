
export const plugins = [
  require('postcss-preset-env'),
  require('postcss-combine-media-query'),
  require('autoprefixer'),
  require('cssnano')({ preset: ["default", { discardComments: { removeAll: true } }] }),
]

export default {
  stage: 1,
  browsers: 'last 6 versions',
  plugins: plugins,
}