import { fileURLToPath } from 'node:url'
import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

describe('nuxt module', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../fixtures/nuxt', import.meta.url)),
  })

  it('server-renders auto-imported components with the default prefix', async () => {
    // Drop Vue's hydration markers (`<!--[-->`) before matching the markup.
    const html = (await $fetch<string>('/')).replace(/<!--[\s\S]*?-->/g, '')

    expect(html).toMatch(/<main class="sp-surface" data-material="thick">\s*Hello from Spatial UI\s*<\/main>/)
  })

  it('adds the stylesheet to the app', async () => {
    const html = await $fetch<string>('/')
    const hrefs = [
      ...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g),
    ].map(match => match[1]!)
    const inline = [
      ...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g),
    ].map(match => match[1]!)
    const linked = await Promise.all(hrefs.map(href => $fetch<string>(href)))

    expect([
      ...inline,
      ...linked,
    ].join('\n')).toContain('.sp-surface')
  })
})
