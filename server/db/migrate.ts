import '../loadDotenv.js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { db, pool } from './index.js'

const here = path.dirname(fileURLToPath(import.meta.url))

export async function runMigrations() {
  const migrationsFolder = path.resolve(here, '../../drizzle')
  await migrate(db, { migrationsFolder })
}

const entry = process.argv[1] ? path.basename(process.argv[1]) : ''
if (entry.startsWith('migrate')) {
  runMigrations()
    .then(async () => {
      await pool.end()
      console.log('[db] migrations applied')
    })
    .catch(async (error: unknown) => {
      console.error('[db] migration failed', error)
      await pool.end()
      process.exit(1)
    })
}
