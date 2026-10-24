import type { Block } from 'payload'

export const Features: Block = {
  slug: 'features',
  labels: { singular: 'Переваги', plural: 'Переваги' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції' },
    { name: 'title', type: 'text', label: 'Заголовок секції', required: true },
    {
      name: 'items',
      type: 'array',
      label: 'Наша фіча',
      fields: [
        { name: 'icon', type: 'text', label: 'Іконка', required: true },
        { name: 'title', type: 'text', label: 'Назва', required: true },
        { name: 'text', type: 'textarea', label: 'Опис' },
      ],
    },
  ],
}
