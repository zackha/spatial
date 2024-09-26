<script setup lang="ts">
const imageUrls = ['/bg/bg1.png', '/bg/bg2.png', '/bg/bg3.jpeg', '/bg/bg4.jpeg'];
const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
</script>

<template>
  <div :style="{ backgroundImage: `url(${randomImage})` }" class="background-image">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.background-image {
  @apply relative h-screen w-screen bg-cover bg-center;
}

.content {
  @apply absolute inset-0 flex items-center justify-center;
}
</style>
