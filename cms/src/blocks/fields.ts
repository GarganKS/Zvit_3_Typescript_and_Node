import type { Field } from 'payload'

export const anchorField: Field = { name: 'anchor', type: 'text', label: 'ID секції' }

export const pointsField: Field = {
  name: 'points',
  type: 'array',
  label: 'Список пунктів',
  fields: [{ name: 'text', type: 'text', label: 'Пункт', required: true }],
}

export const buttonsField: Field = {
  name: 'buttons',
  type: 'array',
  label: 'Кнопки',
  maxRows: 2,
  fields: [
    { name: 'text', type: 'text', label: 'Текст', required: true },
    { name: 'link', type: 'text', label: 'Посилання', required: true, defaultValue: '#' },
    {
      name: 'variant',
      type: 'select',
      label: 'Вигляд',
      defaultValue: 'primary',
      options: [
        { label: 'Основна', value: 'primary' },
        { label: 'Додаткова', value: 'secondary' },
      ],
    },
  ],
}

export const ICON_HINT =
  'Назва іконки: bus, route, map, calendar, ticket, users, shield, dashboard, clock, refresh, smartphone, check'
