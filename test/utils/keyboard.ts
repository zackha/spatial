/**
 * Focuses `element` as keyboard navigation would, so `:focus-visible` matches.
 *
 * Tab is not used because Safari skips buttons and links by default, which
 * would test the platform rather than the component; and whether script focus
 * after a pointer click counts as "visible" differs between engines. The
 * standard `focusVisible` option states the intent in every engine.
 */
export function focusWithKeyboard(element: Element): void {
  (element as HTMLElement).focus({ focusVisible: true })
}
