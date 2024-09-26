<template>
  <div class="card">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.card {
  box-shadow: inset 0px 0px 2.5px 0px rgba(255, 255, 255, 0.1), inset 0px 0px 0px 0px rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4) 0px 15px 40px -10px;
  @apply rounded-3xl backdrop-blur-xl text-white w-96 h-96 p-3;
}
</style>
