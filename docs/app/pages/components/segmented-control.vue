<script setup lang="ts">
useHead({ title: 'Segmented control · Spatial UI' })
</script>

<template>
  <h1>Segmented control</h1>
  <p class="lead">
    Picks one of a few options, such as a view or a filter.
  </p>

  <DocExample name="segmented-control/basic" />
  <p>
    It is a radio group: Tab focuses the selected option, and the arrow keys move between options and select them, wrapping around. Give it an
    accessible name with <code>aria-label</code> or <code>aria-labelledby</code>.
  </p>

  <h2>Items</h2>
  <p>Strings are shorthand for <code>{ value, label }</code>. Objects can also be disabled. Use the <code>item</code> slot for custom content.</p>
  <DocExample name="segmented-control/items" />

  <DocApi name="SegmentedControl" />
</template>
