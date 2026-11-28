<script setup lang="ts">
useHead({ title: 'Theming · Spatial UI' })
</script>

<template>
  <h1>Theming</h1>
  <p class="lead">
    Spatial UI is plain CSS. Change it with design tokens and ordinary selectors; no build step or configuration is involved.
  </p>

  <h2>Color schemes</h2>
  <p>
    Light is the default. Switch any subtree to dark with the <code>dark</code> class, and back with <code>light</code>. This is the convention of
    <code>@nuxtjs/color-mode</code>, VueUse's <code>useDark</code> and Tailwind CSS, so they work without configuration. If those class names clash
    with your app, use <code>data-sp-scheme="dark"</code> and <code>data-sp-scheme="light"</code> instead.
  </p>
  <pre><code>&lt;html class="dark"&gt;
  …
  &lt;section class="light"&gt;…&lt;/section&gt;
&lt;/html&gt;</code></pre>
  <p>Dialogs and tooltips render at the end of <code>&lt;body&gt;</code> and take the scheme of their trigger, so they match where they were opened from.</p>

  <h2>Overriding</h2>
  <p>
    Every style lives in the <code>spatial</code> cascade layer, and unlayered CSS always beats layered CSS, whatever the specificity. Override tokens or
    component classes from your own stylesheet:
  </p>
  <pre><code>:root {
  --sp-radius-surface: 1.5rem;
}

.sp-surface {
  padding: 2rem;
}</code></pre>
  <p>Color tokens are declared per scheme, so override them for both:</p>
  <pre><code>:root {
  --sp-color-accent: oklch(60% 0.2 260);
}

.dark {
  --sp-color-accent: oklch(75% 0.15 260);
}</code></pre>
  <p>
    Custom properties prefixed <code>--sp-</code>, the classes <code>.sp-material</code> and <code>.sp-&lt;component&gt;</code>, and
    <code>data-*</code> attributes such as <code>data-variant</code> are public API and follow semantic versioning. Properties prefixed <code>--_</code>
    are private.
  </p>

  <h2>Tokens</h2>
  <table class="docs-table">
    <thead>
      <tr><th>Tokens</th><th>Purpose</th></tr>
    </thead>
    <tbody>
      <tr><td><code>--sp-color-fg</code>, <code>--sp-color-fg-muted</code></td><td>Content</td></tr>
      <tr><td><code>--sp-color-accent</code>, <code>--sp-color-accent-fg</code></td><td>Prominent controls and the content on them</td></tr>
      <tr><td><code>--sp-color-focus</code>, <code>--sp-color-danger</code>, <code>--sp-color-overlay</code></td><td>Focus rings, invalid fields, dialog backdrops</td></tr>
      <tr><td><code>--sp-material-{thin,regular,thick}-{tint,blur}</code></td><td>Glass thickness</td></tr>
      <tr><td><code>--sp-material-solid</code></td><td>The opaque fill used when transparency is reduced</td></tr>
      <tr><td><code>--sp-material-edge</code>, <code>--sp-material-highlight</code>, <code>--sp-material-shadow</code></td><td>Glass edges and depth</td></tr>
      <tr><td><code>--sp-control-{sm,md,lg}-{height,padding,font-size}</code></td><td>Control sizes</td></tr>
      <tr><td><code>--sp-radius-surface</code>, <code>--sp-radius-control</code></td><td>Corner radii</td></tr>
      <tr><td><code>--sp-state-hover</code>, <code>--sp-state-active</code>, <code>--sp-state-disabled-opacity</code></td><td>Interaction feedback</td></tr>
      <tr><td><code>--sp-focus-width</code>, <code>--sp-focus-offset</code>, <code>--sp-duration</code>, <code>--sp-easing</code></td><td>Focus rings and motion</td></tr>
    </tbody>
  </table>

  <h2>Your own glass</h2>
  <p>
    <code>.sp-material</code> is the glass every component is made of. Add it to your own elements, with <code>data-material</code> set to
    <code>thin</code>, <code>regular</code> or <code>thick</code>.
  </p>
  <pre><code>&lt;aside class="sp-material" data-material="thin"&gt;…&lt;/aside&gt;</code></pre>

  <h2>With Tailwind CSS</h2>
  <p>Declare the layer order before importing Tailwind, so utilities override Spatial UI and Tailwind's base styles do not:</p>
  <pre><code>@layer theme, base, spatial, components, utilities;
@import 'tailwindcss';</code></pre>
</template>
