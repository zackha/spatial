<template>
  <div class="chip"><slot>Chip</slot></div>
</template>

<style lang="postcss" scoped>
.chip {
  box-shadow: inset 0.5px 0.5px 1px 0px rgba(255, 255, 255, 0.1), inset -0.5px -0.5px 1px 0px rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2) 0px 3px 10px -5px;
  @apply backdrop-blur-2xl px-3 py-1.5 rounded-full text-sm flex items-center justify-center transition-all select-none;
  &:hover {
    @apply bg-white/10;
  }
}
</style>
