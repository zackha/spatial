<script setup lang="ts">
const query = ref('glass')
const presses = ref(0)
</script>

<template>
  <SpSurface as="main" material="thick" class="dark">
    <h1>Hello from Spatial UI</h1>
    <SpBadge>New</SpBadge>
    <SpInput v-model="query" aria-label="Search">
      <template #leading>
        <span aria-hidden="true">⌕</span>
      </template>
    </SpInput>
    <p data-testid="query">
      {{ query }}
    </p>
    <SpButton variant="prominent" @click="presses++">
      Pressed {{ presses }} times
    </SpButton>
  </SpSurface>
</template>
