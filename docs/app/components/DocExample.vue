<script setup lang="ts">
import type { Component } from 'vue'

const { name } = defineProps<{
  /** The example's path under `app/examples`, e.g. `button/variants`. */
  name: string
}>()

// Each example renders live and shows its own source, so they never differ.
const examples = import.meta.glob<Component>('../examples/**/*.vue', { eager: true, import: 'default' })
const sources = import.meta.glob<string>('../examples/**/*.vue', { eager: true, query: '?raw', import: 'default' })

const path = computed(() => `../examples/${name}.vue`)
const example = computed(() => examples[path.value])
const source = computed(() => sources[path.value]?.trim())
</script>

<template>
  <figure class="example">
    <div class="stage">
      <component :is="example" />
    </div>
    <details class="source">
      <summary>Code</summary>
      <pre><code>{{ source }}</code></pre>
    </details>
  </figure>
</template>

<style>
.example {
  margin: 1.5rem 0;
}

.stage {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  min-block-size: 8rem;
  padding: 2.5rem 1.5rem;
  background:
    repeating-linear-gradient(45deg, oklch(100% 0 0 / 6%) 0 16px, transparent 16px 32px),
    linear-gradient(135deg, oklch(55% 0.15 200), oklch(50% 0.17 320));
  border-radius: 1.5rem 1.5rem 0 0;
}

.source {
  padding: 0.75rem 1.25rem;
  background-color: oklch(15% 0.02 240 / 85%);
  color: oklch(95% 0 0);
  border-radius: 0 0 1.5rem 1.5rem;

  summary {
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
  }

  pre {
    padding-block: 0.75rem 0.25rem;
  }
}
</style>
