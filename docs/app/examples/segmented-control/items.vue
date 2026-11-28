<script setup lang="ts">
const quality = ref('hd')
const items = [
  { value: 'sd', label: 'SD' },
  { value: 'hd', label: 'HD' },
  { value: 'uhd', label: '4K', disabled: true },
]
</script>

<template>
  <SpSegmentedControl v-model="quality" :items size="sm" aria-label="Quality" />
</template>
