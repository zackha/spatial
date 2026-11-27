import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'
import { stylesheet } from './scripts/stylesheet.ts'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    nuxt: 'src/nuxt.ts',
    resolver: 'src/resolver.ts',
  },
  platform: 'neutral',
  target: 'es2022',
  fixedExtension: true,
  plugins: [
    Vue({ isProduction: true }),
    stylesheet(),
  ],
  dts: {
    tsc: { vue: true },
  },
  publint: true,
  attw: {
    profile: 'esm-only',
    level: 'error',
    // Stylesheets have no type declarations to resolve.
    excludeEntrypoints: ['./style.css'],
  },
})
