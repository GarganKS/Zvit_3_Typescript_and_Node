import type { HeroBlock } from '../../types'
import './hero.css'

export function hero({ anchor, badge, title, subtitle, image, buttons = [] }: HeroBlock): string {
  const picture = image
    ? `<img class="hero__image" src="${image.src}" alt="${image.alt}">`
    : ''

  return `
  <section class="hero" id="${anchor ?? ''}">
    <div class="hero__content">
      <span class="hero__badge">${badge ?? ''}</span>
      <h1 class="hero__title">${title}</h1>
      <p class="hero__subtitle">${subtitle ?? ''}</p>
      <div class="hero__actions">
        ${buttons
          .map(
            ({ text, link, variant }) => `
        <a class="btn btn--${variant}" href="${link}">${text}</a>`,
          )
          .join('')}
      </div>
    </div>
    ${picture}
  </section>
  `
}
