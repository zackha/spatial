<script setup lang="ts">
useHead({ title: 'Switch · Spatial UI' })
</script>

<template>
  <h1>Switch</h1>
  <p class="lead">
    Turns a setting on or off, effective immediately.
  </p>

  <DocExample name="switch/labelled" />
  <p>
    Label it by wrapping it in a <code>&lt;label&gt;</code>, with <code>&lt;label for&gt;</code> and an <code>id</code>, or with
    <code>aria-label</code>. With a <code>name</code>, it takes part in forms like a checkbox.
  </p>

  <DocApi name="Switch" />
</template>
