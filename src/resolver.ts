import type { ComponentName } from './registry'
import { components, DEFAULT_PREFIX, PACKAGE_NAME } from './registry'

export interface SpatialResolverOptions {
  /**
   * The prefix your templates use, e.g. `Sp` for `<SpSurface>`.
   * @default 'Sp'
   */
  prefix?: string
  /**
   * Import `spatial-ui/style.css` alongside the first resolved component.
   * Disable it if you import the stylesheet yourself.
   * @default true
   */
  importStyle?: boolean
}

/**
 * Structurally compatible with `ComponentResolver` from
 * `unplugin-vue-components`, declared locally so the published types do not
 * depend on that package.
 */
export interface SpatialComponentResolver {
  type: 'component'
  resolve: (name: string) => SpatialResolvedComponent | undefined
}

export interface SpatialResolvedComponent {
  name: ComponentName
  from: typeof PACKAGE_NAME
  sideEffects?: string
}

const known = new Set<string>(components)

function isComponentName(name: string): name is ComponentName {
  return known.has(name)
}

/**
 * Resolves Spatial UI components for `unplugin-vue-components`.
 *
 * @example
 * ```ts
 * import Components from 'unplugin-vue-components/vite'
 * import { SpatialResolver } from 'spatial-ui/resolver'
 *
 * Components({ resolvers: [SpatialResolver()] })
 * ```
 */
export function SpatialResolver(options: SpatialResolverOptions = {}): SpatialComponentResolver {
  const { prefix = DEFAULT_PREFIX, importStyle = true } = options

  return {
    type: 'component',
    resolve(name) {
      if (!name.startsWith(prefix))
        return

      const component = name.slice(prefix.length)
      if (!isComponentName(component))
        return

      return {
        name: component,
        from: PACKAGE_NAME,
        ...(importStyle && { sideEffects: `${PACKAGE_NAME}/style.css` }),
      }
    },
  }
}
