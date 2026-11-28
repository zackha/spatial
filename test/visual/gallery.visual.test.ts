import type { Component } from 'vue'
import { beforeAll, describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { page } from 'vitest/browser'
import { h } from 'vue'
import { Badge, Button, Dialog, Input, SegmentedControl, Surface, Switch } from '../../src'
import '../../src/styles/index.css'

/*
 * Visual regression tests. Rendering differs between operating systems and
 * GPUs, so reference images are only ever produced by CI (Linux), one per
 * browser: run the "Update screenshots" workflow on a branch to refresh them.
 * This project is not part of local runs.
 */

/** A fixed, high-contrast pattern, so blur and tint differences show. */
const BACKDROP = [
  'background-color: oklch(45% 0.12 200)',
  'background-image: repeating-linear-gradient(45deg, oklch(80% 0.15 90) 0 24px, transparent 24px 48px), radial-gradient(circle at 30% 40%, oklch(60% 0.2 330), transparent 60%)',
  'padding: 32px',
  'width: 720px',
  'box-sizing: border-box',
  'font-family: system-ui, sans-serif',
].join(';')

function scene(scheme: 'light' | 'dark', children: () => ReturnType<typeof h>[]): Component {
  return () => h('div', { 'class': scheme, 'style': BACKDROP, 'data-testid': 'scene' }, children())
}

function row(...children: ReturnType<typeof h>[]): ReturnType<typeof h> {
  return h('div', { style: 'display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-block: 16px' }, children)
}

function gallery(): ReturnType<typeof h>[] {
  return [
    row(
      ...(['thin', 'regular', 'thick'] as const).map(material =>
        h(Surface, { material, style: 'width: 200px; height: 96px; display: grid; place-items: center' }, () => material),
      ),
    ),
    row(
      h(Button, () => 'Glass'),
      h(Button, { variant: 'prominent' }, () => 'Prominent'),
      h(Button, { variant: 'plain' }, () => 'Plain'),
      h(Button, { 'square': true, 'aria-label': 'Close' }, () => '✕'),
      h(Button, { disabled: true }, () => 'Disabled'),
      h(Button, { size: 'sm' }, () => 'Small'),
      h(Button, { size: 'lg' }, () => 'Large'),
    ),
    row(
      h(Badge, () => 'Glass'),
      h(Badge, { variant: 'prominent' }, () => 'Prominent'),
      h(Switch, { 'aria-label': 'Off' }),
      h(Switch, { 'aria-label': 'On', 'modelValue': true }),
      h(SegmentedControl, {
        'aria-label': 'Range',
        'items': ['Day', 'Week', 'Month'],
        'modelValue': 'Week',
      }),
    ),
    row(
      h(Input, { 'aria-label': 'Empty', 'placeholder': 'Placeholder', 'style': 'width: 220px' }),
      h(Input, { 'aria-label': 'Filled', 'modelValue': 'Filled', 'style': 'width: 220px' }),
      h(Input, {
        'aria-label': 'Invalid',
        'aria-invalid': 'true',
        'modelValue': 'Invalid',
        'style': 'width: 220px',
      }),
    ),
  ]
}

describe('visual', () => {
  beforeAll(() => document.fonts.ready)

  for (const scheme of ['light', 'dark'] as const) {
    it(`renders every component in the ${scheme} scheme`, async () => {
      await render(scene(scheme, gallery))
      await expect.element(page.getByTestId('scene')).toMatchScreenshot(`gallery-${scheme}`)
    })
  }

  it('renders an open dialog', async () => {
    await render(scene('dark', () => [
      h(Dialog, { title: 'Delete file?', description: 'This cannot be undone.', open: true }, {
        footer: () => [
          h(Button, { variant: 'plain' }, () => 'Cancel'),
          h(Button, { variant: 'prominent' }, () => 'Delete'),
        ],
      }),
    ]))
    await expect.element(page.getByRole('dialog')).toMatchScreenshot('dialog')
  })
})
