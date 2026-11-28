<script setup lang="ts">
const autoplay = ref(true)
const captions = ref(false)
</script>

<template>
  <label class="setting">
    <SpSwitch v-model="autoplay" />
    Autoplay trailers
  </label>
  <label class="setting">
    <SpSwitch v-model="captions" />
    Captions
  </label>
</template>

<style scoped>
.setting {
  display: inline-flex;
  gap: 0.75rem;
  align-items: center;
}
</style>
