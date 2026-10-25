/** Спільні типи JSON, які віддає API cms. */

export interface MediaImage {
  src: string
  alt: string
}

export interface Point {
  text: string
}

export interface Button {
  text: string
  link: string
  variant: 'primary' | 'secondary'
}

export interface HeroBlock {
  type: 'hero'
  anchor?: string
  badge?: string
  title: string
  subtitle?: string
  image?: MediaImage
  buttons?: Button[]
}

export interface FeaturesBlock {
  type: 'features'
  anchor?: string
  title: string
  subtitle?: string
  items?: { icon: string; title: string; text?: string }[]
}

export interface RolesBlock {
  type: 'roles'
  anchor?: string
  title: string
  subtitle?: string
  items?: { icon?: string; title: string; text?: string; points?: Point[] }[]
}

export interface StepsBlock {
  type: 'steps'
  anchor?: string
  title: string
  subtitle?: string
  items?: { title: string; text?: string }[]
}

export interface ShowcaseBlock {
  type: 'showcase'
  anchor?: string
  title: string
  subtitle?: string
  items?: { eyebrow?: string; title: string; text?: string; points?: Point[]; image?: MediaImage }[]
}

export interface FaqBlock {
  type: 'faq'
  anchor?: string
  title: string
  items?: { question: string; answer: string }[]
}

export interface CtaBlock {
  type: 'cta'
  anchor?: string
  title: string
  text?: string
  buttons?: Button[]
}

/** Дискриміноване об'єднання: тип поля `type` визначає форму блока */
export type Block =
  | HeroBlock
  | FeaturesBlock
  | RolesBlock
  | StepsBlock
  | ShowcaseBlock
  | FaqBlock
  | CtaBlock

export interface Page {
  path: string
  title: string
  blocks: Block[]
}

export interface MenuItem {
  label: string
  link: string
}

export interface Settings {
  siteName: string
  menu: MenuItem[]
  auth: { loginText: string; loginLink: string; registerText: string; registerLink: string }
  footer: { text: string; description: string }
}
