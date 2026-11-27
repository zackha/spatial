import type { NuxtModule } from 'nuxt/schema'
import { addComponent, defineNuxtModule } from 'nuxt/kit'
import { components, DEFAULT_PREFIX, PACKAGE_NAME } from './registry'

export interface ModuleOptions {
  /**
   * The prefix components are registered with, e.g. `Sp` for `<SpSurface>`.
   * @default 'Sp'
   */
  prefix: string
  /**
   * Register every component for auto-import. Disable it to import components
   * explicitly from `spatial-ui`.
   * @default true
   */
  components: boolean
  /**
   * Add `spatial-ui/style.css` to the app. Disable it if you import the
   * stylesheet yourself, e.g. to control cascade layer order.
   * @default true
   */
  css: boolean
}

const nuxtModule: NuxtModule<ModuleOptions, ModuleOptions, false> = defineNuxtModule<ModuleOptions>({
  meta: {
    name: PACKAGE_NAME,
    configKey: 'spatial',
    compatibility: { nuxt: '>=4.0.0' },
  },
  defaults: {
    prefix: DEFAULT_PREFIX,
    components: true,
    css: true,
  },
  setup(options, nuxt) {
    if (options.css)
      nuxt.options.css.push(`${PACKAGE_NAME}/style.css`)

    if (options.components) {
      for (const name of components) {
        addComponent({
          name: `${options.prefix}${name}`,
          export: name,
          filePath: PACKAGE_NAME,
        })
      }
    }
  },
})

export default nuxtModule
