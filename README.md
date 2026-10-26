# BusFlow

Сайт з контентом, який редагується в адмінці. Проєкт складається з двох частин:

| Папка                   | Що це          | Стек                                             |
| ----------------------- | -------------- | ------------------------------------------------ |
| [`cms/`](cms)           | Адмінка та API | Payload, PostgreSQL (Neon), Vercel + Vercel Blob |
| [`frontend/`](frontend) | Публічний сайт | Vite, TypeScript (без фреймворка)                |

Фронтенд бере контент із CMS через два публічні запити, а сторінки збирає з блоків.

```
Адмінка (Payload) ──► Neon (PostgreSQL) + Vercel Blob (зображення)
        │
        └── GET /api/common, GET /api/page?path=/ ──► Фронтенд (Vite)
```

## Структура

```
cms/
  src/
    payload.config.ts     конфіг Payload: БД, плагіни, CORS
    endpoints.ts          /api/common та /api/page
    collections/          Users, Media, Pages
    globals/Common.ts     назва сайту, меню, хедер, футер
    blocks/               Hero, Features, Roles, Showcase, Steps, Faq, Cta
  scripts/seed.ts         заповнення бази
frontend/
  src/
    main.ts               точка входу
    api.ts                запити до CMS
    render.ts             вибір блоку за типом
    blocks/               розмітка і стилі кожного блоку
    theme.ts              перемикач світлої/темної теми
```

## Вимоги

- Node.js 22 (версія вказана в `cms/package.json`)
- npm
- PostgreSQL: проєкт розрахований на [Neon](https://neon.tech)
- Для зображень на деплої: сховище Vercel Blob

## Швидкий старт

### 1. CMS

```bash
cd cms
cp .env.example .env     # заповніть змінні (див. нижче)
npm install
npm run dev              # http://localhost:3000/admin
```

Під час першого відкриття `/admin` створіть адміністратора. Щоб заповнити сайт початковим контентом:

```bash
npm run seed
```

### 2. Фронтенд

```bash
cd frontend
cp .env.example .env
npm install
npm run dev              # http://localhost:5173
```

## Змінні середовища

### CMS (`cms/.env`)

| Змінна                  | Призначення                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| `DATABASE_URL`          | Рядок підключення до Neon. Для Vercel використовуйте **pooled**-адресу (у хості є `-pooler`) |
| `DATABASE_URL_UNPOOLED` | Пряма адреса Neon (без `-pooler`). Використовується **лише локально** для dev і міграцій     |
| `PAYLOAD_SECRET`        | Довільний довгий секрет для сесій                                                            |
| `FRONTEND_URL`          | Адреса фронтенду (для CORS), напр. `http://localhost:5173`                                   |
| `CMS_URL`               | Публічна адреса CMS, напр. `http://localhost:3000`                                           |
| `BLOB_READ_WRITE_TOKEN` | Токен Vercel Blob. Локально залиште порожнім, тоді файли зберігаються в `cms/media`          |
| `BLOB_CLIENT_UPLOADS`   | Необов'язково. `true` вмикає завантаження з браузера напряму в Blob (для файлів понад ~4 МБ) |

### Фронтенд (`frontend/.env`)

| Змінна         | Призначення                                                                 |
| -------------- | --------------------------------------------------------------------------- |
| `VITE_API_URL` | Адреса CMS, напр. `http://localhost:3000` або `https://ваша-cms.vercel.app` |

## Деплой на Vercel

Створіть **два окремі проєкти** з одного репозиторію.

### CMS

1. Root Directory: `cms`.
2. Змінні середовища: `DATABASE_URL` (pooled), `PAYLOAD_SECRET`, `FRONTEND_URL` (адреса фронтенду), `CMS_URL` (адреса самої CMS), `BLOB_READ_WRITE_TOKEN`.
3. Зміна змінних діє тільки після нового деплою (**Redeploy**).

### Фронтенд

1. Root Directory: `frontend`, framework: Vite.
2. Змінна `VITE_API_URL` = адреса CMS.

### Схема бази в production

У production Payload **не оновлює схему автоматично** (на відміну від `npm run dev`). Схема має потрапити в Neon одним із способів:

- запустити `npm run dev` локально з `DATABASE_URL_UNPOOLED`, який вказує на ту саму базу Neon, або
- використати міграції:
  ```bash
  cd cms
  npm run payload migrate:create
  npm run payload migrate
  ```

Після зміни полів у блоках або колекціях повторіть один із цих кроків і задеплойте CMS.

### Зображення (Vercel Blob)

1. Vercel → **Storage** → **Create** → **Blob**.
2. Доступ має бути **Public**. З приватним сховищем завантаження не працює, а змінити доступ уже створеного сховища не можна.
3. Підключіть сховище до проєкту CMS з префіксом змінної **`BLOB`**, щоб створилася змінна `BLOB_READ_WRITE_TOKEN`.
4. Зробіть Redeploy.

Файли за замовчуванням завантажуються через сервер, а Vercel обмежує тіло запиту до ~4.5 МБ. Для більших файлів стискайте зображення або задайте `BLOB_CLIENT_UPLOADS=true`.

## API

| Запит                  | Відповідь                                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `GET /api/common`      | `siteName`, `menu`, `auth` (тексти і посилання входу/реєстрації), `footer`                           |
| `GET /api/page?path=/` | `path`, `title`, `blocks`. Кожен блок має `type` і свої поля, зображення мають вигляд `{ src, alt }` |

## Блоки сторінок

| Блок       | Призначення                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------- |
| `hero`     | Головний екран: заголовок, кнопки, пункти-переваги, бейджі на зображенні, два зображення (світла та темна тема) |
| `features` | Сітка переваг з іконками                                                                                        |
| `roles`    | Блоки для різних ролей користувачів                                                                             |
| `showcase` | Блок із зображенням і списком пунктів                                                                           |
| `steps`    | Кроки                                                                                                           |
| `faq`      | Питання та відповіді                                                                                            |
| `cta`      | Заклик до дії з кнопками                                                                                        |

Кнопки (Hero, CTA) мають вигляд (основна/додаткова) та іконку: без іконки, «Реєстрація» або «Вхід».

### Як додати новий блок

1. Створіть `cms/src/blocks/Назва.ts` зі `slug` і полями та додайте його в `blocks` колекції `Pages`.
2. Запустіть `npm run generate:types` у `cms`.
3. У `frontend/src/types.ts` додайте тип блоку.
4. Створіть `frontend/src/blocks/назва/` (розмітка і стилі) та додайте `case` у `frontend/src/render.ts`.

## Корисні команди

| Де         | Команда                       | Що робить                                       |
| ---------- | ----------------------------- | ----------------------------------------------- |
| `cms`      | `npm run dev`                 | Запуск адмінки та API                           |
| `cms`      | `npm run build` / `npm start` | Збірка та запуск production                     |
| `cms`      | `npm run seed`                | Початковий контент                              |
| `cms`      | `npm run generate:types`      | Оновити `payload-types.ts` після зміни полів    |
| `cms`      | `npm test`                    | Інтеграційні (vitest) та e2e (playwright) тести |
| `frontend` | `npm run dev`                 | Запуск Vite                                     |
| `frontend` | `npm run build`               | Перевірка типів і збірка                        |
