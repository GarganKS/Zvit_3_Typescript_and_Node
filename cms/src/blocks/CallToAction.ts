import type { Block } from 'payload'

import { buttonFields } from './buttonFields'

export const CallToAction: Block = {
  slug: 'cta',
  labels: { singular: 'Заклик до дії', plural: 'Заклики до дії' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції' },
    { name: 'title', type: 'text', label: 'Заголовок', required: true },
    { name: 'text', type: 'textarea', label: 'Текст' },
    {
      name: 'buttons',
      type: 'array',
      label: 'Кнопки',
      maxRows: 2,
      fields: buttonFields,
    },
  ],
}
