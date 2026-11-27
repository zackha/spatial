import type { ControlSize } from '../../types'

export interface InputProps {
  /**
   * @default 'md'
   */
  size?: ControlSize
}

export interface InputSlots {
  /** Content before the text, such as an icon. */
  leading?: () => unknown
  /** Content after the text, such as an icon or a button. */
  trailing?: () => unknown
}

export interface InputExposed {
  /** The native input element. */
  input: HTMLInputElement | null
  /** Focuses the native input. */
  focus: (options?: FocusOptions) => void
}
