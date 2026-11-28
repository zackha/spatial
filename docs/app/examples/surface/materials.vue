<template>
  <SpSurface material="thin" class="panel">
    Thin
  </SpSurface>
  <SpSurface class="panel">
    Regular
  </SpSurface>
  <SpSurface material="thick" class="panel">
    Thick
  </SpSurface>
</template>

<style scoped>
.panel {
  display: grid;
  place-items: center;
  inline-size: 10rem;
  block-size: 7rem;
}
</style>
