import type { Block } from 'payload'

export const Features: Block = {
  slug: 'features',
  labels: { singular: 'Переваги', plural: 'Переваги' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції' },
    { name: 'title', type: 'text', label: 'Заголовок секції', required: true },
    { name: 'subtitle', type: 'text', label: 'Підзаголовок секції' },
    {
      name: 'items',
      type: 'array',
      label: 'Наша фіча',
      fields: [
        {
          // Text, а не select: щоб у наявній БД не ламалася конвертація колонки,
          // а старі значення (емодзі) показувалися як є
          name: 'icon',
          type: 'text',
          label: 'Іконка ( map | calendar | ticket | clipboard | refresh | users | емодзі )',
          required: true,
          defaultValue: 'ticket',
        },
        {
          name: 'tone',
          type: 'select',
          label: 'Колір іконки',
          defaultValue: 'blue',
          options: [
            { label: 'Синій', value: 'blue' },
            { label: 'Жовтий', value: 'yellow' },
            { label: 'Зелений', value: 'green' },
          ],
        },
        { name: 'title', type: 'text', label: 'Назва', required: true },
        { name: 'text', type: 'textarea', label: 'Опис' },
      ],
    },
  ],
}
