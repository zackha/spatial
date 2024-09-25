<template>
  <button class="button">
    <slot />
  </button>
</template>

<style lang="postcss" scoped>
.button {
  box-shadow: inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0.2) 0px 3px 10px -5px;
  @apply flex items-center rounded-full py-1.5 px-3.5 transition-all bg-white/30;
  &:active {
    @apply scale-95;
  }
  &:hover {
    @apply bg-black/30 text-white;
  }
}
</style>
