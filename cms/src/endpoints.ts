import type { Endpoint, PayloadRequest } from 'payload'

type AnyBlock = Record<string, any>

/**
 * Перетворює блок з адмінки у «плоский» JSON для фронтенду:
 * { blockType: 'hero', ... }  →  { type: 'hero', ... },
 * а медіа-зв'язок            →  { src, alt } замість повного об'єкта.
 */
function blockCleaner(block: AnyBlock) {
  const { id, blockName, blockType, image, ...rest } = block

  const clean: Record<string, any> = { type: blockType, ...rest }

  if (image && typeof image === 'object') {
    clean.image = { src: image.url, alt: image.alt }
  }

  return clean
}

/** GET /api/common — назва сайту, меню, футер */
export const commonEndpoint: Endpoint = {
  path: '/common',
  method: 'get',
  handler: async (req: PayloadRequest) => {
    const common = await req.payload.findGlobal({ slug: 'common', depth: 1 })

    return Response.json({
      siteName: common.siteName,
      menu: (common.menu ?? []).map(({ label, link }: any) => ({ label, link })),
      footer: { text: common.footer?.text ?? '' },
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
      blocks: (page.blocks ?? []).map(blockCleaner),
    })
  },
}
