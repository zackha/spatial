<script setup lang="ts">
useHead({ title: 'Tooltip · Spatial UI' })
</script>

<template>
  <h1>Tooltip</h1>
  <p class="lead">
    A short hint about an element, shown on hover and keyboard focus.
  </p>

  <DocExample name="tooltip/toolbar" />
  <ul>
    <li>It opens on hover after <code>delay</code>, and immediately on keyboard focus. Escape closes it.</li>
    <li>Moving from one tooltip to the next shortly after skips the delay, so scanning a toolbar is quick. No provider component is needed.</li>
    <li>The tooltip describes its trigger; it does not name it. Icon-only triggers still need an <code>aria-label</code>.</li>
    <li>Disabled buttons fire no pointer events, so their tooltips do not open on hover.</li>
  </ul>

  <DocApi name="Tooltip" />
</template>
