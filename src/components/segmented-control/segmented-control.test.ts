import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { page, userEvent } from 'vitest/browser'
import { defineComponent, h, ref } from 'vue'
import { expectNoA11yViolations } from '../../../test/utils/axe'
import { focusWithKeyboard, press } from '../../../test/utils/keyboard'
import SegmentedControl from './SegmentedControl.vue'
import '../../styles/index.css'

const items = ['Day', 'Week', 'Month']

async function renderControlled(initial = 'Week', extra: Record<string, unknown> = {}): Promise<{ value: { value: string | undefined } }> {
  const value = ref<string | undefined>(initial)
  await render(defineComponent(() => () => h(SegmentedControl, {
    'aria-label': 'Range',
    items,
    'modelValue': value.value,
    'onUpdate:modelValue': (next: string | undefined) => value.value = next,
    ...extra,
  })))
  return { value }
}

describe('segmented control', () => {
  it('renders a labelled radio group of options', async () => {
    await renderControlled()

    await expect.element(page.getByRole('radiogroup', { name: 'Range' })).toHaveClass('sp-segmented-control')
    expect(page.getByRole('radio').elements()).toHaveLength(3)
    await expect.element(page.getByRole('radio', { name: 'Week' })).toHaveAttribute('aria-checked', 'true')
    await expect.element(page.getByRole('radio', { name: 'Week' })).toHaveAttribute('data-selected')
  })

  it('selects on click', async () => {
    const { value } = await renderControlled()

    await page.getByRole('radio', { name: 'Month' }).click()
    await expect.poll(() => value.value).toBe('Month')
    await expect.element(page.getByRole('radio', { name: 'Month' })).toHaveAttribute('aria-checked', 'true')
    await expect.element(page.getByRole('radio', { name: 'Week' })).not.toHaveAttribute('data-selected')
  })

  it('moves and selects with the arrow keys, wrapping around', async () => {
    const { value } = await renderControlled('Week')

    focusWithKeyboard(page.getByRole('radio', { name: 'Week' }).element())
    await press('ArrowRight')
    await expect.poll(() => value.value).toBe('Month')
    await expect.element(page.getByRole('radio', { name: 'Month' })).toHaveFocus()

    await press('ArrowRight')
    await expect.poll(() => value.value).toBe('Day')

    await press('ArrowLeft')
    await expect.poll(() => value.value).toBe('Month')
  })

  it('is a single tab stop that lands on the selected option', async () => {
    await render(defineComponent(() => () => [
      h('button', { type: 'button' }, 'Before'),
      h(SegmentedControl, { 'aria-label': 'Range', items, 'modelValue': 'Month' }),
    ]))

    focusWithKeyboard(page.getByRole('button', { name: 'Before' }).element())
    await userEvent.tab()
    await expect.element(page.getByRole('radio', { name: 'Month' })).toHaveFocus()
  })

  it('accepts objects and skips disabled options', async () => {
    const value = ref('a')
    await render(defineComponent(() => () => h(SegmentedControl, {
      'aria-label': 'Letters',
      'items': [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B', disabled: true },
        { value: 'c', label: 'C' },
      ],
      'modelValue': value.value,
      'onUpdate:modelValue': (next: string | undefined) => value.value = next ?? '',
    })))

    await expect.element(page.getByRole('radio', { name: 'B' })).toBeDisabled()
    focusWithKeyboard(page.getByRole('radio', { name: 'A' }).element())
    await press('ArrowRight')
    await expect.poll(() => value.value).toBe('c')
  })

  it('renders custom option content', async () => {
    await render(SegmentedControl, {
      props: { items },
      attrs: { 'aria-label': 'Range' },
      slots: {
        item: ({ item }: { item: { label: string } }) => h('span', `${item.label}!`),
      },
    })

    await expect.element(page.getByRole('radio', { name: 'Day!' })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    await renderControlled()
    await expect.element(page.getByRole('radiogroup')).toBeInTheDocument()

    await expectNoA11yViolations(page.getByRole('radiogroup').element())
  })
})
