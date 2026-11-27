import type { Component } from 'vue'
import type { ControlSize } from '../../types'

/**
 * - `glass`: a thin glass material, for most actions.
 * - `prominent`: a solid accent fill, for the primary action.
 * - `plain`: no fill until hovered, for low-emphasis actions.
 */
export type ButtonVariant = 'glass' | 'prominent' | 'plain'

export interface ButtonProps {
  /**
   * The element or component to render as, e.g. `'a'` or `RouterLink`.
   * @default 'button'
   */
  as?: string | Component
  /**
   * The visual emphasis of the button.
   * @default 'glass'
   */
  variant?: ButtonVariant
  /**
   * @default 'md'
   */
  size?: ControlSize
  /**
   * Equal width and height, for a button that holds only an icon. Give it an
   * accessible name with `aria-label`.
   * @default false
   */
  square?: boolean
  /**
   * Disables a native button. Other elements cannot be truly disabled: they
   * get `aria-disabled="true"` and the disabled look, and stay operable. Render
   * a button rather than a disabled link.
   * @default false
   */
  disabled?: boolean
  /**
   * The type of a native button. Defaults to `'button'` so that a button in a
   * form does not submit it by accident.
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset'
}

export interface ButtonSlots {
  default?: () => unknown
}
