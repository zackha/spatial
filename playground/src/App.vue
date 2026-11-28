<script setup lang="ts">
import type { Trailer } from './movies'
import { computed, ref } from 'vue'
import { categories, movies, trailers } from './movies'

const category = ref('Movies')
const query = ref('')

const index = ref(0)
const movie = computed(() => movies[index.value]!)

function step(by: number): void {
  index.value = (index.value + by + movies.length) % movies.length
}

const visibleTrailers = computed(() => {
  const search = query.value.trim().toLowerCase()
  return trailers.filter(trailer => trailer.title.toLowerCase().includes(search))
})

const playing = ref<Trailer>()

function image(item: { image: string, position: string }): Record<string, string> {
  return { backgroundImage: `url(${item.image})`, backgroundPosition: item.position }
}
</script>

<template>
  <div class="stage dark">
    <SpSurface as="main" class="window">
      <header class="toolbar">
        <SpInput v-model="query" class="search" placeholder="Search trailers…" aria-label="Search trailers">
          <template #leading>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path fill="currentColor" d="M10 4a6 6 0 1 0 3.9 10.6l4.8 4.7 1.4-1.4-4.7-4.8A6 6 0 0 0 10 4Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
            </svg>
          </template>
          <template v-if="query" #trailing>
            <SpButton variant="plain" size="sm" square aria-label="Clear search" @click="query = ''">
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <path fill="currentColor" d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4z" />
              </svg>
            </SpButton>
          </template>
        </SpInput>

        <div class="toolbar-end">
          <SpSegmentedControl v-model="category" :items="categories" size="sm" aria-label="Category" />
          <div class="account">
            <SpTooltip text="Notifications" side="bottom">
              <SpButton square aria-label="Notifications, 1 unread" class="notifications">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path fill="currentColor" d="M12 3a6 6 0 0 0-6 6v3.6L4.3 16A1 1 0 0 0 5.2 17.5h13.6a1 1 0 0 0 .9-1.5L18 12.6V9a6 6 0 0 0-6-6Zm-2.5 16a2.5 2.5 0 0 0 5 0z" />
                </svg>
                <span class="unread" aria-hidden="true" />
              </SpButton>
            </SpTooltip>
            <SpButton class="profile">
              <span class="avatar" aria-hidden="true">SB</span>
              Sefa Bulak
            </SpButton>
          </div>
        </div>
      </header>

      <div class="content">
        <SpSurface as="aside" material="thin" class="trailers" aria-labelledby="trailers-title">
          <div class="trailers-header">
            <h2 id="trailers-title">
              🔥 New Trailers
            </h2>
            <span class="sort">Sort: Today</span>
          </div>
          <ul class="trailer-list">
            <li v-for="trailer in visibleTrailers" :key="trailer.title" class="trailer" :style="image(trailer)">
              <div class="trailer-info sp-material" data-material="thick">
                <div>
                  <p class="trailer-title">
                    {{ trailer.title }}
                  </p>
                  <p class="trailer-tags">
                    {{ trailer.tags }}
                  </p>
                </div>
                <SpButton square size="sm" :aria-label="`Play the ${trailer.title} trailer`" @click="playing = trailer">
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                    <path fill="currentColor" d="M8 5v14l11-7z" />
                  </svg>
                </SpButton>
              </div>
            </li>
            <li v-if="!visibleTrailers.length" class="empty">
              No trailers match “{{ query }}”.
            </li>
          </ul>
        </SpSurface>

        <section class="hero" :style="image(movie)" aria-label="Featured film">
          <div class="hero-blur" aria-hidden="true" />
          <div class="hero-content">
            <SpBadge>🔥 Now Trending</SpBadge>
            <div class="hero-details">
              <div class="genres">
                <SpBadge v-for="genre in movie.genres" :key="genre">
                  {{ genre }}
                </SpBadge>
              </div>
              <h1>{{ movie.title }}</h1>
              <p>{{ movie.description }}</p>
              <SpButton variant="prominent" size="lg">
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path fill="currentColor" d="M8 5v14l11-7z" />
                </svg>
                Watch
              </SpButton>
            </div>
          </div>
          <div class="hero-nav">
            <SpTooltip text="Previous">
              <SpButton square size="lg" aria-label="Previous film" @click="step(-1)">
                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                  <path fill="currentColor" d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4-4.6-4.6z" />
                </svg>
              </SpButton>
            </SpTooltip>
            <SpTooltip text="Next">
              <SpButton square size="lg" aria-label="Next film" @click="step(1)">
                <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                  <path fill="currentColor" d="M8.6 16.6 10 18l6-6-6-6-1.4 1.4 4.6 4.6z" />
                </svg>
              </SpButton>
            </SpTooltip>
          </div>
        </section>
      </div>
    </SpSurface>

    <SpDialog
      :open="playing !== undefined"
      :title="playing?.title"
      :description="playing?.tags"
      @update:open="(open: boolean) => { if (!open) playing = undefined }"
    >
      <div v-if="playing" class="player" :style="image(playing)">
        <span>Trailer playback is not part of this demo.</span>
      </div>
      <template #footer="{ close }">
        <SpButton variant="prominent" @click="close">
          Close
        </SpButton>
      </template>
    </SpDialog>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

