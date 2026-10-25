import type { Endpoint, PayloadRequest } from 'payload'

import type { Media } from './payload-types'

type Json = Record<string, unknown>

function isMedia(value: unknown): value is Partial<Pick<Media, 'url' | 'alt'>> {
  return typeof value === 'object' && value !== null && 'url' in value && 'filename' in value
}

/**
 * Перетворює дані з адмінки у «плоский» JSON для фронтенду (рекурсивно):
 * { blockType: 'hero', ... } → { type: 'hero', ... },
 * медіа-зв'язок (на будь-якій глибині) → { src, alt }, службові id прибираються.
 */
function clean(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(clean)
  if (isMedia(value)) return { src: value.url ?? '', alt: value.alt ?? '' }

  if (value && typeof value === 'object') {
    const { id: _id, blockName: _blockName, blockType, ...rest } = value as Json
    const out: Json = {}
    for (const [key, item] of Object.entries(rest)) out[key] = clean(item)
    return blockType ? { type: blockType, ...out } : out
  }

  return value
}

/** GET /api/common — назва сайту, меню, футер */
export const commonEndpoint: Endpoint = {
  path: '/common',
  method: 'get',
  handler: async (req: PayloadRequest) => {
    const common = await req.payload.findGlobal({ slug: 'common', depth: 1 })

    return Response.json({
      siteName: common.siteName ?? '',
      menu: (common.menu ?? []).map(({ label, link }) => ({ label, link })),
      auth: {
        loginText: common.auth?.loginText ?? 'Увійти',
        loginLink: common.auth?.loginLink ?? '#',
        registerText: common.auth?.registerText ?? 'Зареєструватися',
        registerLink: common.auth?.registerLink ?? '#',
      },
      footer: {
        text: common.footer?.text ?? '',
        description: common.footer?.description ?? '',
      },
    })
  },
}

/** GET /api/page?path=/ — одна сторінка з блоками */
export const pageEndpoint: Endpoint = {
  path: '/page',
  method: 'get',
  handler: async (req: PayloadRequest) => {
    const path = req.query.path

    const result = await req.payload.find({
      collection: 'pages',
      where: { path: { equals: path } },
      depth: 2,
      limit: 1,
    })

    const page = result.docs[0]

    if (!page) {
      return Response.json({ error: 'Нема такої сторінки' }, { status: 404 })
    }

    return Response.json({
      path: page.path,
      title: page.title,
      blocks: (page.blocks ?? []).map(clean),
    })
  },
}
