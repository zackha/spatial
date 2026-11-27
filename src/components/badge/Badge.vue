<script setup lang="ts">
import type { BadgeProps, BadgeSlots } from './types'

const { as = 'span', variant = 'glass' } = defineProps<BadgeProps>()

defineSlots<BadgeSlots>()
</script>

<template>
  <component
    :is="as"
    class="sp-badge"
    :class="{ 'sp-material': variant === 'glass' }"
    :data-variant="variant"
  >
    <slot />
  </component>
</template>
