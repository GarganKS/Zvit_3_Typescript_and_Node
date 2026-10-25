import type { Block } from 'payload'

import { buttonFields } from './buttonFields'
import { anchorField } from './fields'

export const Cta: Block = {
  slug: 'cta',
  labels: { singular: 'Заклик до дії', plural: 'Заклик до дії' },
  fields: [
    anchorField,
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
