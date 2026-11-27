<script setup lang="ts">
import type { SurfaceProps, SurfaceSlots } from './types'

const { as = 'div', material = 'regular' } = defineProps<SurfaceProps>()

defineSlots<SurfaceSlots>()
</script>

<template>
  <component :is="as" class="sp-surface sp-material" :data-material="material">
    <slot />
  </component>
</template>
