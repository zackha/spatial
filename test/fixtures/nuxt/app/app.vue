<script setup lang="ts">
const query = ref('glass')
const presses = ref(0)
const notifications = ref(false)
const range = ref('Week')
</script>

<template>
  <SpSurface as="main" material="thick" class="dark">
    <h1>Hello from Spatial UI</h1>
    <SpBadge>New</SpBadge>
    <SpInput v-model="query" aria-label="Search">
      <template #leading>
        <span aria-hidden="true">⌕</span>
      </template>
    </SpInput>
    <p data-testid="query">
      {{ query }}
    </p>
    <SpButton variant="prominent" @click="presses++">
      Pressed {{ presses }} times
    </SpButton>
    <SpSwitch v-model="notifications" aria-label="Notifications" />
    <p data-testid="notifications">
      {{ notifications ? 'on' : 'off' }}
    </p>
    <SpSegmentedControl v-model="range" :items="['Day', 'Week', 'Month']" aria-label="Range" />
    <p data-testid="range">
      {{ range }}
    </p>
    <SpTooltip text="More options">
      <SpButton square aria-label="More">
        …
      </SpButton>
    </SpTooltip>
    <SpDialog title="Confirm" description="Apply the changes?">
      <template #trigger>
        <SpButton>Apply</SpButton>
      </template>
      <template #footer="{ close }">
        <SpButton variant="prominent" @click="close">
          Confirm
        </SpButton>
      </template>
    </SpDialog>
  </SpSurface>
</template>
