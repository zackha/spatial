<script setup lang="ts">
import type { SegmentedControlItem, SegmentedControlProps, SegmentedControlSlots } from './types'
import { RadioGroupItem, RadioGroupRoot } from 'reka-ui'
import { computed } from 'vue'

const { items, size = 'md', disabled = false } = defineProps<SegmentedControlProps>()
defineSlots<SegmentedControlSlots>()

const model = defineModel<string>()

const options = computed<SegmentedControlItem[]>(() =>
  items.map(item => typeof item === 'string'
    ? { value: item, label: item }
    : item),
)
</script>

<template>
  <!--
    One of several values: a radio group. Arrow keys move and select, wrapping
    around per the APG; `loop` is Reka's default, stated so that an upstream
    change cannot silently alter it.
  -->
  <RadioGroupRoot
    v-model="model"
    class="sp-segmented-control sp-material"
    orientation="horizontal"
    loop
    :disabled
    :data-size="size"
    :data-disabled="disabled || undefined"
  >
    <RadioGroupItem
      v-for="option in options"
      :key="option.value"
      class="sp-segmented-control-item"
      :value="option.value"
      :disabled="option.disabled"
      :data-selected="option.value === model || undefined"
      :data-disabled="disabled || option.disabled || undefined"
    >
      <slot name="item" :item="option" :selected="option.value === model">
        {{ option.label }}
      </slot>
    </RadioGroupItem>
  </RadioGroupRoot>
</template>
