import type { Block } from 'payload'

import { anchorField, pointsField } from './fields'

export const Showcase: Block = {
  slug: 'showcase',
  labels: { singular: 'Огляд інтерфейсу', plural: 'Огляд інтерфейсу' },
  fields: [
    anchorField,
    { name: 'title', type: 'text', label: 'Заголовок секції', required: true },
    { name: 'subtitle', type: 'text', label: 'Підзаголовок' },
    {
      name: 'items',
      type: 'array',
      label: 'Екрани (розташування чергується автоматично)',
      fields: [
        { name: 'eyebrow', type: 'text', label: 'Мітка над заголовком' },
        { name: 'title', type: 'text', label: 'Заголовок', required: true },
        { name: 'text', type: 'textarea', label: 'Опис' },
        pointsField,
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Зображення (світла тема)' },
        {
          name: 'imageDark',
          type: 'upload',
          relationTo: 'media',
          label: 'Зображення (темна тема)',
          admin: { description: 'Необов’язково. Якщо порожньо - показується звичайне зображення.' },
        },
      ],
    },
  ],
}
