export interface DialogProps {
  /** The dialog title, announced when it opens. Or use the `title` slot. */
  title?: string
  /** A short description, announced after the title. Or use the `description` slot. */
  description?: string
}

export interface DialogSlots {
  /** The element that opens the dialog, such as a button. Optional with `v-model:open`. */
  trigger?: () => unknown
  /** Title content, instead of `title`. */
  title?: () => unknown
  /** Description content, instead of `description`. */
  description?: () => unknown
  /** The body. */
  default?: (props: { close: () => void }) => unknown
  /** Actions, aligned to the end. */
  footer?: (props: { close: () => void }) => unknown
}
