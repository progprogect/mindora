import { existsSync } from 'node:fs'
import path from 'node:path'
import { config } from 'dotenv'

const cwd = process.cwd()
for (const file of [
  path.resolve(cwd, '.env.local'),
  path.resolve(cwd, '.env'),
  path.resolve(cwd, '../.env'),
]) {
  if (existsSync(file)) config({ path: file, override: false })
}
