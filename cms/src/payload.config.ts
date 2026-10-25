import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Common } from './globals/Common'
import { commonEndpoint, pageEndpoint } from './endpoints'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isProd = process.env.NODE_ENV === 'production'

// Neon: у dev (drizzle push) потрібне пряме підключення без `-pooler` у хості.
// На Vercel (prod) використовуємо pooled DATABASE_URL.
const databaseUrl = isProd
  ? process.env.DATABASE_URL
  : process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL не задано. Створіть cms/.env за зразком .env.example (рядок підключення Neon).',
  )
}

const frontendOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cors: frontendOrigins,
  serverURL: process.env.CMS_URL || '',
  endpoints: [commonEndpoint, pageEndpoint],
  globals: [Common],
  collections: [Users, Media, Pages],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl,
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      // Локально без токена — файли лежать поруч із проєктом, на Vercel — у Blob Storage
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      // Поле prefix завжди є в схемі, щоб локальна БД і БД на Vercel не різнилися
      alwaysInsertFields: true,
      collections: { media: true },
      // За замовчуванням файли йдуть через сервер (до ~4 МБ). Для прямого завантаження
      // з браузера (великі файли) задайте BLOB_CLIENT_UPLOADS=true у змінних середовища.
      clientUploads: process.env.BLOB_CLIENT_UPLOADS === 'true',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
