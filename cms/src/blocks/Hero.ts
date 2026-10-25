import type { Block } from 'payload'

import { buttonFields } from './buttonFields'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції' },
    { name: 'badge', type: 'text', label: 'Бейдж над заголовком' },
    { name: 'title', type: 'text', label: 'Заголовок', required: true },
    { name: 'subtitle', type: 'textarea', label: 'Підзаголовок' },
    {
      name: 'imageDark',
      type: 'upload',
      relationTo: 'media',
      label: 'Зображення для темної теми',
      admin: { description: 'Необов’язково. Якщо порожньо - показується звичайне зображення.' },
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Кнопки',
      maxRows: 2,
      fields: buttonFields,
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Чек-ліст під кнопками',
      maxRows: 6,
      fields: [{ name: 'text', type: 'text', label: 'Текст', required: true }],
    },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Зображення' },
    {
      name: 'imageBadges',
      type: 'group',
      label: 'Бейджі поверх зображення',
      fields: [
        { name: 'topLeft', type: 'text', label: 'Бейдж зверху зліва (напр. «BusFlow • Працює»)' },
        { name: 'bottomRight', type: 'text', label: 'Бейдж знизу справа (напр. «Безкоштовно»)' },
      ],
    },
  ],
}
