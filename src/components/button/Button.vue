<script setup lang="ts">
import type { ButtonProps, ButtonSlots } from './types'
import { computed } from 'vue'

const {
  as = 'button',
  variant = 'glass',
  size = 'md',
  square = false,
  disabled = false,
  type = 'button',
} = defineProps<ButtonProps>()

defineSlots<ButtonSlots>()

// `type` and `disabled` only exist on native buttons. Anything else can only
// announce that it is disabled.
const nativeAttrs = computed(() => as === 'button'
  ? { type, disabled }
  : { 'aria-disabled': disabled || undefined })
</script>

<template>
  <component
    :is="as"
    class="sp-button"
    :class="{ 'sp-material': variant === 'glass' }"
    :data-variant="variant"
    :data-size="size"
    :data-square="square || undefined"
    v-bind="nativeAttrs"
  >
    <slot />
  </component>
</template>
