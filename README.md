# Spatial UI

Spatial glass components for Vue and Nuxt: translucent, blurred materials with soft specular edges, built on platform primitives and plain CSS.

> [!WARNING]
> Spatial UI 2 is a ground-up rewrite and is in early development. APIs will change until `2.0.0`. Pre-releases are published under the `next` tag.

- **Vue and Nuxt.** One package. Import components directly, auto-import them with a resolver, or install the Nuxt module.
- **Zero styling dependencies.** Plain CSS and design tokens. No Tailwind or CSS-in-JS required, and it works alongside both.
- **Override anything.** All styles live in a cascade layer, so your own CSS always wins, whatever its specificity.
- **SSR-ready.** Components render on the server and touch no browser globals during setup.

## Installation

```sh
pnpm add spatial-ui@next
```

Requires Vue 3.5 or later. The Nuxt module requires Nuxt 4.

### Nuxt

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['spatial-ui/nuxt'],
})
```

Components are auto-imported with the `Sp` prefix and the stylesheet is added for you:

```vue
<template>
  <SpSurface material="thick">
    Hello
  </SpSurface>
</template>
```

| Option | Default | Description |
| --- | --- | --- |
| `prefix` | `'Sp'` | Prefix for auto-imported components. |
| `components` | `true` | Register components for auto-import. |
| `css` | `true` | Add `spatial-ui/style.css` to the app. |

```ts
export default defineNuxtConfig({
  modules: ['spatial-ui/nuxt'],
  spatial: { prefix: 'Glass' },
})
```

### Vue with auto-import

With [`unplugin-vue-components`](https://github.com/unplugin/unplugin-vue-components):

```ts
// vite.config.ts
import { SpatialResolver } from 'spatial-ui/resolver'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        SpatialResolver()
      ]
    }),
  ],
})
```

The resolver also imports the stylesheet. It accepts `prefix` (default `'Sp'`) and `importStyle` (default `true`).

### Vue with explicit imports

```ts
// main.ts
import 'spatial-ui/style.css'
```

```vue
<script setup lang="ts">
import { Surface } from 'spatial-ui'
</script>

<template>
  <Surface>Hello</Surface>
</template>
```

## Styling

### Overriding

The stylesheet puts everything in the `spatial` cascade layer, and unlayered CSS always beats layered CSS. Override design tokens or component styles from your own CSS without raising specificity:

```css
:root {
  --sp-radius-surface: 1.5rem;
}

.sp-surface {
  padding: 2rem;
}
```

Custom properties prefixed `--sp-`, component classes such as `.sp-surface`, and `data-*` attributes such as `data-material` are public API and follow semantic versioning. Properties prefixed `--_` are private.

### With Tailwind CSS

Declare the layer order before importing Tailwind, so utilities override Spatial UI and Tailwind's base styles do not:

```css
@layer theme, base, spatial, components, utilities;
@import 'tailwindcss';
```

## Components

### Surface

A glass panel, the material every other component is made of.

| Prop | Type | Default |
| --- | --- | --- |
| `as` | `string \| Component` | `'div'` |
| `material` | `'thin' \| 'regular' \| 'thick'` | `'regular'` |

## Browser support

Browsers in [Baseline Widely available](https://web.dev/baseline). Glass effects use `backdrop-filter`.

## Development

```sh
pnpm install
pnpm dev          # build the package in watch mode
pnpm play         # run the Vite playground
pnpm test         # unit, browser and Nuxt tests
pnpm lint
pnpm typecheck
```

Browser tests run in Chromium locally and in Chromium, Firefox and WebKit in CI. Install the browser once with `pnpm exec playwright install chromium`.

## License

[MIT](./LICENSE)
