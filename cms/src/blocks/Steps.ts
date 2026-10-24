import type { Block } from 'payload'

export const Steps: Block = {
  slug: 'steps',
  labels: { singular: 'Кроки', plural: 'Кроки' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції' },
    { name: 'title', type: 'text', label: 'Заголовок секції', required: true },
    { name: 'subtitle', type: 'text', label: 'Підзаголовок секції' },
    {
      name: 'items',
      type: 'array',
      label: 'Кроки',
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: 'title', type: 'text', label: 'Назва кроку', required: true },
        { name: 'text', type: 'textarea', label: 'Опис кроку' },
      ],
    },
  ],
}
