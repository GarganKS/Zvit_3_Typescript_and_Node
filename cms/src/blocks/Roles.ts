import type { Block } from 'payload'

import { anchorField, ICON_HINT, pointsField } from './fields'

export const Roles: Block = {
  slug: 'roles',
  labels: { singular: 'Ролі', plural: 'Ролі' },
  fields: [
    anchorField,
    { name: 'title', type: 'text', label: 'Заголовок секції', required: true },
    { name: 'subtitle', type: 'text', label: 'Підзаголовок' },
    {
      name: 'items',
      type: 'array',
      label: 'Ролі',
      fields: [
        { name: 'icon', type: 'text', label: 'Іконка', admin: { description: ICON_HINT } },
        { name: 'title', type: 'text', label: 'Назва ролі', required: true },
        { name: 'text', type: 'textarea', label: 'Опис' },
        pointsField,
      ],
    },
  ],
}
