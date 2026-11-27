import { Buffer } from 'node:buffer'
import { fileURLToPath } from 'node:url'
import browserslist from 'browserslist'
import { browserslistToTargets, bundle, transform } from 'lightningcss'
import { describe, expect, it } from 'vitest'
import { BROWSERS } from '../../scripts/stylesheet.ts'

const entry = fileURLToPath(new URL('../../src/styles/index.css', import.meta.url))

function build(): string {
  const { code } = bundle({
    filename: entry,
    targets: browserslistToTargets(browserslist(BROWSERS)),
  })
  return code.toString()
}

/**
 * The stylesheet is processed again by every consumer's bundler. Vite's
 * default build target (`'baseline-widely-available'`) is a frozen list that
 * is older than ours; lowering for it must not change what the CSS means.
 */
const CONSUMER_TARGETS = {
  chrome: 111,
  edge: 111,
  firefox: 114,
  safari: 16.4,
  ios_saf: 16.4,
}

describe('stylesheet', () => {
  it('bundles without warnings', () => {
    const { warnings } = bundle({
      filename: entry,
      targets: browserslistToTargets(browserslist(BROWSERS)),
    })
    expect(warnings).toEqual([])
  })

  it('keeps all styles in the spatial cascade layer', () => {
    const css = build()
    // Every rule that opens at the start of a line is a top-level rule.
    const topLevel = css.match(/^[^\s}][^{]*/gm) ?? []

    expect(topLevel.length).toBeGreaterThan(0)
    expect(topLevel.filter(rule => !rule.startsWith('@layer spatial.'))).toEqual([])
  })

  it('survives lowering by consumer bundlers without runtime polyfills', () => {
    const targets = browserslistToTargets(
      Object.entries(CONSUMER_TARGETS).map(([browser, version]) => `${browser} ${version}`),
    )
    const lowered = transform({
      filename: 'style.css',
      code: Buffer.from(build()),
      targets,
    }).code.toString()

    // e.g. `light-dark()` becomes `var(--lightningcss-light, …)`, which only
    // reacts to `color-scheme` declared in the CSS that the bundler saw. (The
    // toggles it adds next to our `color-scheme` declarations are harmless.)
    expect(lowered.match(/[^\n]*var\(--lightningcss-[^\n]*/g) ?? []).toEqual([])
  })
})
