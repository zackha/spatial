<script setup lang="ts">
import type { SwitchProps } from './types'
import { SwitchRoot, SwitchThumb } from 'reka-ui'

const { disabled = false } = defineProps<SwitchProps>()
const checked = defineModel<boolean>({ default: false })
</script>

<template>
  <SwitchRoot
    v-model="checked"
    class="sp-switch"
    :disabled
    :data-checked="checked || undefined"
    :data-disabled="disabled || undefined"
  >
    <SwitchThumb class="sp-switch-thumb" />
  </SwitchRoot>
</template>
