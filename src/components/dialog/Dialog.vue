<script setup lang="ts">
import type { Scheme } from '../../internal/scheme'
import type { DialogProps, DialogSlots } from './types'
import { DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from 'reka-ui'
import { computed, ref, useAttrs, useTemplateRef, watch } from 'vue'
import { toElement } from '../../internal/element'
import { schemeOf } from '../../internal/scheme'

defineOptions({ inheritAttrs: false })

const { title, description } = defineProps<DialogProps>()
const slots = defineSlots<DialogSlots>()
const open = defineModel<boolean>('open', { default: false })
const trigger = useTemplateRef('trigger')
const portal = useTemplateRef('portal')
const scheme = ref<Scheme>()

const attrs = useAttrs()
const hasDescription = computed(() => Boolean(description || slots.description))

/**
 * Attributes (e.g. `class`) style the dialog panel, the element people think
 * of as "the dialog". Without a description, `aria-describedby` is opted out
 * explicitly. Called from the template because `useAttrs()` is not reactive.
 */
function contentAttrs(): Record<string, unknown> {
  return hasDescription.value
    ? attrs
    : { ...attrs, 'aria-describedby': undefined }
}

function close(): void {
  open.value = false
}

/**
 * Take the scheme of the trigger, or else of where the dialog is declared
 * (the portal's placeholder), before the teleported content renders. Opening
 * only happens on the client, so `immediate` is not needed (and would
 * diverge from the server render of an initially open dialog).
 */
watch(open, (next) => {
  if (next)
    scheme.value = schemeOf(toElement(trigger.value) ?? toElement(portal.value))
}, { flush: 'pre' })
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger v-if="slots.trigger" ref="trigger" as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal ref="portal">
      <DialogOverlay class="sp-dialog-overlay" :data-sp-scheme="scheme" />
      <DialogContent
        class="sp-dialog sp-material"
        data-material="thick"
        :data-sp-scheme="scheme"
        v-bind="contentAttrs()"
      >
        <DialogTitle class="sp-dialog-title">
          <slot name="title">
            {{ title }}
          </slot>
        </DialogTitle>
        <DialogDescription v-if="hasDescription" class="sp-dialog-description">
          <slot name="description">
            {{ description }}
          </slot>
        </DialogDescription>
        <div v-if="slots.default" class="sp-dialog-body">
          <slot :close />
        </div>
        <div v-if="slots.footer" class="sp-dialog-footer">
          <slot name="footer" :close />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
