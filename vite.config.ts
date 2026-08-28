import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

const root = import.meta.dirname
const githubSrc = path.resolve(root, './src')
const lmsSrc = path.resolve(root, './authorisation/src')

function isLmsImporter(importer: string | undefined) {
  if (!importer) return false
  return importer.replaceAll('\\', '/').includes('/authorisation/src/')
}

function atAliasByImporter(): Plugin {
  return {
    name: 'at-alias-by-importer',
    enforce: 'pre',
    resolveId(id, importer) {
      if (!id.startsWith('@/')) return null
      const rest = id.slice(2)
      const base = isLmsImporter(importer) ? lmsSrc : githubSrc
      return this.resolve(path.resolve(base, rest), importer, { skipSelf: true })
    },
  }
}

export default defineConfig({
  plugins: [atAliasByImporter(), react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },
  server: {
    port: 5173,
    fs: {
      allow: [root, lmsSrc],
    },
    proxy: {
      '/api': { target: 'http://localhost:3000', changeOrigin: true },
      '/stripe': { target: 'http://localhost:3000', changeOrigin: true },
    },
  },
})
