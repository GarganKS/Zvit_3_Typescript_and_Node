/**
 * Заповнює CMS стартовим контентом лендингу (сторінка «/» + налаштування сайту).
 * Запуск: pnpm seed   (потрібен .env з DATABASE_URL та PAYLOAD_SECRET)
 * Увага: перезаписує блоки сторінки «/» та глобал «Налаштування сайту».
 */
try {
  process.loadEnvFile('.env')
} catch {
  // .env може бути відсутній, якщо змінні задані в середовищі
}

async function main(): Promise<void> {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')
  const { commonContent, pageContent } = await import('../src/seed/content')

  const payload = await getPayload({ config })

  await payload.updateGlobal({ slug: 'common', data: commonContent })

  const existing = await payload.find({
    collection: 'pages',
    where: { path: { equals: '/' } },
    limit: 1,
  })

  if (existing.docs[0]) {
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: pageContent as never,
    })
  } else {
    await payload.create({ collection: 'pages', data: pageContent as never })
  }

  console.log('Готово: контент лендингу оновлено.')
  process.exit(0)
}

void main()
