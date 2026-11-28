import { defineConfig } from 'bumpp'

// `pnpm release` bumps the version, commits, tags and pushes; the tag starts
// .github/workflows/release.yml, which publishes to npm.
export default defineConfig({
  preid: 'alpha',
  commit: 'chore: release v{version}',
  tag: 'v{version}',
  push: true,
})
