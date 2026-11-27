export type Scheme = 'light' | 'dark'

/**
 * The color scheme in effect at `element`. Our scheme switches (`.dark`,
 * `.light`, `data-sp-scheme`) set `color-scheme`, as may the app itself.
 *
 * Teleported content (dialogs, tooltips) leaves the subtree that set its
 * scheme, so it reads the scheme of its trigger and re-applies it with
 * `data-sp-scheme`.
 */
export function schemeOf(element: Element | null | undefined): Scheme | undefined {
  if (!element)
    return

  const { colorScheme } = getComputedStyle(element)
  return colorScheme === 'dark' || colorScheme === 'light'
    ? colorScheme
    : undefined
}
