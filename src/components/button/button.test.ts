import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { page, userEvent } from 'vitest/browser'
import { defineComponent, h } from 'vue'
import { expectNoA11yViolations } from '../../../test/utils/axe'
import { focusWithKeyboard } from '../../../test/utils/keyboard'
import Button from './Button.vue'
import '../../styles/index.css'

describe('button', () => {
  it('renders a native glass button that does not submit forms', async () => {
    await render(Button, {
      slots: {
        default: () => 'Save',
      },
    })

    const button = page.getByRole('button', { name: 'Save' })
    await expect.element(button).toHaveAttribute('type', 'button')
    await expect.element(button).toHaveClass('sp-button')
    await expect.element(button).toHaveClass('sp-material')
    await expect.element(button).toHaveAttribute('data-variant', 'glass')
    await expect.element(button).toHaveAttribute('data-size', 'md')
    await expect.element(button).not.toHaveAttribute('data-square')
  })

  it('passes the native type through', async () => {
    await render(Button, {
      props: { type: 'submit' },
      slots: {
        default: () => 'Send',
      },
    })

    await expect.element(page.getByRole('button', { name: 'Send' })).toHaveAttribute('type', 'submit')
  })

  it('renders variants, sizes and the square shape', async () => {
    await render(Button, {
      props: { variant: 'prominent', size: 'lg', square: true },
      attrs: { 'aria-label': 'Play' },
    })

    const button = page.getByRole('button', { name: 'Play' })
    await expect.element(button).toHaveAttribute('data-variant', 'prominent')
    await expect.element(button).toHaveAttribute('data-size', 'lg')
    await expect.element(button).toHaveAttribute('data-square')
    await expect.element(button).not.toHaveClass('sp-material')

    const style = getComputedStyle(button.element())
    expect(style.width).toBe(style.height)
  })

  it('activates with Enter, Space and click', async () => {
    const onClick = vi.fn()
    await render(Button, {
      attrs: { onClick },
      slots: {
        default: () => 'Go',
      },
    })
    const button = page.getByRole('button', { name: 'Go' })

    focusWithKeyboard(button.element())
    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard(' ')
    await button.click()

    expect(onClick).toHaveBeenCalledTimes(3)
  })

  it('shows a focus ring exactly when the browser deems focus visible', async () => {
    await render(Button, {
      slots: {
        default: () => 'Focus me',
      },
    })
    const button = page.getByRole('button', { name: 'Focus me' }).element()
    const ring = (): string => getComputedStyle(button).outlineStyle

    focusWithKeyboard(button)
    expect(button.matches(':focus-visible')).toBe(true)
    expect(ring()).toBe('solid')
    expect(getComputedStyle(button).outlineWidth).toBe('2px')

    // After a pointer click, whether focus is "visible" is the browser's call
    // (engines differ); the ring must simply follow it.
    await page.getByRole('button', { name: 'Focus me' }).click()
    expect(ring()).toBe(button.matches(':focus-visible')
      ? 'solid'
      : 'none')
  })

  it('disables a native button', async () => {
    const onClick = vi.fn()
    await render(Button, {
      props: { disabled: true },
      attrs: { onClick },
      slots: {
        default: () => 'Off',
      },
    })

    const button = page.getByRole('button', { name: 'Off' })
    await expect.element(button).toBeDisabled()
    // A real pointer click; `force` skips Playwright's wait for it to be enabled.
    await button.click({ force: true })
    expect(onClick).not.toHaveBeenCalled()
    expect(getComputedStyle(button.element()).opacity).toBe('0.4')
  })

  it('renders as a link without native button attributes', async () => {
    await render(Button, {
      props: { as: 'a' },
      attrs: { href: '#docs' },
      slots: {
        default: () => 'Docs',
      },
    })

    const link = page.getByRole('link', { name: 'Docs' })
    await expect.element(link).toHaveAttribute('href', '#docs')
    await expect.element(link).not.toHaveAttribute('type')
    await expect.element(link).not.toHaveAttribute('aria-disabled')
  })

  it('marks non-button elements as disabled with aria-disabled', async () => {
    await render(Button, {
      props: { as: 'a', disabled: true },
      attrs: { href: '#docs' },
      slots: {
        default: () => 'Docs',
      },
    })

    const link = page.getByRole('link', { name: 'Docs' })
    await expect.element(link).toHaveAttribute('aria-disabled', 'true')
    await expect.element(link).not.toHaveAttribute('disabled')
    expect(getComputedStyle(link.element()).opacity).toBe('0.4')
  })

  it('renders as a component', async () => {
    const Link = defineComponent((_, { slots }) => () => h('a', { href: '#home' }, slots.default?.()))
    await render(Button, {
      props: { as: Link },
      slots: {
        default: () => 'Home',
      },
    })

    await expect.element(page.getByRole('link', { name: 'Home' })).toHaveClass('sp-button')
  })

  it('has no accessibility violations', async () => {
    const { container } = await render(defineComponent(() => () => [
      h(Button, () => 'Glass'),
      h(Button, { variant: 'prominent' }, () => 'Prominent'),
      h(Button, { variant: 'plain' }, () => 'Plain'),
      h(Button, { 'square': true, 'aria-label': 'Close' }, () => '×'),
      h(Button, { disabled: true }, () => 'Disabled'),
    ]))

    await expectNoA11yViolations(container)
  })
})
