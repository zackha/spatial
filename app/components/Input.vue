<template>
  <input class="input" type="text" placeholder="Search movies..." />
</template>

<style lang="postcss" scoped>
.input {
  box-shadow: inset 0.5px 0.5px 1px 0px rgba(255, 255, 255, 0.1), inset -0.5px -0.5px 1px 0px rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2) 0px 3px 10px -5px;
  @apply rounded-3xl w-full bg-white/10 py-2 px-4 outline-none transition-all placeholder:text-white/35;
  &:focus {
    @apply bg-white/15;
  }
}
</style>
