import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { page } from 'vitest/browser'
import { defineComponent, h } from 'vue'
import { expectNoA11yViolations } from '../../../test/utils/axe'
import Surface from './Surface.vue'
import '../../styles/index.css'

describe('surface', () => {
  it('renders a div with the regular material by default', async () => {
    await render(Surface, {
      slots: {
        default: () => 'Content',
      },
    })

    const surface = page.getByText('Content')
    await expect.element(surface).toHaveClass('sp-surface')
    await expect.element(surface).toHaveAttribute('data-material', 'regular')
    await expect.element(surface).toHaveClass('sp-material')
    expect(surface.element().tagName).toBe('DIV')
  })

  it('renders the requested material', async () => {
    await render(Surface, {
      props: { material: 'thick' },
      slots: {
        default: () => 'Thick',
      },
    })

    await expect.element(page.getByText('Thick')).toHaveAttribute('data-material', 'thick')
  })

  it('renders as another element', async () => {
    await render(Surface, {
      props: { as: 'section' },
      attrs: { 'aria-label': 'Panel' },
    })

    await expect.element(page.getByRole('region', { name: 'Panel' })).toHaveClass('sp-surface')
  })

  it('renders as a component', async () => {
    const Card = defineComponent((_, { slots }) => () => h('article', slots.default?.()))
    await render(Surface, {
      props: { as: Card },
      slots: {
        default: () => 'Card',
      },
    })

    const surface = page.getByText('Card')
    await expect.element(surface).toHaveClass('sp-surface')
    expect(surface.element().tagName).toBe('ARTICLE')
  })

  it('merges consumer classes and attributes onto the root', async () => {
    await render(Surface, {
      attrs: { 'class': 'custom', 'data-testid': 'surface' },
    })

    const surface = page.getByTestId('surface')
    await expect.element(surface).toHaveClass('sp-surface')
    await expect.element(surface).toHaveClass('custom')
  })

  it('applies the glass material from the stylesheet', async () => {
    await render(Surface, {
      attrs: { 'data-testid': 'surface' },
    })

    const style = getComputedStyle(page.getByTestId('surface').element())
    expect(style.backdropFilter).toContain('blur(24px)')
    expect(style.borderTopLeftRadius).not.toBe('0px')
  })

  it('lets unlayered consumer CSS override tokens', async () => {
    const style = document.createElement('style')
    style.textContent = ':root { --sp-material-regular-blur: 3px }'
    document.head.append(style)

    try {
      await render(Surface, {
        attrs: { 'data-testid': 'surface' },
      })
      expect(getComputedStyle(page.getByTestId('surface').element()).backdropFilter).toContain('blur(3px)')
    }
    finally {
      style.remove()
    }
  })

  it('has no accessibility violations', async () => {
    const { container } = await render(Surface, {
      slots: {
        default: () => 'Accessible',
      },
    })

    await expectNoA11yViolations(container)
  })
})
