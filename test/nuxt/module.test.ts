import type { ConsoleMessage } from 'playwright'
import { fileURLToPath } from 'node:url'
import { $fetch, createPage, setup, url } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

describe('nuxt module', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../fixtures/nuxt', import.meta.url)),
    browser: true,
  })

  it('server-renders auto-imported components with the default prefix', async () => {
    // Drop Vue's hydration markers (`<!--[-->`) before matching the markup.
    const html = (await $fetch<string>('/')).replace(/<!--[\s\S]*?-->/g, '')

    expect(html).toMatch(/<main class="sp-surface sp-material dark" data-material="thick"/)
    expect(html).toMatch(/<span class="sp-badge sp-material" data-variant="glass">\s*New\s*<\/span>/)
    expect(html).toMatch(/<input class="sp-input-field" aria-label="Search" value="glass">/)
    expect(html).toMatch(/<button class="sp-button" data-variant="prominent" data-size="md" type="button">/)
    expect(html).toMatch(/<button[^>]+role="switch"[^>]+aria-checked="false"/)
    // Fallthrough attributes reach the root in the production build.
    expect(html).toMatch(/<div class="sp-segmented-control sp-material"[^>]*aria-label="Range"[^>]*role="radiogroup"/)
    expect(html).toMatch(/<button[^>]+role="radio"[^>]+aria-checked="true"[^>]*data-selected/)
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

  it('hydrates without mismatches and stays interactive', async () => {
    const page = await createPage()
    const problems: string[] = []
    page.on('console', (message: ConsoleMessage) => {
      if (message.type() === 'error' || message.type() === 'warning')
        problems.push(message.text())
    })
    page.on('pageerror', error => problems.push(error.message))

    await page.goto(url('/'), { waitUntil: 'hydration' })

    await page.getByRole('textbox', { name: 'Search' }).fill('spatial')
    expect(await page.getByTestId('query').textContent()).toContain('spatial')

    await page.getByRole('button', { name: 'Pressed 0 times' }).click()
    await page.getByRole('button', { name: 'Pressed 1 times' }).waitFor()

    await page.getByRole('switch', { name: 'Notifications' }).click()
    expect(await page.getByTestId('notifications').textContent()).toContain('on')

    await page.getByRole('radio', { name: 'Month' }).click()
    expect(await page.getByTestId('range').textContent()).toContain('Month')

    await page.getByRole('button', { name: 'Apply' }).click()
    const dialog = page.getByRole('dialog', { name: 'Confirm' })
    await dialog.waitFor()
    expect(await dialog.getAttribute('data-sp-scheme')).toBe('dark')
    await page.getByRole('button', { name: 'Confirm' }).click()
    await dialog.waitFor({ state: 'detached' })

    expect(problems).toEqual([])
  })
})
