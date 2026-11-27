import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { page } from 'vitest/browser'
import { defineComponent, h } from 'vue'
import { expectNoA11yViolations } from '../../../test/utils/axe'
import Badge from './Badge.vue'
import '../../styles/index.css'

describe('badge', () => {
  it('renders a glass span by default', async () => {
    await render(Badge, {
      slots: {
        default: () => 'New',
      },
    })

    const badge = page.getByText('New')
    await expect.element(badge).toHaveClass('sp-badge')
    await expect.element(badge).toHaveClass('sp-material')
    await expect.element(badge).toHaveAttribute('data-variant', 'glass')
    expect(badge.element().tagName).toBe('SPAN')
  })

  it('renders the prominent variant without the glass material', async () => {
    await render(Badge, {
      props: { variant: 'prominent' },
      slots: {
        default: () => 'Live',
      },
    })

    const badge = page.getByText('Live')
    await expect.element(badge).toHaveAttribute('data-variant', 'prominent')
    await expect.element(badge).not.toHaveClass('sp-material')
  })

  it('renders as another element', async () => {
    await render(Badge, {
      props: { as: 'li' },
      slots: {
        default: () => 'Item',
      },
    })

    expect(page.getByText('Item').element().tagName).toBe('LI')
  })

  it('has no accessibility violations', async () => {
    const { container } = await render(defineComponent(() => () => [
      h(Badge, () => 'Glass'),
      h(Badge, { variant: 'prominent' }, () => 'Prominent'),
    ]))

    await expectNoA11yViolations(container)
  })
})
