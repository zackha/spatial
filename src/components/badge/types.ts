import type { Component } from 'vue'

/**
 * - `glass`: a thin glass material.
 * - `prominent`: a solid accent fill, to draw attention.
 */
export type BadgeVariant = 'glass' | 'prominent'

export interface BadgeProps {
  /**
   * The element or component to render as.
   * @default 'span'
   */
  as?: string | Component
  /**
   * The visual emphasis of the badge.
   * @default 'glass'
   */
  variant?: BadgeVariant
}

export interface BadgeSlots {
  default?: () => unknown
}
