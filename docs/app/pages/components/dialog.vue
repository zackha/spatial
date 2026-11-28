<script setup lang="ts">
useHead({ title: 'Dialog · Spatial UI' })
</script>

<template>
  <h1>Dialog</h1>
  <p class="lead">
    A modal window for a decision or a short task.
  </p>

  <h2>With a trigger</h2>
  <DocExample name="dialog/confirm" />
  <p>
    Focus moves inside and stays there. Escape or a click outside closes it, and focus returns to the trigger. The page behind does not scroll. Always give it
    a title, so it is announced when it opens.
  </p>

  <h2>Controlled</h2>
  <p>Open it from anywhere with <code>v-model:open</code>. The default and footer slots receive <code>close</code>.</p>
  <DocExample name="dialog/controlled" />

  <DocApi name="Dialog" />
</template>
