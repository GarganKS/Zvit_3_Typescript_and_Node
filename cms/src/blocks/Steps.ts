import type { Block } from 'payload'

import { anchorField } from './fields'

export const Steps: Block = {
  slug: 'steps',
  labels: { singular: 'Кроки', plural: 'Кроки' },
  fields: [
    anchorField,
    { name: 'title', type: 'text', label: 'Заголовок секції', required: true },
    { name: 'subtitle', type: 'text', label: 'Підзаголовок' },
    {
      name: 'items',
      type: 'array',
      label: 'Кроки (нумеруються автоматично)',
      fields: [
        { name: 'title', type: 'text', label: 'Назва', required: true },
        { name: 'text', type: 'textarea', label: 'Опис' },
      ],
    },
  ],
}
