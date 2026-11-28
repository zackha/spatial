<script setup lang="ts">
useHead({ title: 'Spatial UI' })
</script>

<template>
  <h1>Spatial UI</h1>
  <p class="lead">
    Glass components for Vue and Nuxt: translucent, blurred materials with soft specular edges, built on platform primitives and plain CSS.
  </p>

  <DocExample name="button/icon" />

  <h2>Installation</h2>
  <pre><code>pnpm add spatial-ui@next</code></pre>
  <p>Requires Vue 3.5 or later. The Nuxt module requires Nuxt 4.</p>

  <h3>Nuxt</h3>
  <p>Add the module. Components are auto-imported with the <code>Sp</code> prefix, and the stylesheet is added for you.</p>
  <pre><code>// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['spatial-ui/nuxt'],
})</code></pre>
  <p>
    Options, under the <code>spatial</code> key: <code>prefix</code> (default <code>'Sp'</code>), <code>components</code> (register components, default
    <code>true</code>) and <code>css</code> (add the stylesheet, default <code>true</code>).
  </p>

  <h3>Vue with auto-import</h3>
  <p>With <a href="https://github.com/unplugin/unplugin-vue-components">unplugin-vue-components</a>. The resolver also imports the stylesheet.</p>
  <pre><code>// vite.config.ts
import { SpatialResolver } from 'spatial-ui/resolver'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [vue(), Components({ resolvers: [SpatialResolver()] })],
})</code></pre>

  <h3>Vue with explicit imports</h3>
  <pre><code>// main.ts
import 'spatial-ui/style.css'

// Component.vue
import { Button } from 'spatial-ui'</code></pre>

  <h2>Principles</h2>
  <ul>
    <li><strong>Platform first.</strong> Native elements where they suffice; <a href="https://reka-ui.com">Reka UI</a> for focus management and positioning in interactive widgets.</li>
    <li><strong>Zero styling dependencies.</strong> Plain CSS and design tokens, in a cascade layer that your own CSS always overrides.</li>
    <li><strong>Accessible.</strong> WAI-ARIA keyboard patterns, visible focus, and glass that adapts to reduced transparency, more contrast and forced colors.</li>
    <li><strong>SSR-ready.</strong> Components render on the server and hydrate without mismatches.</li>
  </ul>
</template>
