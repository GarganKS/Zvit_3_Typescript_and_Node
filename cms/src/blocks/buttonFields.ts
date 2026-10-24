import type { Field } from 'payload'

/** Спільні поля кнопок для hero та CTA-банера */
export const buttonFields: Field[] = [
  { name: 'text', type: 'text', label: 'Текст', required: true },
  { name: 'link', type: 'text', label: 'Посилання', required: true },
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
  {
    name: 'icon',
    type: 'select',
    label: 'Іконка',
    defaultValue: 'none',
    options: [
      { label: 'Без іконки', value: 'none' },
      { label: 'Реєстрація (людина +)', value: 'user-plus' },
      { label: 'Вхід (стрілка)', value: 'login' },
    ],
  },
]
