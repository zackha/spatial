import type { Rolldown } from 'tsdown'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import browserslist from 'browserslist'
import { browserslistToTargets, bundleAsync } from 'lightningcss'

/**
 * The browsers the shipped stylesheet must work in. Newer platform features
 * are lowered or prefixed for these targets by Lightning CSS.
 */
export const BROWSERS = 'baseline widely available'

const ENTRY = fileURLToPath(new URL('../src/styles/index.css', import.meta.url))

/**
 * Bundles `src/styles/index.css` (inlining `@import ... layer()`) and emits it
 * as `style.css` next to the JavaScript output.
 *
 * Emitting it from the build, rather than writing it afterwards, means tsdown's
 * clean step, publint and attw all see it, and every imported stylesheet is
 * watched in `--watch` mode.
 *
 * The output is left unminified on purpose: consumers' bundlers minify it, and
 * readable CSS is easier to debug and override.
 */
export function stylesheet(): Rolldown.Plugin {
  const targets = browserslistToTargets(browserslist(BROWSERS))

  return {
    name: 'spatial:stylesheet',
    async buildStart() {
      const { code, warnings } = await bundleAsync({
        filename: ENTRY,
        targets,
        errorRecovery: false,
        resolver: {
          read: (file) => {
            this.addWatchFile(file)
            return readFile(file, 'utf8')
          },
        },
      })

      for (const { message, loc } of warnings)
        this.warn(`${message} (${loc.filename}:${loc.line}:${loc.column})`)

      this.emitFile({ type: 'asset', fileName: 'style.css', source: code })
    },
  }
}
