import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

const apiTarget = process.env.LMS_API_PROXY || 'http://localhost:3001'

const apiProxy = {
  '/api': { target: apiTarget, changeOrigin: true },
  '/stripe': { target: apiTarget, changeOrigin: true },
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: 5175,
    proxy: apiProxy,
  },
  preview: {
    port: 5175,
    proxy: apiProxy,
  },
  build: {
    assetsDir: 'lms-assets',
  },
})
