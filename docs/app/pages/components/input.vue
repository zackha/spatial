<script setup lang="ts">
useHead({ title: 'Input · Spatial UI' })
</script>

<template>
  <h1>Input</h1>
  <p class="lead">
    A text field with room for icons and actions.
  </p>

  <h2>Icons and actions</h2>
  <p>Use the <code>leading</code> and <code>trailing</code> slots. Clicking the box or a decorative icon focuses the input; buttons in the slots work as usual.</p>
  <DocExample name="input/search" />

  <h2>Labels and errors</h2>
  <p>
    <code>class</code> and <code>style</code> apply to the visible box; every other attribute applies to the native <code>&lt;input&gt;</code>, so
    <code>&lt;label for&gt;</code>, <code>aria-describedby</code> and <code>aria-invalid</code> work as usual.
  </p>
  <DocExample name="input/labelled" />
  <p>A template ref exposes the native <code>input</code> and <code>focus()</code>. <code>v-model</code> modifiers are not supported yet.</p>

  <DocApi name="Input" />
</template>
