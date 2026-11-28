<script setup lang="ts">
useHead({ title: 'Button · Spatial UI' })
</script>

<template>
  <h1>Button</h1>
  <p class="lead">
    A native button with three levels of emphasis.
  </p>

  <h2>Variants</h2>
  <p>Glass for most actions, prominent for the primary one, plain for low emphasis.</p>
  <DocExample name="button/variants" />

  <h2>Sizes</h2>
  <DocExample name="button/sizes" />

  <h2>Icons</h2>
  <p>Place icons inside, next to the label. A <code>square</code> button holds only an icon, so give it an accessible name with <code>aria-label</code>.</p>
  <DocExample name="button/icon" />

  <h2>Links</h2>
  <p>Render a link that looks like a button with <code>as</code>, including router links.</p>
  <DocExample name="button/link" />
  <p>
    <code>type</code> defaults to <code>'button'</code>, so a button inside a form does not submit it unless you ask for <code>type="submit"</code>.
    Only native buttons can be disabled; other elements get <code>aria-disabled="true"</code> and the disabled look, but stay operable. Render a
    button instead of a disabled link.
  </p>

  <DocApi name="Button" />
</template>
