<script setup lang="ts">
import { ref } from 'vue'

const categories = [
  'Movies',
  'Series',
  'Animation',
  'Documentary',
]
const active = ref('Movies')
const query = ref('')
const scheme = ref<'dark' | 'light'>('dark')
const autoplay = ref(true)
const quality = ref('HD')
</script>

<template>
  <div class="stage" :class="scheme">
    <SpSurface as="main" class="window">
      <header class="toolbar">
        <SpInput v-model="query" class="search" placeholder="Search movies…" aria-label="Search movies">
          <template #leading>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path fill="currentColor" d="M10 4a6 6 0 1 0 3.9 10.6l4.8 4.7 1.4-1.4-4.7-4.8A6 6 0 0 0 10 4Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
            </svg>
          </template>
        </SpInput>
        <SpSegmentedControl v-model="active" :items="categories" size="sm" aria-label="Category" />
        <span class="spacer" />
        <SpTooltip :text="`Switch to ${scheme === 'dark' ? 'light' : 'dark'} mode`" side="bottom">
          <SpButton square size="sm" :aria-label="`Switch to ${scheme === 'dark' ? 'light' : 'dark'} mode`" @click="scheme = scheme === 'dark' ? 'light' : 'dark'">
            {{ scheme === 'dark' ? '☀' : '☾' }}
          </SpButton>
        </SpTooltip>
      </header>

      <section class="hero">
        <SpBadge>Now trending</SpBadge>
        <h1>The Glass Garden</h1>
        <p>A botanist discovers a greenhouse that grows memories instead of plants.</p>
        <div class="genres">
          <SpBadge>Drama</SpBadge>
          <SpBadge>Mystery</SpBadge>
          <SpBadge variant="prominent">
            4K
          </SpBadge>
        </div>
        <div class="actions">
          <SpButton variant="prominent" size="lg">
            ▶ Watch
          </SpButton>
          <SpButton size="lg">
            Trailer
          </SpButton>
          <SpDialog title="Download The Glass Garden?" description="The film will be saved for offline viewing on this device.">
            <template #trigger>
              <SpButton size="lg">
                Download
              </SpButton>
            </template>
            <SpSegmentedControl v-model="quality" :items="['SD', 'HD', '4K']" aria-label="Quality" />
            <template #footer="{ close }">
              <SpButton variant="plain" @click="close">
                Cancel
              </SpButton>
              <SpButton variant="prominent" @click="close">
                Download
              </SpButton>
            </template>
          </SpDialog>
        </div>
        <label class="setting">
          <SpSwitch v-model="autoplay" />
          Autoplay trailers
        </label>
      </section>

      <footer class="materials">
        <SpSurface v-for="material in (['thin', 'regular', 'thick'] as const)" :key="material" :material class="swatch">
          {{ material }}
        </SpSurface>
      </footer>
    </SpSurface>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.stage {
  display: grid;
  place-items: center;
  min-height: 100dvh;
  padding: 2rem;
  box-sizing: border-box;
  background: url('/bg1.png') center / cover;
}

.window {
  display: grid;
  gap: 2rem;
  inline-size: min(60rem, 100%);
  padding: 1.5rem;
}

.toolbar {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search {
  max-inline-size: 16rem;
}

.spacer {
  flex: 1;
}

.setting {
  display: inline-flex;
  gap: 0.75rem;
  align-items: center;
}

.hero {
  display: grid;
  gap: 1rem;
  justify-items: start;
  padding: 1rem 0.5rem;
}

.hero h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 500;
}

.hero p {
  max-inline-size: 32rem;
  margin: 0;
  color: var(--sp-color-fg-muted);
}

.genres,
.actions {
  display: flex;
  gap: 0.5rem;
}

.materials {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.swatch {
  display: grid;
  place-items: center;
  block-size: 6rem;
  text-transform: capitalize;
}
</style>
