<script setup lang="ts">
const range = ref('Week')
</script>

<template>
  <SpSegmentedControl v-model="range" :items="['Day', 'Week', 'Month']" aria-label="Range" />
  <p>Showing this {{ range.toLowerCase() }}.</p>
</template>
