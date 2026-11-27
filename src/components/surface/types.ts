import type { Component } from 'vue'

/**
 * The thickness of a glass material. Thicker materials blur more and let less
 * of the background through, which keeps foreground content legible.
 */
export type SurfaceMaterial = 'thin' | 'regular' | 'thick'

export interface SurfaceProps {
  /**
   * The element or component to render as.
   * @default 'div'
   */
  as?: string | Component
  /**
   * The glass material of the surface.
   * @default 'regular'
   */
  material?: SurfaceMaterial
}

export interface SurfaceSlots {
  default?: () => unknown
}
