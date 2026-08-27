import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import { loadEnv } from '../env.js'
import * as schema from './schema.js'

const env = loadEnv()

function sslFor(connectionString: string): { rejectUnauthorized: false } | undefined {
  if (/localhost|127\.0\.0\.1/i.test(connectionString)) return undefined
  if (/sslmode=disable/i.test(connectionString)) return undefined
  // Private Railway DNS typically does not speak TLS.
  if (/\.railway\.internal/i.test(connectionString)) return undefined
  if (/rlwy\.net|railway\.app|sslmode=require/i.test(connectionString)) {
    return { rejectUnauthorized: false }
  }
  if (env.NODE_ENV === 'production') return { rejectUnauthorized: false }
  return undefined
}

const poolConfig: pg.PoolConfig = { max: 10 }
if (env.DATABASE_URL) {
  poolConfig.connectionString = env.DATABASE_URL
  const ssl = sslFor(env.DATABASE_URL)
  if (ssl) poolConfig.ssl = ssl
}

export const pool = new pg.Pool(poolConfig)

export const db = drizzle(pool, { schema })
