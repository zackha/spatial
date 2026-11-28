<script setup lang="ts">
import { NuxtLink } from '#components'
</script>

<template>
  <SpButton as="a" href="https://github.com/zackha/spatial">
    View on GitHub
  </SpButton>
  <SpButton :as="NuxtLink" to="/components/surface" variant="plain">
    Surface
  </SpButton>
</template>
