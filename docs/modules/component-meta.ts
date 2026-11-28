import type { ComponentMeta, PropertyMeta } from 'vue-component-meta'
import { resolve } from 'node:path'
import { addTemplate, addTypeTemplate, defineNuxtModule } from 'nuxt/kit'
import { createChecker } from 'vue-component-meta'
import { components } from '../../src/registry'

/**
 * Extracts props, slots and events from the library's source with
 * vue-component-meta, so API tables never drift from the code, and exposes
 * them as `#component-meta`. It reads `src/registry.ts` for the component
 * list, like the rest of the tooling.
 */
export default defineNuxtModule({
  meta: { name: 'component-meta' },
  setup(_, nuxt) {
    const root = resolve(nuxt.options.rootDir, '..')
    // The schema is only used to spell out union aliases such as `ButtonVariant`.
    const checker = createChecker(resolve(root, 'tsconfig.json'), {
      schema: {
        ignore: ['Component'],
      },
    })

    /**
     * Spells out aliases of literal unions (`ButtonVariant` → `"glass" | …`)
     * and drops `undefined` from optional props. Other types keep the name
     * they have in the source, such as `string | Component`.
     */
    const display = ({ type, schema }: PropertyMeta): string => {
      const declared = type.split(' | ').filter(member => member !== 'undefined')
      const members = typeof schema === 'object' && schema.kind === 'enum'
        ? (schema.schema ?? []).filter(member => member !== 'undefined')
        : []
      const literals = members.length > 0 && members.every(member => typeof member === 'string')
      return (literals ? members as string[] : declared).join(' | ').replace('false | true', 'boolean')
    }

    const kebab = (name: string): string => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
    const docs = Object.fromEntries(components.map((name) => {
      const meta: ComponentMeta = checker.getComponentMeta(resolve(root, 'src/components', kebab(name), `${name}.vue`))
      return [
        name,
        {
          props: meta.props.filter(prop => !prop.global).map(prop => ({
            name: prop.name,
            type: display(prop),
            required: prop.required,
            default: prop.default,
            description: prop.description,
          })),
          slots: meta.slots.map(slot => ({ name: slot.name, type: slot.type, description: slot.description })),
          events: meta.events.map(event => ({ name: event.name, type: event.type, description: event.description })),
        },
      ]
    }))

    const template = addTemplate({
      filename: 'component-meta.mjs',
      getContents: () => `export default ${JSON.stringify(docs, null, 2)}`,
    })
    nuxt.options.alias['#component-meta'] = template.dst

    addTypeTemplate({
      filename: 'types/component-meta.d.ts',
      getContents: () => `declare module '#component-meta' {
  interface Member { name: string, type: string, description: string }
  interface Prop extends Member { required: boolean, default?: string }
  const meta: Record<string, { props: Prop[], slots: Member[], events: Member[] }>
  export default meta
}
`,
    })
  },
})
