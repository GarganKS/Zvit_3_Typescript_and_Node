import type { GlobalConfig } from 'payload'

export const Common: GlobalConfig = {
  slug: 'common',
  access: { read: () => true },
  label: 'Налаштування сайту',
  fields: [
    { name: 'siteName', type: 'text', label: 'Назва сайту', required: true },
    {
      name: 'menu',
      type: 'array',
      label: 'Головне меню',
      fields: [
        { name: 'label', type: 'text', label: 'Назва пункту меню', required: true },
        { name: 'link', type: 'text', label: 'Посилання пункту меню', required: true },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Футтер',
      fields: [{ name: 'text', type: 'text', label: 'Текст у футтері' }],
    },
  ],
}
