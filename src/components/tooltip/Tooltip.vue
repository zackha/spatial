<script setup lang="ts">
import type { Scheme } from '../../internal/scheme'
import type { TooltipProps, TooltipSlots } from './types'
import { TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'reka-ui'
import { ref, useTemplateRef } from 'vue'
import { toElement } from '../../internal/element'
import { schemeOf } from '../../internal/scheme'
import { onTooltipOpenChange, warm } from './warmth'

// Attributes (e.g. `class`) style the tooltip bubble.
defineOptions({ inheritAttrs: false })

const { text, side = 'top', delay = 500, disabled = false } = defineProps<TooltipProps>()

defineSlots<TooltipSlots>()

const trigger = useTemplateRef('trigger')
const scheme = ref<Scheme>()

function onOpenChange(open: boolean): void {
  if (open)
    scheme.value = schemeOf(toElement(trigger.value))
  onTooltipOpenChange(open)
}
</script>

<template>
  <!-- Reka requires a provider; the shared delay lives in `warmth.ts`. -->
  <TooltipProvider>
    <TooltipRoot
      :delay-duration="warm ? 0 : delay"
      :disabled
      ignore-non-keyboard-focus
      @update:open="onOpenChange"
    >
      <TooltipTrigger ref="trigger" as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          class="sp-tooltip sp-material"
          :side
          :side-offset="8"
          :collision-padding="8"
          :data-sp-scheme="scheme"
          v-bind="$attrs"
        >
          <slot name="content">
            {{ text }}
          </slot>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
