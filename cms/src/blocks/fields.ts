import type { Field } from 'payload'

export const anchorField: Field = { name: 'anchor', type: 'text', label: 'ID секції' }

export const pointsField: Field = {
  name: 'points',
  type: 'array',
  label: 'Список пунктів',
  fields: [{ name: 'text', type: 'text', label: 'Пункт', required: true }],
}

export const ICON_HINT =
  'Назва іконки: bus, route, map, calendar, ticket, users, shield, dashboard, clock, refresh, smartphone, check'
