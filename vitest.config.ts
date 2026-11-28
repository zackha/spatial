import type { Page } from 'playwright'
import type { BrowserCommand, BrowserInstanceOption } from 'vitest/node'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

// Chromium locally for speed; every engine in CI, where it matters. A
// function, because Vitest writes project names into the instance objects.
function browsers(): BrowserInstanceOption[] {
  return process.env.CI
    ? [
        { browser: 'chromium' },
        { browser: 'firefox' },
        { browser: 'webkit' },
      ]
    : [
        { browser: 'chromium' },
      ]
}

/** Emulates media features such as `forced-colors` (see `test/utils/media.ts`). */
const emulateMedia: BrowserCommand<[options: NonNullable<Parameters<Page['emulateMedia']>[0]>]> = (
  { page },
  options,
) => page.emulateMedia(options)

export default defineConfig({
  test: {
    projects: [
      {
        extends: false,
        plugins: [
          vue(),
        ],
        test: {
          name: 'unit',
          include: ['test/unit/**/*.test.ts'],
          environment: 'node',
        },
      },
      {
        extends: false,
        plugins: [
          vue(),
        ],
        test: {
          name: 'browser',
          include: ['src/**/*.test.ts'],
          exclude: ['src/**/*.media.test.ts'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: browsers(),
            commands: { emulateMedia },
          },
        },
      },
      {
        extends: false,
        plugins: [
          vue(),
        ],
        test: {
          name: 'browser-media',
          // Media emulation is page-wide, so these files must not run in
          // parallel with each other or share a page with other tests.
          include: ['src/**/*.media.test.ts'],
          fileParallelism: false,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: browsers(),
            commands: { emulateMedia },
          },
        },
      },
      // Reference images come from CI (Linux) only; see test/visual.
      ...(process.env.CI
        ? [
            {
              extends: false as const,
              plugins: [
                vue(),
              ],
              test: {
                name: 'visual',
                include: ['test/visual/**/*.visual.test.ts'],
                browser: {
                  enabled: true,
                  headless: true,
                  provider: playwright({
                    contextOptions: { deviceScaleFactor: 1 },
                  }),
                  instances: browsers(),
                  viewport: { width: 800, height: 900 },
                  expect: {
                    toMatchScreenshot: {
                      comparatorName: 'pixelmatch' as const,
                      comparatorOptions: { threshold: 0.1, allowedMismatchedPixelRatio: 0.01 },
                    },
                  },
                },
              },
            },
          ]
        : []),
      {
        extends: false,
        test: {
          name: 'nuxt',
          include: ['test/nuxt/**/*.test.ts'],
          environment: 'node',
          // Building the fixture app dominates these tests.
          hookTimeout: 180_000,
          testTimeout: 30_000,
        },
      },
    ],
  },
})
