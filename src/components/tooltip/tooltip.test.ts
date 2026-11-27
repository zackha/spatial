import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { page, userEvent } from 'vitest/browser'
import { h } from 'vue'
import { expectNoA11yViolations } from '../../../test/utils/axe'
import { focusWithKeyboard } from '../../../test/utils/keyboard'
import Tooltip from './Tooltip.vue'
import '../../styles/index.css'

function trigger(label: string): ReturnType<typeof h> {
  return h('button', { type: 'button' }, label)
}

/** The visible tooltip bubble (Reka also renders a hidden copy for screen readers). */
function bubble(): HTMLElement | null {
  return document.querySelector('.sp-tooltip')
}

describe('tooltip', () => {
  beforeEach(() => userEvent.unhover(document.body))
  afterEach(() => userEvent.unhover(document.body))

  it('opens on hover after the delay and describes its trigger', async () => {
    await render(() => h(Tooltip, { text: 'Add to list', delay: 100 }, () => trigger('Add')))
    const button = page.getByRole('button', { name: 'Add' })

    await button.hover()
    await expect.element(page.getByRole('tooltip')).toHaveTextContent('Add to list')
    await expect.element(button).toHaveAccessibleDescription('Add to list')
    expect(bubble()?.classList).toContain('sp-material')
  })

  it('opens on keyboard focus and closes with Escape', async () => {
    await render(() => h(Tooltip, { text: 'Search' }, () => trigger('Find')))

    focusWithKeyboard(page.getByRole('button', { name: 'Find' }).element())
    await expect.element(page.getByRole('tooltip')).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    await expect.poll(bubble).toBeNull()
  })

  it('does not open on pointer focus', async () => {
    await render(() => h(Tooltip, { text: 'Hint', delay: 10_000 }, () => trigger('Click me')))

    await page.getByRole('button', { name: 'Click me' }).click()
    await new Promise(resolve => setTimeout(resolve, 200))
    expect(bubble()).toBeNull()
  })

  it('renders rich content from the content slot', async () => {
    await render(() => h(Tooltip, { delay: 0 }, {
      default: () => trigger('Info'),
      content: () => h('strong', 'Bold hint'),
    }))

    await page.getByRole('button', { name: 'Info' }).hover()
    await expect.poll(() => bubble()?.querySelector('strong')?.textContent).toBe('Bold hint')
  })

  it('never opens when disabled', async () => {
    await render(() => h(Tooltip, { text: 'Hidden', delay: 0, disabled: true }, () => trigger('Quiet')))

    await page.getByRole('button', { name: 'Quiet' }).hover()
    await new Promise(resolve => setTimeout(resolve, 200))
    expect(bubble()).toBeNull()
  })

  it('skips the delay when moving on from a tooltip that just closed', async () => {
    await render(() => [
      h(Tooltip, { text: 'First tip', delay: 100 }, () => trigger('First')),
      h(Tooltip, { text: 'Second tip', delay: 5000 }, () => trigger('Second')),
    ])

    await page.getByRole('button', { name: 'First' }).hover()
    await expect.element(page.getByRole('tooltip')).toHaveTextContent('First tip')

    // Well under the second tooltip's own 5 s delay.
    await page.getByRole('button', { name: 'Second' }).hover()
    await expect.element(page.getByRole('tooltip'), { timeout: 1000 }).toHaveTextContent('Second tip')
  })

  it('takes the color scheme of its trigger', async () => {
    await render(() => h('div', { class: 'dark' }, h(Tooltip, { text: 'Dark tip', delay: 0 }, () => trigger('Dark'))))

    await page.getByRole('button', { name: 'Dark' }).hover()
    await expect.poll(() => bubble()?.dataset.spScheme).toBe('dark')
  })

  it('puts attributes on the tooltip bubble', async () => {
    await render(() => h(Tooltip, { text: 'Styled tip', delay: 0, class: 'roomy' }, () => trigger('Styled')))

    await page.getByRole('button', { name: 'Styled' }).hover()
    await expect.poll(() => bubble()?.classList.contains('roomy')).toBe(true)
    await expect.element(page.getByRole('button', { name: 'Styled' })).not.toHaveClass('roomy')
  })

  it('has no accessibility violations when open', async () => {
    const { container } = await render(() => h(Tooltip, { text: 'Accessible tip', delay: 0 }, () => trigger('Tip')))

    await page.getByRole('button', { name: 'Tip' }).hover()
    await expect.element(page.getByRole('tooltip')).toBeInTheDocument()
    await expectNoA11yViolations(container)
    await expectNoA11yViolations(bubble()!)
  })
})
