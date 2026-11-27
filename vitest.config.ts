import type { BrowserInstanceOption } from 'vitest/node'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

// Chromium locally for speed; every engine in CI, where it matters.
const browsers: BrowserInstanceOption[] = process.env.CI
  ? [
      { browser: 'chromium' },
      { browser: 'firefox' },
      { browser: 'webkit' },
    ]
  : [
      { browser: 'chromium' },
    ]

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
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: browsers,
          },
        },
      },
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
