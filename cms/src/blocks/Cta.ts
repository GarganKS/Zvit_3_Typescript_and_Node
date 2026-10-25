import type { Block } from 'payload'

import { anchorField, buttonsField } from './fields'

export const Cta: Block = {
  slug: 'cta',
  labels: { singular: 'Заклик до дії', plural: 'Заклик до дії' },
  fields: [
    anchorField,
    { name: 'title', type: 'text', label: 'Заголовок', required: true },
    { name: 'text', type: 'text', label: 'Текст' },
    buttonsField,
  ],
}
