<script setup lang="ts">
import meta from '#component-meta'

const scheme = useState<'dark' | 'light'>('scheme', () => 'dark')
const next = computed(() => scheme.value === 'dark'
  ? 'light'
  : 'dark')

// On <html>, so dialogs and tooltips rendered into <body> follow it too.
useHead({
  htmlAttrs: { class: scheme },
})

const components = Object.keys(meta).map(name => ({
  name: name.replace(/([a-z0-9])([A-Z])/g, '$1 $2'),
  to: `/components/${name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`,
}))
</script>

<template>
  <div class="layout">
    <SpSurface as="nav" class="sidebar" aria-label="Documentation">
      <NuxtLink to="/" class="brand">
        Spatial UI
      </NuxtLink>
      <p class="group">
        Guide
      </p>
      <NuxtLink to="/">
        Getting started
      </NuxtLink>
      <NuxtLink to="/theming">
        Theming
      </NuxtLink>
      <NuxtLink to="/accessibility">
        Accessibility
      </NuxtLink>
      <p class="group">
        Components
      </p>
      <NuxtLink v-for="component in components" :key="component.to" :to="component.to">
        {{ component.name }}
      </NuxtLink>
      <SpTooltip :text="`Switch to ${next} mode`" side="right">
        <SpButton square size="sm" class="scheme" :aria-label="`Switch to ${next} mode`" @click="scheme = next">
          {{ scheme === 'dark' ? '☀' : '☾' }}
        </SpButton>
      </SpTooltip>
    </SpSurface>
    <main class="content">
      <NuxtPage />
    </main>
  </div>
</template>

<style>
.layout {
  display: grid;
  grid-template-columns: 15rem minmax(0, 1fr);
  gap: 2rem;
  max-inline-size: 76rem;
  padding: 1.5rem;
  margin-inline: auto;
}

.sidebar {
  position: sticky;
  inset-block-start: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  align-self: start;
  padding: 1.25rem;
  border-radius: 1.75rem;

  a {
    padding: 0.375rem 0.75rem;
    text-decoration: none;
    border-radius: var(--sp-radius-control);

    &:hover {
      background-color: color-mix(in oklab, currentcolor 10%, transparent);
    }

    &.router-link-exact-active:not(.brand) {
      color: var(--sp-color-accent-fg);
      background-color: var(--sp-color-accent);
    }
  }

  .brand {
    margin-block-end: 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .group {
    margin-block: 1rem 0.25rem;
    padding-inline: 0.75rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--sp-color-fg-muted);
  }

  .scheme {
    margin-block-start: 1.5rem;
  }
}

.content {
  min-inline-size: 0;
  padding-block: 1rem 6rem;
}

@media (width < 48rem) {
  .layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
  }
}
</style>
