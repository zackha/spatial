import { access, readdir, readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'
import * as library from '../../src/index.ts'
import { components } from '../../src/registry.ts'

const root = new URL('../../src/', import.meta.url)
const docs = new URL('../../docs/app/', import.meta.url)

function kebab(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Every place a component must be wired into, checked against the registry,
 * so adding or removing a component cannot be done halfway.
 */
describe('component registry', () => {
  it('lists every runtime export of the package entry', () => {
    expect(Object.keys(library).sort()).toEqual([...components].sort())
  })

  it('has exactly one directory per component', async () => {
    const entries = await readdir(new URL('components/', root), { withFileTypes: true })
    const dirs = entries.filter(entry => entry.isDirectory()).map(entry => entry.name)

    expect(dirs.sort()).toEqual(components.map(kebab).sort())
  })

  it('imports every component stylesheet into its cascade layer', async () => {
    const css = await readFile(new URL('styles/index.css', root), 'utf8')

    for (const name of components) {
      const dir = kebab(name)
      expect(css).toContain(`@import '../components/${dir}/${dir}.css' layer(spatial.components);`)
    }
  })

  it('documents every component with a page and at least one example', async () => {
    for (const name of components) {
      const dir = kebab(name)
      await expect(access(new URL(`pages/components/${dir}.vue`, docs)), `docs page for ${name}`).resolves.toBeUndefined()

      const examples = await readdir(new URL(`examples/${dir}/`, docs))
      expect(examples.filter(file => file.endsWith('.vue')).length, `examples for ${name}`).toBeGreaterThan(0)
    }
  })
})
