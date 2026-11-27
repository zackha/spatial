import { afterEach, describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { page, server } from 'vitest/browser'
import { h } from 'vue'
import { emulateMedia, resetMedia } from '../../test/utils/media'
import SegmentedControl from '../components/segmented-control/SegmentedControl.vue'
import Switch from '../components/switch/Switch.vue'
import './index.css'

/*
 * Tests that emulate user preferences (contrast, forced colors). Emulation
 * applies to the whole browser page, which test files otherwise share in
 * parallel, so these run in their own sequential project (`*.media.test.ts`).
 */

function renderMaterial(attrs: Record<string, string> = {}): Promise<unknown> {
  return render(() => h('div', { 'class': 'sp-material', 'data-testid': 'glass', ...attrs }, 'Glass'))
}

function style(): CSSStyleDeclaration {
  return getComputedStyle(page.getByTestId('glass').element())
}

/** Whether the engine really forces colors, not just the media query. */
function colorsAreForced(): boolean {
  const probe = document.createElement('div')
  probe.style.color = 'rgb(255, 0, 1)'
  document.body.append(probe)
  const forced = getComputedStyle(probe).color !== 'rgb(255, 0, 1)'
  probe.remove()
  return forced
}

/** Resolves the opaque fallback color the same way the material would. */
function solidColor(): string {
  const probe = document.createElement('div')
  probe.style.backgroundColor = 'var(--sp-material-solid)'
  page.getByTestId('glass').element().after(probe)
  const color = getComputedStyle(probe).backgroundColor
  probe.remove()
  return color
}

describe('user preferences', () => {
  afterEach(() => resetMedia())

  it('turns solid with a visible edge when more contrast is preferred', async ({ skip }) => {
    // In Firefox, Playwright's emulation flips `matchMedia` but does not restyle
    // stylesheets that were loaded before it, layered or not (verified with a
    // bare `<style>`), so this cannot be observed there.
    if (server.browser === 'firefox')
      skip()

    await emulateMedia({ contrast: 'more' })
    await renderMaterial()

    expect(style().backdropFilter).toBe('none')
    expect(style().backgroundColor).toBe(solidColor())
    expect(style().borderTopColor).not.toBe('rgba(0, 0, 0, 0)')
  })

  it('keeps a visible boundary in forced colors mode', async ({ skip }) => {
    // Only Chromium implements forced colors; elsewhere at most the media
    // query is emulated, without the browser actually forcing colors.
    await emulateMedia({ forcedColors: 'active' })
    if (!colorsAreForced())
      skip()

    await renderMaterial()

    expect(style().backdropFilter).toBe('none')
    expect(style().boxShadow).toBe('none')
    expect(style().borderTopStyle).toBe('solid')
    expect(style().borderTopColor).not.toBe('rgba(0, 0, 0, 0)')
  })

  it('shows its state in forced colors mode', async ({ skip }) => {
    await emulateMedia({ forcedColors: 'active' })
    if (!matchMedia('(forced-colors: active)').matches)
      skip()

    await render(() => [
      h(Switch, { 'aria-label': 'Off' }),
      h(Switch, { 'aria-label': 'On', 'modelValue': true }),
    ])
    const fill = (name: string): string => getComputedStyle(page.getByRole('switch', { name }).element()).backgroundColor

    expect(fill('On')).not.toBe(fill('Off'))
  })

  it('shows the selection in forced colors mode', async ({ skip }) => {
    await emulateMedia({ forcedColors: 'active' })
    if (!matchMedia('(forced-colors: active)').matches)
      skip()

    await render(() => h(SegmentedControl, {
      'aria-label': 'Range',
      'items': ['Day', 'Week', 'Month'],
      'modelValue': 'Week',
    }))
    const fill = (name: string): string => getComputedStyle(page.getByRole('radio', { name }).element()).backgroundColor

    await expect.element(page.getByRole('radio', { name: 'Week' })).toBeInTheDocument()
    expect(fill('Week')).not.toBe(fill('Day'))
  })
})
