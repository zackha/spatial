import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const output = new URL('../../dist/index.mjs', import.meta.url)

/**
 * Checks on the published JavaScript. They need `pnpm build` first (CI builds
 * before running unit tests) and are skipped without it.
 */
describe.skipIf(!existsSync(output))('build output', () => {
  it('drops template comments, which would turn component roots into fragments', () => {
    const code = readFileSync(output, 'utf8')
    // `v-if` placeholders are the only comment vnodes the compiler may emit.
    const comments = [
      ...code.matchAll(/createCommentVNode\("([^"]*)"/g),
    ].map(match => match[1])

    expect(comments.filter(text => text !== 'v-if')).toEqual([])
  })
})
