import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { page, userEvent } from 'vitest/browser'
import { defineComponent, h, ref } from 'vue'
import { expectNoA11yViolations } from '../../../test/utils/axe'
import { focusWithKeyboard } from '../../../test/utils/keyboard'
import Switch from './Switch.vue'
import '../../styles/index.css'

describe('switch', () => {
  it('renders an unchecked switch and toggles on click', async () => {
    await render(Switch, {
      attrs: { 'aria-label': 'Wi-Fi' },
    })

    const control = page.getByRole('switch', { name: 'Wi-Fi' })
    await expect.element(control).toHaveAttribute('aria-checked', 'false')
    await expect.element(control).not.toHaveAttribute('data-checked')

    await control.click()
    await expect.element(control).toHaveAttribute('aria-checked', 'true')
    await expect.element(control).toHaveAttribute('data-checked')
  })

  it('binds v-model in both directions', async () => {
    const on = ref(true)
    await render(defineComponent(() => () => h(Switch, {
      'aria-label': 'Sync',
      'modelValue': on.value,
      'onUpdate:modelValue': (next: boolean) => on.value = next,
    })))

    const control = page.getByRole('switch', { name: 'Sync' })
    await expect.element(control).toHaveAttribute('aria-checked', 'true')

    await control.click()
    expect(on.value).toBe(false)

    on.value = true
    await expect.element(control).toHaveAttribute('aria-checked', 'true')
  })

  it('toggles with Space', async () => {
    await render(Switch, {
      attrs: { 'aria-label': 'Bluetooth' },
    })
    const control = page.getByRole('switch', { name: 'Bluetooth' })

    focusWithKeyboard(control.element())
    await userEvent.keyboard(' ')
    await expect.element(control).toHaveAttribute('aria-checked', 'true')
  })

  it('is labelled by an external label, which also toggles it', async () => {
    await render(() => [
      h('label', { for: 'airplane' }, 'Airplane mode'),
      h(Switch, { id: 'airplane' }),
    ])

    await page.getByText('Airplane mode').click()
    await expect.element(page.getByRole('switch', { name: 'Airplane mode' })).toHaveAttribute('aria-checked', 'true')
  })

  it('takes part in forms with a name', async () => {
    const { container } = await render(() => h('form', [
      h(Switch, { 'name': 'alerts', 'aria-label': 'Alerts' }),
    ]))
    const form = container.querySelector('form')!

    expect(new FormData(form).get('alerts')).toBeNull()
    await page.getByRole('switch', { name: 'Alerts' }).click()
    expect(new FormData(form).get('alerts')).toBe('on')
  })

  it('cannot be toggled when disabled', async () => {
    await render(Switch, {
      props: { disabled: true },
      attrs: { 'aria-label': 'Locked' },
    })

    const control = page.getByRole('switch', { name: 'Locked' })
    await expect.element(control).toBeDisabled()
    await control.click({ force: true })
    await expect.element(control).toHaveAttribute('aria-checked', 'false')
    expect(getComputedStyle(control.element()).opacity).toBe('0.4')
  })

  it('has no accessibility violations', async () => {
    const { container } = await render(() => [
      h(Switch, { 'aria-label': 'Off' }),
      h(Switch, { 'aria-label': 'On', 'modelValue': true }),
      h(Switch, { 'aria-label': 'Disabled', 'disabled': true }),
    ])

    await expectNoA11yViolations(container)
  })
})
