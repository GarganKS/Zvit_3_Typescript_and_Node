import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'
import type { Page } from '../src/payload-types'

/** Page без службових полів — це і є те, що ми віддаємо у create/update */
type PageInput = Omit<Page, 'id' | 'updatedAt' | 'createdAt'>

/** Сільська автобусна зупинка, Wikimedia Commons, автор GT1976, ліцензія CC BY-SA 4.0 */
const HERO_IMAGE_URL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/2017-09-01_%28115%29_Bus_stop_Kreuztanne_at_St._Anton_an_der_Je%C3%9Fnitz.jpg/1280px-2017-09-01_%28115%29_Bus_stop_Kreuztanne_at_St._Anton_an_der_Je%C3%9Fnitz.jpg'

/** Шукає сторінку за адресою і оновлює її, або створює нову */
async function upsertPage(payload: Awaited<ReturnType<typeof getPayload>>, data: PageInput) {
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
  const found = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
  })
  const existing = found.docs[0]

  if (existing) {
    return existing.id
  }

  const response = await fetch(url, {
    // Wikimedia вимагає осмислений User-Agent
    headers: { 'User-Agent': 'BusFlow-seed/1.0 (landing demo)' },
  })

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
      siteName: 'BusFlow',
      menu: [],
      footer: { text: '' },
    },
  })
  console.log('Глобал common записано')

  // 2. Картинка для hero
  const heroImageId = await upsertImage(
    payload,
    HERO_IMAGE_URL,
    'bus-stop.jpg',
    'Сільська автобусна зупинка біля дороги',
  )

  // 3. Головна сторінка з блоками
  await upsertPage(payload, {
    path: '/',
    title: 'BusFlow — автобусні рейси без зайвого клопоту',
    blocks: [
      {
        blockType: 'hero',
        anchor: 'hero',
        badge: 'Система керування автобусними перевезеннями',
        title: 'Автобусні рейси без зайвого клопоту',
        subtitle:
          "BusFlow з'єднує клієнта і перевізника: замовлення автобуса для групи чи подій, планування маршрутів і рейсів, продаж квитків та контроль статусів - усе в одному вікні.",
        buttons: [
          { text: 'Зареєструватися', link: '#', variant: 'primary', icon: 'user-plus' },
          { text: 'Увійти', link: '#', variant: 'secondary', icon: 'login' },
        ],
        highlights: [
          { text: 'Реальна траса маршруту на карті' },
          { text: 'Статуси оновлюються автоматично' },
          { text: 'Квитки за місткістю автобуса' },
        ],
        image: heroImageId,
        imageBadges: { topLeft: 'BusFlow • Працює', bottomRight: 'Безкоштовно' },
      },
      {
        blockType: 'steps',
        anchor: 'steps',
        title: 'Як це працює',
        subtitle: 'Чотири кроки від заявки до поїздки.',
        items: [
          {
            title: 'Клієнт залишає заявку',
            text: 'Обирає напрям, дату та кількість пасажирів - це займає кілька хвилин.',
          },
          {
            title: 'Менеджер планує рейс',
            text: 'Підбирає вільний автобус і повідомляє ціну поїздки.',
          },
          {
            title: 'Клієнт підтверджує',
            text: 'Погоджує умови або відмовляється - усе прозоро та під контролем.',
          },
          {
            title: 'Автобус вирушає',
            text: 'Статуси оновлюються самі, а квитки стають доступними до продажу.',
          },
        ],
      },
      {
        blockType: 'features',
        anchor: 'features',
        title: 'Можливості системи',
        subtitle: 'Усе, що потрібно перевізнику та його клієнтам.',
        items: [
          {
            icon: 'map',
            tone: 'blue',
            title: 'Маршрути на карті',
            text: 'Реальна траса по вулицях (OSRM) та зупинки з координатами - жодних умовних ліній.',
          },
          {
            icon: 'calendar',
            tone: 'yellow',
            title: 'Планування рейсів',
            text: 'Реєстр автобусів, розклад та автоматична перевірка завантаженості транспорту.',
          },
          {
            icon: 'ticket',
            tone: 'green',
            title: 'Квитки за місткістю',
            text: 'Для кожного рейсу створюється стільки квитків, скільки місць в автобусі.',
          },
          {
            icon: 'clipboard',
            tone: 'blue',
            title: 'Замовлення з підтвердженням',
            text: 'Прозорий цикл: заявка, пропозиція менеджера та згода клієнта.',
          },
          {
            icon: 'refresh',
            tone: 'yellow',
            title: 'Живі статуси',
            text: 'Рейси самі переходять із «Заплановано» у «В дорозі» та «Завершено» за розкладом.',
          },
          {
            icon: 'users',
            tone: 'green',
            title: 'Дві ролі й теми',
            text: 'Кабінет клієнта й менеджера, світла та темна тема - на будь-який смак.',
          },
        ],
      },
      {
        blockType: 'cta',
        anchor: 'cta',
        title: 'Готові почати?',
        text: 'Створіть акаунт клієнта за хвилину та надішліть першу заявку на автобус.',
        buttons: [
          { text: 'Зареєструватися', link: '#', variant: 'primary', icon: 'user-plus' },
          { text: 'Увійти', link: '#', variant: 'secondary', icon: 'login' },
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
