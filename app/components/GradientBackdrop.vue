<template>
  <div class="gradient-blur"></div>
</template>

<style lang="postcss" scoped>
.gradient-blur {
  @apply absolute inset-0 brightness-50;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent);
  backdrop-filter: blur(30px);
  mask-image: linear-gradient(to bottom, transparent 0%, black 80%);
}
</style>
