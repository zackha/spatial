import type { ControlSize } from '../../types'

export interface SegmentedControlItem {
  value: string
  label: string
  disabled?: boolean
}

export interface SegmentedControlProps {
  /**
   * The options. A string is shorthand for `{ value: string, label: string }`.
   */
  items: Array<string | SegmentedControlItem>
  /**
   * @default 'md'
   */
  size?: ControlSize
  /**
   * Disables every option.
   * @default false
   */
  disabled?: boolean
}

export interface SegmentedControlSlots {
  /** Custom content for each option. Defaults to its label. */
  item?: (props: { item: SegmentedControlItem, selected: boolean }) => unknown
}
