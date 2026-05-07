import { defineConfig } from 'vite'

export default defineConfig({
  // Set base to './' so it works on any subdirectory (like GitHub Pages)
  base: './',
  build: {
    outDir: 'dist',
  }
})
