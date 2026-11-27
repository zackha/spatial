import { describe, expect, it } from 'vitest'
import { components } from '../../src/registry.ts'
import { SpatialResolver } from '../../src/resolver.ts'

describe('spatialResolver', () => {
  it('resolves every registered component with the default prefix', () => {
    const { resolve } = SpatialResolver()

    for (const name of components) {
      expect(resolve(`Sp${name}`)).toEqual({
        name,
        from: 'spatial-ui',
        sideEffects: 'spatial-ui/style.css',
      })
    }
  })

  it('honours a custom prefix', () => {
    const { resolve } = SpatialResolver({ prefix: 'Glass' })

    expect(resolve('GlassSurface')?.name).toBe('Surface')
    expect(resolve('SpSurface')).toBeUndefined()
  })

  it('supports an empty prefix', () => {
    expect(SpatialResolver({ prefix: '' }).resolve('Surface')?.name).toBe('Surface')
  })

  it('omits the stylesheet when importStyle is disabled', () => {
    expect(SpatialResolver({ importStyle: false }).resolve('SpSurface')).toEqual({
      name: 'Surface',
      from: 'spatial-ui',
    })
  })

  it('ignores names that are not Spatial UI components', () => {
    const { resolve } = SpatialResolver()

    expect(resolve('SpUnknown')).toBeUndefined()
    expect(resolve('RouterLink')).toBeUndefined()
    expect(resolve('Sp')).toBeUndefined()
  })
})
