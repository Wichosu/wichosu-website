import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { BlogEntry } from './collections/BlogEntry'
import { Category } from './collections/Category'
import { BookReview } from './collections/BookReview'
import { SITE_URL } from './lib/site'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const secret = process.env.PAYLOAD_SECRET
const databaseUrl = process.env.DATABASE_URL

if (!secret) {
  throw new Error('PAYLOAD_SECRET is not set')
}

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set')
}

/**
 * Payload only accepts cookie-authenticated requests whose `Origin` is listed in
 * `csrf`. In development the admin panel is usually reached on localhost, which
 * is not the production `SITE_URL`.
 */
const devCsrfOrigins =
  process.env.NODE_ENV === 'production' ? [] : ['http://localhost:3000', 'http://127.0.0.1:3000']

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, BlogEntry, Category, BookReview],
  editor: lexicalEditor(),
  secret,
  serverURL: SITE_URL,
  csrf: [SITE_URL, ...devCsrfOrigins],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl,
    },
  }),
  sharp,
  plugins: [],
})
