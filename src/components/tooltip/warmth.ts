import { ref } from 'vue'

/**
 * How long after a tooltip closes the next one opens without delay, so that
 * scanning a row of icon buttons does not wait on each of them. This is what
 * Reka UI's `TooltipProvider` does, shared here across every tooltip without
 * asking apps to add a provider.
 */
const SKIP_DELAY = 300

/** Whether a tooltip is open, or closed within the last `SKIP_DELAY` ms. */
export const warm = ref(false)

let cooldown: ReturnType<typeof setTimeout> | undefined

export function onTooltipOpenChange(open: boolean): void {
  clearTimeout(cooldown)
  if (open)
    warm.value = true
  else
    cooldown = setTimeout(() => warm.value = false, SKIP_DELAY)
}
