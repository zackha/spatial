/**
 * The DOM element behind a template ref, whether the ref holds an element or
 * a component instance (Reka UI 3 moves to element refs, so accept both).
 *
 * A component that renders no element of its own, such as a teleport, leaves
 * a placeholder node where it is declared; its parent element stands in.
 */
export function toElement(value: unknown): Element | undefined {
  if (value instanceof Element)
    return value

  const node = (value as { $el?: unknown } | null | undefined)?.$el
  if (node instanceof Element)
    return node
  if (node instanceof Node)
    return node.parentElement ?? undefined
}
