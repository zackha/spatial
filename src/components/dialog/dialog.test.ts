import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { page, userEvent } from 'vitest/browser'
import { defineComponent, h, nextTick, ref } from 'vue'
import { expectNoA11yViolations } from '../../../test/utils/axe'
import Dialog from './Dialog.vue'
import '../../styles/index.css'

function openButton(label = 'Open'): ReturnType<typeof h> {
  return h('button', { type: 'button' }, label)
}

describe('dialog', () => {
  afterEach(() => vi.restoreAllMocks())

  it('opens from its trigger as a labelled, described modal', async () => {
    await render(() => h(Dialog, { title: 'Delete file?', description: 'This cannot be undone.' }, {
      trigger: () => openButton(),
    }))

    await page.getByRole('button', { name: 'Open' }).click()

    const dialog = page.getByRole('dialog', { name: 'Delete file?' })
    await expect.element(dialog).toHaveAccessibleDescription('This cannot be undone.')
    await expect.element(dialog).toHaveClass('sp-dialog')
    await expect.element(dialog).toHaveClass('sp-material')
    expect(document.querySelector('.sp-dialog-overlay')).not.toBeNull()
  })

  it('moves focus inside, closes with Escape and returns focus to the trigger', async () => {
    await render(() => h(Dialog, { title: 'Rename' }, {
      trigger: () => openButton('Rename'),
      default: () => h('input', { 'aria-label': 'Name' }),
    }))
    const opener = page.getByRole('button', { name: 'Rename' })

    await opener.click()
    await expect.element(page.getByRole('textbox', { name: 'Name' })).toHaveFocus()

    await userEvent.keyboard('{Escape}')
    await expect.element(page.getByRole('dialog')).not.toBeInTheDocument()
    await expect.element(opener).toHaveFocus()
  })

  it('keeps focus inside while open', async () => {
    // Text fields, because Safari's Tab skips buttons by default.
    await render(() => [
      h('input', { 'aria-label': 'Outside' }),
      h(Dialog, { title: 'Trapped' }, {
        trigger: () => openButton(),
        default: () => [
          h('input', { 'aria-label': 'One' }),
          h('input', { 'aria-label': 'Two' }),
        ],
      }),
    ])

    await page.getByRole('button', { name: 'Open' }).click()
    const dialog = page.getByRole('dialog').element()
    for (let press = 0; press < 4; press++) {
      await userEvent.keyboard('{Tab}')
      expect(dialog.contains(document.activeElement)).toBe(true)
    }
  })

  it('is controlled with v-model:open and closes from slot actions', async () => {
    const open = ref(false)
    await render(defineComponent(() => () => [
      h('button', {
        type: 'button',
        onClick: () => open.value = true,
      }, 'Show'),
      h(Dialog, {
        'title': 'Controlled',
        'open': open.value,
        'onUpdate:open': (next: boolean) => open.value = next,
      }, {
        footer: ({ close }: { close: () => void }) => h('button', { type: 'button', onClick: close }, 'Done'),
      }),
    ]))

    await page.getByRole('button', { name: 'Show' }).click()
    await expect.element(page.getByRole('dialog', { name: 'Controlled' })).toBeInTheDocument()

    await page.getByRole('button', { name: 'Done' }).click()
    expect(open.value).toBe(false)
    await expect.element(page.getByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes when the overlay is clicked', async () => {
    await render(() => h(Dialog, { title: 'Dismissable' }, {
      trigger: () => openButton(),
    }))

    await page.getByRole('button', { name: 'Open' }).click()
    await expect.element(page.getByRole('dialog')).toBeInTheDocument()
    await userEvent.click(document.body, {
      position: { x: 5, y: 5 },
    })
    await expect.element(page.getByRole('dialog')).not.toBeInTheDocument()
  })

  it('opts out of aria-describedby without a description, without warnings', async () => {
    const warn = vi.spyOn(console, 'warn')
    await render(() => h(Dialog, { title: 'Just a title' }, {
      trigger: () => openButton(),
    }))

    await page.getByRole('button', { name: 'Open' }).click()
    const dialog = page.getByRole('dialog', { name: 'Just a title' })
    await expect.element(dialog).not.toHaveAttribute('aria-describedby')
    expect(warn).not.toHaveBeenCalled()
  })

  it('takes the color scheme of what opened it', async () => {
    await render(() => h('div', { class: 'dark' }, h(Dialog, { title: 'Dark' }, {
      trigger: () => openButton(),
    })))

    await page.getByRole('button', { name: 'Open' }).click()
    await expect.element(page.getByRole('dialog')).toHaveAttribute('data-sp-scheme', 'dark')
    expect((document.querySelector('.sp-dialog-overlay') as HTMLElement).dataset.spScheme).toBe('dark')
  })

  it('takes the scheme of the focused opener when controlled', async () => {
    const open = ref(false)
    await render(defineComponent(() => () => h('div', { 'data-sp-scheme': 'dark' }, [
      h('button', {
        type: 'button',
        onClick: () => open.value = true,
      }, 'Show'),
      h(Dialog, {
        'title': 'From focus',
        'open': open.value,
        'onUpdate:open': (next: boolean) => open.value = next,
      }),
    ])))

    await page.getByRole('button', { name: 'Show' }).click()
    await nextTick()
    await expect.element(page.getByRole('dialog')).toHaveAttribute('data-sp-scheme', 'dark')
  })

  it('puts attributes on the dialog panel', async () => {
    await render(() => h(Dialog, { 'title': 'Styled', 'class': 'wide', 'data-testid': 'panel' }, {
      trigger: () => openButton(),
    }))

    await page.getByRole('button', { name: 'Open' }).click()
    await expect.element(page.getByRole('dialog')).toHaveClass('wide')
    await expect.element(page.getByRole('dialog')).toHaveAttribute('data-testid', 'panel')
  })

  it('has no accessibility violations when open', async () => {
    await render(() => h(Dialog, { title: 'Accessible', description: 'A described dialog.' }, {
      trigger: () => openButton(),
      default: () => h('p', 'Body text.'),
      footer: () => h('button', { type: 'button' }, 'OK'),
    }))

    await page.getByRole('button', { name: 'Open' }).click()
    await expectNoA11yViolations(page.getByRole('dialog').element())
  })
})
