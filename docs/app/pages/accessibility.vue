<script setup lang="ts">
useHead({ title: 'Accessibility · Spatial UI' })
</script>

<template>
  <h1>Accessibility</h1>
  <p class="lead">
    Glass is hard on legibility. Spatial UI keeps it readable by default and steps aside when users ask for less of it.
  </p>

  <h2>User preferences</h2>
  <ul>
    <li><strong>Reduced transparency.</strong> Glass becomes an opaque fill.</li>
    <li><strong>More contrast.</strong> Glass becomes opaque and gains a visible edge.</li>
    <li><strong>Forced colors</strong> (Windows high contrast). Every surface and control keeps a visible border, and checked or selected states use system highlight colors.</li>
    <li><strong>Reduced motion.</strong> Transitions are removed.</li>
    <li><strong>No backdrop blur</strong> in the browser. Glass becomes an opaque fill.</li>
  </ul>
  <p>
    Safari does not expose its Reduce Transparency setting to CSS. Set <code>data-sp-transparency="reduce"</code> on any element, for example from a
    user preference, to make the glass inside it opaque.
  </p>

  <h2>Keyboard and screen readers</h2>
  <ul>
    <li>Components render native elements (<code>&lt;button&gt;</code>, <code>&lt;input&gt;</code>) wherever possible.</li>
    <li>Interactive widgets follow the WAI-ARIA Authoring Practices: the segmented control is a radio group, the switch a switch, the dialog a modal dialog that traps and restores focus.</li>
    <li>Focus rings show for keyboard focus only, using <code>:focus-visible</code>.</li>
  </ul>

  <h2>Your part</h2>
  <ul>
    <li>Name icon-only buttons with <code>aria-label</code>. Tooltips describe their trigger; they do not name it.</li>
    <li>Label inputs, switches and segmented controls, with <code>&lt;label&gt;</code> or <code>aria-label</code>.</li>
    <li>Give every dialog a title.</li>
    <li>Text colors meet WCAG AA over the default materials. Glass shows whatever is behind it, so check contrast over your own imagery, or use a thicker material.</li>
  </ul>
</template>