h1,
h2,
p {
  margin: 0;
}

.stage {
  display: grid;
  place-items: center;
  min-block-size: 100dvh;
  padding: 1.5rem;
  box-sizing: border-box;
  color: var(--sp-color-fg);
  background: url('/jungle.jpg') center / cover fixed;
}

.window {
  display: grid;
  gap: 1.5rem;
  inline-size: min(84rem, 100%);
  padding: 1.5rem;
  box-sizing: border-box;
}

/* Toolbar and content share the 1 : 3 columns of the original design. */
.toolbar,
.content {
  display: grid;
  grid-template-columns: minmax(16rem, 1fr) 3fr;
  gap: 1.5rem;
}

.toolbar-end {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  min-inline-size: 0;
}

.account {
  display: flex;
  gap: 0.75rem;
}

.notifications {
  position: relative;
}

.unread {
  position: absolute;
  inset-block-start: 0.125rem;
  inset-inline-end: 0.125rem;
  inline-size: 0.625rem;
  block-size: 0.625rem;
  background-color: oklch(78% 0.17 155);
  border-radius: 50%;
}

.profile {
  padding-inline-start: 0.375rem;
}

.avatar {
  display: grid;
  place-items: center;
  inline-size: 1.75rem;
  block-size: 1.75rem;
  font-size: 0.6875rem;
  font-weight: 600;
  background: linear-gradient(135deg, oklch(70% 0.14 200), oklch(60% 0.18 320));
  border-radius: 50%;
}

.content {
  block-size: 34rem;
}

/* New trailers */

.trailers {
  display: flex;
  flex-direction: column;
  min-block-size: 0;
  border-radius: 1.5rem;
}

.trailers-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 1rem;

  h2 {
    font-size: 1.125rem;
    font-weight: 500;
  }
}

.sort {
  font-size: 0.875rem;
  color: var(--sp-color-fg-muted);
}

.trailer-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1.5rem 1.5rem;
  margin: 0;
  overflow-y: auto;
  list-style: none;
  scrollbar-width: none;
}

.trailer {
  display: flex;
  flex-shrink: 0;
  align-items: flex-end;
  block-size: 12rem;
  overflow: hidden;
  background-size: cover;
  border-radius: 1rem;
}

.trailer-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  inline-size: 100%;
  padding: 0.75rem 1rem;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

.trailer-title {
  font-weight: 600;
}

.trailer-tags {
  font-size: 0.75rem;
  color: var(--sp-color-fg-muted);
}

.empty {
  padding-block: 2rem;
  text-align: center;
  color: var(--sp-color-fg-muted);
}

/* Featured film */

.hero {
  position: relative;
  overflow: hidden;
  background-size: cover;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px -10px oklch(0% 0 0 / 50%);
  transition: background-image 300ms;
}

/* A progressive blur: sharp at the top, blurred and dimmed under the text. */
.hero-blur {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(20px) brightness(0.6);
  mask-image: linear-gradient(to bottom, transparent 30%, black 85%);
}

.hero-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  inline-size: 60%;
  padding: 1.5rem;
}

.hero-details {
  display: grid;
  gap: 1.25rem;
  justify-items: start;

  h1 {
    font-size: 2.5rem;
    font-weight: 500;
    line-height: 1.1;
  }

  p {
    line-height: 1.5;
    color: var(--sp-color-fg-muted);
  }
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.hero-nav {
  position: absolute;
  inset-block-end: 1.5rem;
  inset-inline-end: 1.5rem;
  display: flex;
  gap: 0.75rem;
}

/* Trailer dialog */

.player {
  display: grid;
  place-items: end center;
  aspect-ratio: 16 / 9;
  padding: 1rem;
  font-size: 0.875rem;
  background-size: cover;
  border-radius: 1rem;
  box-sizing: border-box;

  span {
    padding: 0.25rem 0.75rem;
    background-color: oklch(0% 0 0 / 50%);
    border-radius: var(--sp-radius-control);
  }
}
</style>
