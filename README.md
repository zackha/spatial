# Spatial UI

Spatial glass components for Vue and Nuxt: translucent, blurred materials with soft specular edges, built on platform primitives and plain CSS.

> [!WARNING]
> Spatial UI 2 is a ground-up rewrite and is in early development. APIs will change until `2.0.0`. Pre-releases are published under the `next` tag.

- **Vue and Nuxt.** One package. Import components directly, auto-import them with a resolver, or install the Nuxt module.
- **Zero styling dependencies.** Plain CSS and design tokens. No Tailwind or CSS-in-JS required, and it works alongside both.
- **Override anything.** All styles live in a cascade layer, so your own CSS always wins, whatever its specificity.
- **SSR-ready.** Components render on the server and hydrate without mismatches.
- **Accessible.** Native elements, WAI-ARIA keyboard patterns (via [Reka UI](https://reka-ui.com) for interactive widgets), visible keyboard focus, and glass that adapts to reduced transparency, more contrast and forced colors.

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

### Color schemes

Spatial UI is light by default. Switch any subtree to dark with the `dark` class, and back with `light`:

```html
<html class="dark">
  …
  <section class="light">…</section>
</html>
```

This is the convention of [`@nuxtjs/color-mode`](https://color-mode.nuxtjs.org), VueUse's `useDark` and Tailwind CSS, so they work without configuration. If `dark` and `light` classes clash with your app, use `data-sp-scheme="dark"` and `data-sp-scheme="light"` instead.

Glass looks best over imagery, which often calls for the dark scheme even in a light app.

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

Color tokens are declared per scheme, so override them for both:

```css
:root {
  --sp-color-accent: oklch(60% 0.2 260);
}

.dark {
  --sp-color-accent: oklch(75% 0.15 260);
}
```

Custom properties prefixed `--sp-`, the classes `.sp-material` and `.sp-<component>`, and `data-*` attributes such as `data-variant` are public API and follow semantic versioning. Properties prefixed `--_` are private.

| Tokens | Purpose |
| --- | --- |
| `--sp-color-fg`, `--sp-color-fg-muted` | Content |
| `--sp-color-accent`, `--sp-color-accent-fg` | Prominent controls and the content on them |
| `--sp-color-focus`, `--sp-color-danger` | Focus rings, invalid fields |
| `--sp-material-{thin,regular,thick}-{tint,blur}` | Glass thickness |
| `--sp-material-solid` | The opaque fill used when transparency is reduced |
| `--sp-material-edge`, `--sp-material-highlight`, `--sp-material-shadow` | Glass edges and depth |
| `--sp-control-{sm,md,lg}-{height,padding,font-size}` | Control sizes |
| `--sp-radius-surface`, `--sp-radius-control` | Corner radii |
| `--sp-state-hover`, `--sp-state-active`, `--sp-state-disabled-opacity` | Interaction feedback |
| `--sp-focus-width`, `--sp-focus-offset`, `--sp-duration`, `--sp-easing` | Focus rings and motion |

See [`src/styles/tokens.css`](./src/styles/tokens.css) for every token and its default.

### Your own glass

`.sp-material` is the glass every component is made of. Add it to your own elements, with `data-material="thin"`, `"regular"` or `"thick"`:

```html
<aside class="sp-material" data-material="thin">…</aside>
```

### With Tailwind CSS

Declare the layer order before importing Tailwind, so utilities override Spatial UI and Tailwind's base styles do not:

```css
@layer theme, base, spatial, components, utilities;
@import 'tailwindcss';
```

## Accessibility

- Glass turns into an opaque fill when the user prefers reduced transparency or more contrast, and when the browser cannot blur.
- Safari does not expose its Reduce Transparency setting to CSS. Set `data-sp-transparency="reduce"` on any element to make the glass inside it opaque, for example from a user preference.
- In forced colors mode (Windows high contrast), every surface and control keeps a visible border, and selected or checked states are painted with system highlight colors.
- Text colors meet WCAG AA contrast over the default materials. Glass shows whatever is behind it, so check contrast over your own imagery, or use a thicker material.
- Motion is removed when the user prefers reduced motion.
- Focus rings show for keyboard focus only, using `:focus-visible`.

## Components

### Surface

A glass panel.

| Prop | Type | Default |
| --- | --- | --- |
| `as` | `string \| Component` | `'div'` |
| `material` | `'thin' \| 'regular' \| 'thick'` | `'regular'` |

### Button

```vue
<SpButton variant="prominent">
Watch
</SpButton>

<SpButton square aria-label="Close">
✕
</SpButton>

<SpButton as="a" href="/docs">
Docs
</SpButton>
```

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `'glass' \| 'prominent' \| 'plain'` | `'glass'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `square` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` |
| `as` | `string \| Component` | `'button'` |

- `type` defaults to `'button'`, so a button inside a form does not submit it unless you ask for `type="submit"`.
- A square button holds only an icon, so give it an accessible name with `aria-label`.
- Only native buttons can be disabled. Other elements, such as links, get `aria-disabled="true"` and the disabled look but stay operable. Render a button instead of a disabled link.

### Badge

```vue
<SpBadge>
New
</SpBadge>
```

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `'glass' \| 'prominent'` | `'glass'` |
| `as` | `string \| Component` | `'span'` |

### Input

```vue
<script setup lang="ts">
const query = ref('')
</script>

<template>
  <SpInput v-model="query" placeholder="Search…" aria-label="Search">
    <template #leading>
      <SearchIcon />
    </template>
  </SpInput>
</template>
```

| Prop | Type | Default |
| --- | --- | --- |
| `v-model` | `string` | |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |

| Slot | Description |
| --- | --- |
| `leading` | Content before the text, such as an icon |
| `trailing` | Content after the text, such as an icon or a button |

- `class` and `style` apply to the visible box. Every other attribute (`type`, `placeholder`, `id`, `aria-*`, `disabled`, event listeners) applies to the native `<input>`, so `<label for>` works as usual.
- Clicking the box or a decorative slot focuses the input. Interactive slot content, such as a clear button, works normally.
- Set `aria-invalid="true"` to mark the field invalid.
- Get the native element or focus it through a template ref, which exposes `input` and `focus()`.
- `v-model` modifiers (`.trim`, `.number`, `.lazy`) are not supported yet.

### Switch

```vue
<label>
  <SpSwitch v-model="autoplay" />
  Autoplay trailers
</label>
```

| Prop | Type | Default |
| --- | --- | --- |
| `v-model` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

- Label it by wrapping it in a `<label>`, with `<label for>` and an `id`, or with `aria-label`.
- With a `name`, it takes part in forms like a checkbox.

### SegmentedControl

Picks one of a few options, such as a view or a filter.

```vue
<SpSegmentedControl v-model="range" :items="['Day', 'Week', 'Month']" aria-label="Range" />
```

| Prop | Type | Default |
| --- | --- | --- |
| `v-model` | `string` | |
| `items` | `Array<string \| { value: string, label: string, disabled?: boolean }>` | |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `disabled` | `boolean` | `false` |

| Slot | Props | Description |
| --- | --- | --- |
| `item` | `{ item, selected }` | Custom content for each option |

- It is a radio group: Tab focuses the selected option, and the arrow keys move between options and select them, wrapping around.
- Give it an accessible name with `aria-label` or `aria-labelledby`.

### Tooltip

```vue
<SpTooltip text="Add to list">
  <SpButton square aria-label="Add to list">+</SpButton>
</SpTooltip>
```

| Prop | Type | Default |
| --- | --- | --- |
| `text` | `string` | |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` |
| `delay` | `number` (ms) | `500` |
| `disabled` | `boolean` | `false` |

| Slot | Description |
| --- | --- |
| default | The trigger: a single focusable element |
| `content` | Rich content instead of `text` |

- It opens on hover after `delay`, and immediately on keyboard focus. Escape closes it.
- Moving from one tooltip to the next shortly after skips the delay, so scanning a toolbar is quick. No provider component is needed.
- The tooltip describes its trigger. It does not name it, so icon-only triggers still need an `aria-label`.
- Disabled buttons fire no pointer events, so their tooltips do not open on hover.
- Attributes such as `class` apply to the tooltip bubble.

### Dialog

```vue
<SpDialog title="Delete file?" description="This cannot be undone.">
  <template #trigger>
    <SpButton>Delete</SpButton>
  </template>
  <template #footer="{ close }">
    <SpButton variant="plain" @click="close">Cancel</SpButton>
    <SpButton variant="prominent" @click="remove(); close()">Delete</SpButton>
  </template>
</SpDialog>
```

| Prop | Type | Default |
| --- | --- | --- |
| `v-model:open` | `boolean` | `false` |
| `title` | `string` | |
| `description` | `string` | |

| Slot | Props | Description |
| --- | --- | --- |
| `trigger` | | The element that opens the dialog. Optional with `v-model:open` |
| `title`, `description` | | Rich content instead of the props |
| default | `{ close }` | The body |
| `footer` | `{ close }` | Actions, aligned to the end |

- The dialog is modal. Focus moves inside and stays there, Escape or a click outside closes it, and focus returns to the trigger. The page behind does not scroll.
- Always give it a title, so it is announced when it opens.
- Attributes such as `class` apply to the dialog panel.
- The dialog renders at the end of `<body>`. It takes the color scheme of its trigger, or of where it is declared, so a dialog opened from a dark section is dark too.

## Browser support

Browsers in [Baseline Widely available](https://web.dev/baseline). Glass effects use `backdrop-filter`. The stylesheet stays correct when your bundler lowers it for older targets, as Vite does by default.

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
