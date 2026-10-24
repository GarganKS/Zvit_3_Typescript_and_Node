/** Спільні типи JSON, які віддає API cms. */

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonIcon = 'none' | 'user-plus' | 'login'
export type FeatureTone = 'blue' | 'yellow' | 'green'

export interface Button {
  text: string
  link: string
  variant?: ButtonVariant
  icon?: ButtonIcon
}

export interface HeroBlock {
  type: 'hero'
  anchor?: string
  badge?: string
  title: string
  subtitle?: string
  buttons?: Button[]
  highlights?: { text: string }[]
  image?: { src: string; alt: string }
  imageBadges?: { topLeft?: string; bottomRight?: string }
}

export interface StepItem {
  title: string
  text?: string
}

export interface StepsBlock {
  type: 'steps'
  anchor?: string
  title: string
  subtitle?: string
  items?: StepItem[]
}

export interface FeatureItem {
  icon: string
  tone?: FeatureTone
  title: string
  text?: string
}

export interface FeaturesBlock {
  type: 'features'
  anchor?: string
  title: string
  subtitle?: string
  items?: FeatureItem[]
}

export interface CallToActionBlock {
  type: 'cta'
  anchor?: string
  title: string
  text?: string
  buttons?: Button[]
}

/** Дискриміноване об'єднання: тип поля `type` визначає форму блока */
export type Block = HeroBlock | StepsBlock | FeaturesBlock | CallToActionBlock

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
