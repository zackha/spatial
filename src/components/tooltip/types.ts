export type TooltipSide = 'top' | 'right' | 'bottom' | 'left'

export interface TooltipProps {
  /** The tooltip text. Use the `content` slot for richer content. */
  text?: string
  /**
   * The preferred side of the trigger. It flips to stay in view.
   * @default 'top'
   */
  side?: TooltipSide
  /**
   * Milliseconds the pointer rests on the trigger before the tooltip opens.
   * Moving to another tooltip shortly after one closes skips the delay.
   * @default 500
   */
  delay?: number
  /**
   * Never opens the tooltip.
   * @default false
   */
  disabled?: boolean
}

export interface TooltipSlots {
  /** The trigger: a single focusable element, such as a button. */
  default?: () => unknown
  /** Tooltip content, instead of `text`. */
  content?: () => unknown
}
