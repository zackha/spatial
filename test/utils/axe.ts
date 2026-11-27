import axe from 'axe-core'
import { expect } from 'vitest'

/**
 * Runs axe-core against `element` in the real browser and fails with a
 * readable list of violations. Running in the browser (rather than jsdom)
 * means color contrast and computed styles are checked too.
 *
 * Entrance transitions are awaited first: half-faded text is not a contrast
 * problem, but axe would measure it as one.
 */
export async function expectNoA11yViolations(element: Element): Promise<void> {
  await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {})))

  const { violations } = await axe.run(element, {
    resultTypes: ['violations'],
  })

  const report = violations.map(({ id, help, nodes }) =>
    `${id}: ${help}\n${nodes.map(node => `  ${node.html}\n    ${node.failureSummary?.replace(/\n/g, ' ')}`).join('\n')}`,
  )

  expect(report, report.join('\n\n')).toEqual([])
}
