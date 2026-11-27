import vue from '@vitejs/plugin-vue'
import { SpatialResolver } from 'spatial-ui/resolver'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: [],
      resolvers: [
        SpatialResolver(),
      ],
      dts: 'src/components.d.ts',
    }),
  ],
})
