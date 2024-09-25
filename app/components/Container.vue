<template>
  <div :style="{ backgroundImage: `url(${randomImage})` }" class="relative h-screen w-screen bg-cover bg-center">
    <div class="absolute inset-0 flex items-center justify-center backdrop-blur-xl backdrop-brightness-50">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const imageUrls = [
  'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg',
  'https://images.pexels.com/photos/27459648/pexels-photo-27459648/free-photo-of-chair.jpeg',
];
const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
</script>
