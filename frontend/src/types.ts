/** Спільні типи JSON, які віддає API cms. */

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
  image?: { src: string; alt: string }
  buttons?: Button[]
}

export interface FeatureItem {
  icon: string
  title: string
  text?: string
}

export interface FeaturesBlock {
  type: 'features'
  anchor?: string
  title: string
  items?: FeatureItem[]
}

/** Дискриміноване об'єднання: тип поля `type` визначає форму блока */
export type Block = HeroBlock | FeaturesBlock

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
  footer: { text: string }
}
