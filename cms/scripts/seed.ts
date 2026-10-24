import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'

const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1690983322622-765f664952e8?q=80&w=1171&auto=format&fit=crop'

/** Шукає сторінку за адресою і оновлює її, або створює нову */
async function upsertPage(payload: Awaited<ReturnType<typeof getPayload>>, data: Record<string, any>) {
  const existing = await payload.find({
    collection: 'pages',
    where: { path: { equals: data.path } },
    limit: 1,
  })

  const doc = existing.docs[0]

  if (doc) {
    await payload.update({ collection: 'pages', id: doc.id, data })
    console.log(`Сторінку ${data.path} оновлено`)
    return
  }

  await payload.create({ collection: 'pages', data })
  console.log(`Сторінку ${data.path} створено`)
}

/** Завантажує картинку з інтернету в медіатеку ( ідемпотентно за іменем файлу ) */
async function upsertImage(
  payload: Awaited<ReturnType<typeof getPayload>>,
  url: string,
  filename: string,
  alt: string,
) {
  const found = await payload.find({ collection: 'media', where: { filename: { equals: filename } } })
  const existing = found.docs[0]

  if (existing) {
    return existing.id
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Не вдалося завантажити картинку: HTTP ${response.status}`)
  }

  const data = Buffer.from(await response.arrayBuffer())
  const mime = response.headers.get('content-type') || 'image/jpeg'

  const created = await payload.create({
    collection: 'media',
    file: { data, mimetype: mime, name: filename, size: data.byteLength },
    data: { alt },
  })

  console.log(`Картинку ${filename} завантажено`)
  return created.id
}

async function main() {
  const payload = await getPayload({ config })

  // 1. Налаштування сайту ( глобал common )
  await payload.updateGlobal({
    slug: 'common',
    data: {
      siteName: 'Зерно — обсмажувальня кави у Львові',
      menu: [
        { label: 'Особливості', link: '#features' },
        { label: 'Контакти', link: '#contacts' },
      ],
      footer: {
        text: '«Зерно» — це львівська обсмажувальня, яка дбайливо обсмажує каву для тих, хто цінує справжній смак.',
      },
    },
  })
  console.log('Глобал common записано')

  // 2. Картинка для hero
  const heroImageId = await upsertImage(payload, HERO_IMAGE_URL, 'hero-beans.jpg', 'Мішки з кавовими зернами у обсмажувальному цеху')

  // 3. Головна сторінка з блоками
  await upsertPage(payload, {
    path: '/',
    title: 'Головна',
    blocks: [
      {
        blockType: 'hero',
        anchor: 'hero',
        badge: 'Свіжообсмажена кава',
        title: 'Кава «Зерно» — смак Львова у кожній чашці',
        subtitle:
          'Обсмажуємо зерна дрібними партіями просто у Львові. Даруємо каві характер, а вам — справжню насолоду.',
        image: heroImageId,
        buttons: [
          { text: "Зв'язатися з нами", link: '#contacts', variant: 'primary' },
          { text: 'Дізнатися більше', link: '#features', variant: 'secondary' },
        ],
      },
      {
        blockType: 'features',
        anchor: 'features',
        title: 'Чому обирають нас',
        items: [
          {
            icon: '🔥',
            title: 'Ручна обсмажка',
            text: 'Кожна партія обсмажується вручну з контролем температури та часу для розкриття смаку.',
          },
          {
            icon: '🌱',
            title: 'Відбірні зерна',
            text: 'Працюємо тільки з перевіреними постачальниками зерна з Латинської Америки та Африки.',
          },
          {
            icon: '🚚',
            title: 'Свіжа доставка',
            text: 'Відправляємо каву протягом 24 годин після обсмажки по всьому Львову.',
          },
        ],
      },
    ],
  })
}

main()
  .then(() => {
    console.log('Готово')
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
