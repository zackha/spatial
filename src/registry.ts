/**
 * The single source of truth for the public component set.
 *
 * The Nuxt module and the unplugin resolver register exactly these names, and
 * `test/unit/registry.test.ts` fails if this list drifts from the named exports
 * of `src/index.ts`, the component directories, or the stylesheet imports.
 */
export const components = [
  'Badge',
  'Button',
  'Dialog',
  'Input',
  'SegmentedControl',
  'Surface',
  'Switch',
  'Tooltip',
] as const

export type ComponentName = (typeof components)[number]

/** The prefix used when components are registered globally, e.g. `<SpSurface>`. */
export const DEFAULT_PREFIX = 'Sp'

export const PACKAGE_NAME = 'spatial-ui'
