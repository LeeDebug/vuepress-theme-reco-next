import { defineStyle } from '@vuepress-reco/core'
import { path } from '@vuepress/utils'
import { pages, tailwindConfig } from './node'

export default defineStyle({
  pages,

  clientAppEnhanceFiles: path.resolve(
    __dirname,
    './client/clientAppEnhance.js'
  ),

  onInitialized(app): void {
    app.options.bundlerConfig = {
      postcss: {
        postcssOptions: {
          plugins: {
            tailwindcss: tailwindConfig,
            autoprefixer: {},
          },
        },
      },
      ...app.options.bundlerConfig,
    }
  },
})