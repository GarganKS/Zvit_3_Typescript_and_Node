import type { Block } from 'payload'

import { anchorField } from './fields'

export const Faq: Block = {
  slug: 'faq',
  labels: { singular: 'Питання та відповіді', plural: 'Питання та відповіді' },
  fields: [
    anchorField,
    { name: 'title', type: 'text', label: 'Заголовок секції', required: true },
    {
      name: 'items',
      type: 'array',
      label: 'Питання',
      fields: [
        { name: 'question', type: 'text', label: 'Питання', required: true },
        { name: 'answer', type: 'textarea', label: 'Відповідь', required: true },
      ],
    },
  ],
}
