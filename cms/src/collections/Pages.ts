import type { CollectionConfig } from 'payload'

import { Cta } from '../blocks/Cta'
import { Faq } from '../blocks/Faq'
import { Features } from '../blocks/Features'
import { Hero } from '../blocks/Hero'
import { Roles } from '../blocks/Roles'
import { Showcase } from '../blocks/Showcase'
import { Steps } from '../blocks/Steps'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { plural: 'Сторінки', singular: 'Сторінка' },
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    {
      name: 'path',
      type: 'text',
      label: 'Адреса сторінки',
      required: true,
      unique: true,
      defaultValue: '/',
    },
    { name: 'title', type: 'text', label: 'Назва сторінки', required: true },
    { name: 'blocks', type: 'blocks', label: 'Блоки', blocks: [Hero, Features, Roles, Steps, Showcase, Faq, Cta] },
  ],
}
