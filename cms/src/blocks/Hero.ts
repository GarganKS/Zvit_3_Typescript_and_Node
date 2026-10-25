import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції' },
    { name: 'badge', type: 'text', label: 'Бейдж на головній' },
    { name: 'title', type: 'text', label: 'Заголовок', required: true },
    { name: 'subtitle', type: 'text', label: 'Підзаголовок' },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Зображення' },
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
      fields: [
        { name: 'text', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Основна', value: 'primary' },
            { label: 'Додаткова', value: 'secondary' },
          ],
        },
      ],
    },
  ],
}
