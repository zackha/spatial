<script setup lang="ts">
const query = ref('')
</script>

<template>
  <SpInput v-model="query" placeholder="Search movies…" aria-label="Search movies" class="field">
    <template #leading>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="currentColor" d="M10 4a6 6 0 1 0 3.9 10.6l4.8 4.7 1.4-1.4-4.7-4.8A6 6 0 0 0 10 4Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
      </svg>
    </template>
    <template v-if="query" #trailing>
      <SpButton variant="plain" size="sm" square aria-label="Clear" @click="query = ''">
        ✕
      </SpButton>
    </template>
  </SpInput>
</template>

<style scoped>
.field {
  max-inline-size: 20rem;
}
</style>
