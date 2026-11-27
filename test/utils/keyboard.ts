import { userEvent } from 'vitest/browser'

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

/**
 * Presses and holds `key` briefly, like a person does. Playwright otherwise
 * sends key down and up back to back, and code that reacts to a key being
 * held (Reka UI's radio group selects on arrow-key focus) sees neither.
 */
export async function press(key: string): Promise<void> {
  await userEvent.keyboard(`{${key}>}`)
  await new Promise(resolve => setTimeout(resolve, 50))
  await userEvent.keyboard(`{/${key}}`)
}
