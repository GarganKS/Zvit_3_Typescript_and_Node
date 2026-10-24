import { icon } from '../../icons'
import type { FeatureItem, FeaturesBlock } from '../../types'
import './features.css'

/** Відомі іконки малюємо SVG, інакше показуємо текст як є (напр. емодзі зі старих записів) */
function featureIcon(name: string): string {
  const svg = icon(name, 22)

  return svg || name
}

function feature({ icon: iconName, tone = 'blue', title, text }: FeatureItem): string {
  return `
      <article class="feature">
        <span class="feature__icon feature__icon--${tone}">${featureIcon(iconName)}</span>
        <h3 class="feature__title">${title}</h3>
        <p class="feature__text">${text ?? ''}</p>
      </article>`
}

export function features({ anchor, title, subtitle, items = [] }: FeaturesBlock): string {
  return `
  <section class="features" id="${anchor ?? ''}">
    <div class="section-head">
      <h2 class="section-title">${title}</h2>
      ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
    </div>
    <div class="features__grid">
      ${items.map(feature).join('')}
    </div>
  </section>
  `
}
