import axe from 'axe-core'
import { expect } from 'vitest'

/**
 * Runs axe-core against `element` in the real browser and fails with a
 * readable list of violations. Running in the browser (rather than jsdom)
 * means color contrast and computed styles are checked too.
 */
export async function expectNoA11yViolations(element: Element): Promise<void> {
  const { violations } = await axe.run(element, {
    resultTypes: ['violations'],
  })

  const report = violations.map(({ id, help, nodes }) =>
    `${id}: ${help}\n${nodes.map(node => `  ${node.html}`).join('\n')}`,
  )

  expect(report, report.join('\n\n')).toEqual([])
}
