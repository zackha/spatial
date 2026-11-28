<template>
  <div class="field">
    <label for="email">Email</label>
    <SpInput id="email" type="email" placeholder="you@example.com" />
  </div>
  <div class="field">
    <label for="name">Name</label>
    <SpInput id="name" aria-invalid="true" aria-describedby="name-error" model-value="?" />
    <small id="name-error">Use letters only.</small>
  </div>
</template>

<style scoped>
.field {
  display: grid;
  gap: 0.375rem;
  inline-size: 16rem;
}
</style>
