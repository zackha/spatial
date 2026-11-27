import type { Page } from 'playwright'
import { commands } from 'vitest/browser'

export type MediaFeatures = NonNullable<Parameters<Page['emulateMedia']>[0]>

declare module 'vitest/browser' {
  interface BrowserCommands {
    emulateMedia: (features: MediaFeatures) => Promise<void>
  }
}

/** Emulates user preferences such as `forced-colors` in the real browser. */
export function emulateMedia(features: MediaFeatures): Promise<void> {
  return commands.emulateMedia(features)
}

/** Restores every emulated media feature to the browser default. */
export function resetMedia(): Promise<void> {
  return commands.emulateMedia({
    colorScheme: null,
    contrast: null,
    forcedColors: null,
    reducedMotion: null,
  })
}
