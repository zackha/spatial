<script setup lang="ts">
useHead({ title: 'Surface · Spatial UI' })
</script>

<template>
  <h1>Surface</h1>
  <p class="lead">
    A glass panel: the material every other component is made of.
  </p>

  <h2>Materials</h2>
  <p>Thicker materials blur more and let less of the background through, which keeps foreground content legible over busy imagery.</p>
  <DocExample name="surface/materials" />
  <p>Render it as any element or component with <code>as</code>, for example <code>as="main"</code> or <code>as="section"</code>.</p>

  <DocApi name="Surface" />
</template>
