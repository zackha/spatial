import process from 'node:process'

export default defineNuxtConfig({
  modules: ['spatial-ui/nuxt'],
  // CI also runs this fixture against the upcoming Nuxt 5 behaviour.
  future: {
    compatibilityVersion: process.env.NUXT_COMPATIBILITY_VERSION === '5'
      ? 5
      : 4,
  },
  compatibilityDate: '2026-11-27',
  devtools: { enabled: false },
  telemetry: false,
})
