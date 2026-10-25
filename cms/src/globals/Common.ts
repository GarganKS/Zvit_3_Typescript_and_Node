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
      name: 'auth',
      type: 'group',
      label: 'Кнопки входу в хедері',
      fields: [
        { name: 'loginText', type: 'text', label: 'Текст «Увійти»', defaultValue: 'Увійти' },
        { name: 'loginLink', type: 'text', label: 'Посилання «Увійти»', defaultValue: '#' },
        {
          name: 'registerText',
          type: 'text',
          label: 'Текст «Реєстрація»',
          defaultValue: 'Зареєструватися',
        },
        { name: 'registerLink', type: 'text', label: 'Посилання «Реєстрація»', defaultValue: '#' },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Футтер',
      fields: [
        { name: 'description', type: 'textarea', label: 'Короткий опис під логотипом' },
        { name: 'text', type: 'text', label: 'Текст у футтері' },
      ],
    },
  ],
}
