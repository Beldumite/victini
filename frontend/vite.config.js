import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0', // Important for Docker!
    port: 3000,
    watch: {
      usePolling: true // Important for Docker file watching
    }
  },
  css: {
    postcss: './postcss.config.js',
  }
})