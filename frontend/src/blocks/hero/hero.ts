import type { HeroBlock } from '../../types'
import { buttons, media } from '../../ui'
import './hero.css'

export function hero({ anchor, badge, title, subtitle, image, buttons: list }: HeroBlock): string {
  return `
  <section class="hero" id="${anchor ?? ''}">
    <div class="container hero__grid">
      <div class="hero__content">
        ${badge ? `<span class="badge">${badge}</span>` : ''}
        <h1 class="hero__title">${title}</h1>
        ${subtitle ? `<p class="hero__subtitle">${subtitle}</p>` : ''}
        <div class="hero__actions">${buttons(list)}</div>
      </div>
      ${media(image, 'hero__media', '5 / 4')}
    </div>
  </section>`
}
