import type { InputExposed } from './types'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { page } from 'vitest/browser'
import { defineComponent, h, nextTick, ref } from 'vue'
import { expectNoA11yViolations } from '../../../test/utils/axe'
import { focusWithKeyboard } from '../../../test/utils/keyboard'
import Input from './Input.vue'
import '../../styles/index.css'

describe('input', () => {
  it('binds v-model in both directions', async () => {
    const value = ref('Initial')
    await render(defineComponent(() => () => h(Input, {
      'aria-label': 'Name',
      'modelValue': value.value,
      'onUpdate:modelValue': (next: string | undefined) => value.value = next ?? '',
    })))

    const input = page.getByRole('textbox', { name: 'Name' })
    await expect.element(input).toHaveValue('Initial')

    await input.fill('Typed')
    expect(value.value).toBe('Typed')

    value.value = 'Programmatic'
    await expect.element(input).toHaveValue('Programmatic')
  })

  it('works uncontrolled', async () => {
    await render(Input, {
      attrs: { 'aria-label': 'Free' },
    })

    const input = page.getByRole('textbox', { name: 'Free' })
    await input.fill('Hello')
    await expect.element(input).toHaveValue('Hello')
  })

  it('puts attributes on the native input and class and style on the box', async () => {
    const onFocus = vi.fn()
    const { container } = await render(Input, {
      props: { size: 'lg' },
      attrs: {
        'class': 'custom',
        'style': 'max-width: 20rem',
        'id': 'email',
        'type': 'email',
        'placeholder': 'you@example.com',
        'aria-label': 'Email',
        onFocus,
      },
    })

    const box = container.querySelector('.sp-input') as HTMLElement
    const input = page.getByRole('textbox', { name: 'Email' })

    expect(box.classList).toContain('custom')
    expect(box.classList).toContain('sp-material')
    expect(box.style.maxWidth).toBe('20rem')
    expect(box.dataset.size).toBe('lg')
    expect(box.hasAttribute('id')).toBe(false)

    await expect.element(input).toHaveAttribute('id', 'email')
    await expect.element(input).toHaveAttribute('type', 'email')
    await expect.element(input).toHaveAttribute('placeholder', 'you@example.com')
    await expect.element(input).not.toHaveClass('custom')

    await input.click()
    expect(onFocus).toHaveBeenCalledOnce()
  })

  it('is labelled by an external label', async () => {
    await render(defineComponent(() => () => [
      h('label', { for: 'city' }, 'City'),
      h(Input, { id: 'city' }),
    ]))

    await expect.element(page.getByRole('textbox', { name: 'City' })).toBeInTheDocument()
  })

  it('renders the leading and trailing slots only when given', async () => {
    const { container } = await render(Input, {
      attrs: { 'aria-label': 'Plain' },
    })
    expect(container.querySelector('.sp-input-leading')).toBeNull()
    expect(container.querySelector('.sp-input-trailing')).toBeNull()

    const { container: withSlots } = await render(Input, {
      attrs: { 'aria-label': 'Search' },
      slots: {
        leading: () => 'L',
        trailing: () => 'T',
      },
    })
    expect(withSlots.querySelector('.sp-input-leading')?.textContent).toBe('L')
    expect(withSlots.querySelector('.sp-input-trailing')?.textContent).toBe('T')
  })

  it('focuses the input when a decorative slot is clicked', async () => {
    await render(Input, {
      attrs: { 'aria-label': 'Search' },
      slots: {
        leading: () => h('span', { 'data-testid': 'icon' }, '🔍'),
      },
    })

    await page.getByTestId('icon').click()
    await expect.element(page.getByRole('textbox', { name: 'Search' })).toHaveFocus()
  })

  it('leaves interactive slot content alone', async () => {
    const onClear = vi.fn()
    await render(Input, {
      attrs: { 'aria-label': 'Search' },
      slots: {
        trailing: () => h('button', { type: 'button', onClick: onClear }, 'Clear'),
      },
    })

    await page.getByRole('button', { name: 'Clear' }).click()
    expect(onClear).toHaveBeenCalledOnce()
    // Whether the button takes focus is up to the platform (Safari does not);
    // what matters is that the input did not steal it.
    await expect.element(page.getByRole('textbox', { name: 'Search' })).not.toHaveFocus()
  })

  it('shows the focus ring on the box', async () => {
    const { container } = await render(Input, {
      attrs: { 'aria-label': 'Ring' },
    })

    focusWithKeyboard(page.getByRole('textbox', { name: 'Ring' }).element())
    await expect.element(page.getByRole('textbox', { name: 'Ring' })).toHaveFocus()
    expect(getComputedStyle(container.querySelector('.sp-input')!).outlineStyle).toBe('solid')
  })

  it('exposes the native input and focus()', async () => {
    const exposed = ref<InputExposed>()
    await render(defineComponent(() => () => h(Input, { 'ref': exposed, 'aria-label': 'Exposed' })))
    await nextTick()

    expect(exposed.value?.input).toBeInstanceOf(HTMLInputElement)
    exposed.value?.focus()
    await expect.element(page.getByRole('textbox', { name: 'Exposed' })).toHaveFocus()
  })

  it('reflects disabled and invalid states on the box', async () => {
    const { container } = await render(defineComponent(() => () => [
      h(Input, { 'aria-label': 'Disabled', 'disabled': true }),
      h(Input, { 'aria-label': 'Invalid', 'aria-invalid': 'true' }),
    ]))
    const [disabled, invalid] = container.querySelectorAll('.sp-input')

    await expect.element(page.getByRole('textbox', { name: 'Disabled' })).toBeDisabled()
    expect(getComputedStyle(disabled!).opacity).toBe('0.4')
    expect(getComputedStyle(invalid!).borderTopColor).not.toBe(getComputedStyle(disabled!).borderTopColor)
  })

  it('has no accessibility violations', async () => {
    const { container } = await render(defineComponent(() => () => [
      h(Input, { 'aria-label': 'Search' }, {
        leading: () => '🔍',
      }),
      h('label', { for: 'labelled' }, 'Labelled'),
      h(Input, { id: 'labelled', placeholder: 'Placeholder' }),
    ]))

    await expectNoA11yViolations(container)
  })
})
