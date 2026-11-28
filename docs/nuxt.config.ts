export default defineNuxtConfig({
  // The docs consume the library exactly as a Nuxt app would.
  modules: ['spatial-ui/nuxt', './modules/component-meta'],
  css: ['~/assets/docs.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Spatial UI',
      meta: [
        { name: 'description', content: 'Spatial glass components for Vue and Nuxt.' },
      ],
    },
  },
  compatibilityDate: '2026-11-27',
  devtools: { enabled: false },
  telemetry: false,
})
