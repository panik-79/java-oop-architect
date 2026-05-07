import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  server: {
    host: true,
    port: 5173,
    strictPort: true
  },
  build: {
    outDir: 'dist',
  }
}))
