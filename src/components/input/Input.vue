<script setup lang="ts">
import type { InputExposed, InputProps, InputSlots } from './types'
import { useAttrs, useTemplateRef } from 'vue'

defineOptions({ inheritAttrs: false })

const { size = 'md' } = defineProps<InputProps>()
const slots = defineSlots<InputSlots>()
const model = defineModel<string>()
const attrs = useAttrs()
const root = useTemplateRef<HTMLElement>('root')
const input = useTemplateRef<HTMLInputElement>('input')

/**
 * `class` and `style` style the visible box; every other attribute (`type`,
 * `placeholder`, `aria-*`, `id`, listeners…) belongs on the native input.
 * Called from the template because `useAttrs()` is not reactive.
 */
function fieldAttrs(): Record<string, unknown> {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
}

const INTERACTIVE = 'a[href], button, input, select, textarea, [tabindex]'

/** Clicking the box or a decorative slot focuses the input, like a native field. */
function onPointerdown(event: PointerEvent): void {
  const target = event.target as Element
  const interactive = target.closest(INTERACTIVE)
  if (interactive && root.value?.contains(interactive))
    return

  event.preventDefault()
  input.value?.focus()
}

defineExpose<InputExposed>({
  get input() {
    return input.value
  },
  focus: options => input.value?.focus(options),
})
</script>

<template>
  <div
    ref="root"
    class="sp-input sp-material"
    :class="attrs.class"
    :style="attrs.style"
    :data-size="size"
    @pointerdown="onPointerdown"
  >
    <span v-if="slots.leading" class="sp-input-leading">
      <slot name="leading" />
    </span>
    <input ref="input" v-model="model" class="sp-input-field" v-bind="fieldAttrs()">
    <span v-if="slots.trailing" class="sp-input-trailing">
      <slot name="trailing" />
    </span>
  </div>
</template>
