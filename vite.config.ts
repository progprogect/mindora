import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createReadStream, cpSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

const root = import.meta.dirname
const githubSrc = path.resolve(root, './src')
const lmsSrc = path.resolve(root, './authorisation/src')
const lmsPublic = path.resolve(root, './authorisation/public')

const LMS_PUBLIC_MIME: Record<string, string> = {
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
}

function copyMissing(fromDir: string, toDir: string) {
  mkdirSync(toDir, { recursive: true })
  for (const name of readdirSync(fromDir)) {
    const from = path.join(fromDir, name)
    const to = path.join(toDir, name)
    if (statSync(from).isDirectory()) copyMissing(from, to)
    else if (!existsSync(to)) cpSync(from, to)
  }
}

/** Serve LMS `authorisation/public` (planner covers, OTO art) from the github SPA. */
function lmsPublicAssets(): Plugin {
  return {
    name: 'lms-public-assets',
    configureServer(server) {
      const githubPublic = path.resolve(root, './public')
      server.middlewares.use((req, res, next) => {
        const raw = (req.url ?? '').split('?')[0]
        let decoded = raw
        try {
          decoded = decodeURIComponent(raw)
        } catch {
          next()
          return
        }
        if (!decoded.startsWith('/') || decoded.includes('..')) {
          next()
          return
        }
        const marketingFile = path.normalize(path.join(githubPublic, decoded))
        if (
          marketingFile.startsWith(githubPublic + path.sep) &&
          existsSync(marketingFile) &&
          statSync(marketingFile).isFile()
        ) {
          next()
          return
        }
        const file = path.normalize(path.join(lmsPublic, decoded))
        if (file !== lmsPublic && !file.startsWith(lmsPublic + path.sep)) {
          next()
          return
        }
        if (!existsSync(file) || !statSync(file).isFile()) {
          next()
          return
        }
        const type = LMS_PUBLIC_MIME[path.extname(file).toLowerCase()] || 'application/octet-stream'
        res.setHeader('Content-Type', type)
        createReadStream(file).pipe(res)
      })
    },
    writeBundle(options) {
      if (!existsSync(lmsPublic)) return
      copyMissing(lmsPublic, options.dir ?? path.resolve(root, 'dist'))
    },
  }
}

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
  plugins: [atAliasByImporter(), lmsPublicAssets(), react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },
  server: {
    port: 5173,
    fs: {
      allow: [root, lmsSrc, lmsPublic],
    },
    proxy: {
      '/api': { target: 'http://localhost:3000', changeOrigin: true },
      '/stripe': { target: 'http://localhost:3000', changeOrigin: true },
    },
  },
})
