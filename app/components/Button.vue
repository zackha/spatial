<template>
  <button class="button">
    <slot />
  </button>
</template>

<style lang="postcss" scoped>
.button {
  box-shadow: inset 0.5px 0.5px 1px 0px rgba(255, 255, 255, 0.1), inset -0.5px -0.5px 1px 0px rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2) 0px 3px 10px -5px;
  @apply flex items-center rounded-full py-2 px-2 transition-all backdrop-blur-sm bg-white/10 text-white;
  &:active {
    @apply scale-95;
  }
  &:hover {
    @apply bg-black/30;
  }
}
</style>
