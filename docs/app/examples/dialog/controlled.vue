<script setup lang="ts">
const open = ref(false)
const name = ref('My list')
</script>

<template>
  <SpButton @click="open = true">
    Rename “{{ name }}”
  </SpButton>
  <SpDialog v-model:open="open" title="Rename list">
    <template #default>
      <SpInput v-model="name" aria-label="List name" />
    </template>
    <template #footer="{ close }">
      <SpButton variant="prominent" @click="close">
        Done
      </SpButton>
    </template>
  </SpDialog>
</template>
