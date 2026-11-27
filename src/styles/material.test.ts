import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { page } from 'vitest/browser'
import { h } from 'vue'
import './index.css'

function renderMaterial(attrs: Record<string, string> = {}): Promise<unknown> {
  return render(() => h('div', { 'class': 'sp-material', 'data-testid': 'glass', ...attrs }, 'Glass'))
}

function style(): CSSStyleDeclaration {
  return getComputedStyle(page.getByTestId('glass').element())
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

describe('material', () => {
  it('is translucent glass by default', async () => {
    await renderMaterial()

    expect(style().backdropFilter).toContain('blur(24px)')
    expect(style().backgroundColor).not.toBe(solidColor())
  })

  it('takes its thickness from data-material', async () => {
    await renderMaterial({ 'data-material': 'thick' })

    expect(style().backdropFilter).toContain('blur(40px)')
  })

  it('follows the color scheme of its subtree', async () => {
    await render(() => [
      h('div', { 'class': 'sp-material', 'data-testid': 'default' }),
      h('div', { class: 'dark' }, [
        h('div', { 'class': 'sp-material', 'data-testid': 'dark-class' }),
        h('div', { class: 'light' }, h('div', { 'class': 'sp-material', 'data-testid': 'light-in-dark' })),
      ]),
      h('div', { 'data-sp-scheme': 'dark' }, h('div', { 'class': 'sp-material', 'data-testid': 'dark-attribute' })),
    ])
    const look = (id: string): string => {
      const { color, backgroundColor } = getComputedStyle(page.getByTestId(id).element())
      return `${color} on ${backgroundColor}`
    }

    expect(look('dark-class')).not.toBe(look('default'))
    expect(look('dark-attribute')).toBe(look('dark-class'))
    expect(look('light-in-dark')).toBe(look('default'))
  })

  it('turns solid when an ancestor opts out of transparency', async () => {
    await render(() => h('div', { 'data-sp-transparency': 'reduce' }, h('div', { 'class': 'sp-material', 'data-testid': 'glass' })))

    expect(style().backdropFilter).toBe('none')
    expect(style().backgroundColor).toBe(solidColor())
  })
})
