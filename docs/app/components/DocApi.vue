<script setup lang="ts">
import meta from '#component-meta'

const { name } = defineProps<{
  /** The component's export name, e.g. `Button`. */
  name: string
}>()

const api = computed(() => meta[name])

/** `update:modelValue` is what `v-model` binds; say so. */
function eventName(event: string): string {
  return event.startsWith('update:')
    ? `${event} (v-model${event === 'update:modelValue'
      ? ''
      : `:${event.slice(7)}`})`
    : event
}
</script>

<template>
  <section v-if="api" class="api">
    <h2>API</h2>
    <template v-if="api.props.length">
      <h3>Props</h3>
      <table class="docs-table">
        <thead>
          <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr v-for="prop in api.props" :key="prop.name">
            <td><code>{{ prop.name }}</code></td>
            <td><code>{{ prop.type }}</code></td>
            <td><code v-if="prop.default">{{ prop.default }}</code></td>
            <td>{{ prop.description }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-if="api.slots.length">
      <h3>Slots</h3>
      <table class="docs-table">
        <thead>
          <tr><th>Slot</th><th>Props</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr v-for="slot in api.slots" :key="slot.name">
            <td><code>{{ slot.name }}</code></td>
            <td><code v-if="slot.type !== 'any' && slot.type !== '{}'">{{ slot.type }}</code></td>
            <td>{{ slot.description }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-if="api.events.length">
      <h3>Events</h3>
      <table class="docs-table">
        <thead>
          <tr><th>Event</th><th>Payload</th></tr>
        </thead>
        <tbody>
          <tr v-for="event in api.events" :key="event.name">
            <td><code>{{ eventName(event.name) }}</code></td>
            <td><code>{{ event.type }}</code></td>
          </tr>
        </tbody>
      </table>
    </template>
  </section>
</template>
