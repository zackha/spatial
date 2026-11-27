<script setup lang="ts">
import type { SurfaceMaterial } from 'spatial-ui'

const materials: SurfaceMaterial[] = ['thin', 'regular', 'thick']
</script>

<template>
  <div class="stage">
    <SpSurface v-for="material in materials" :key="material" :material class="panel">
      {{ material }}
    </SpSurface>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.stage {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  background: url('/bg1.png') center / cover;
}

.panel {
  display: grid;
  place-items: center;
  inline-size: 14rem;
  block-size: 9rem;
  font-weight: 500;
  text-transform: capitalize;
}
</style>
