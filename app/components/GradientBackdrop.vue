<template>
  <div class="gradient-blur"></div>
</template>

<style lang="postcss" scoped>
.gradient-blur {
  @apply absolute inset-0 brightness-50;
  backdrop-filter: blur(20px);
  mask-image: linear-gradient(to bottom, transparent 0%, black 80%);
}
</style>
