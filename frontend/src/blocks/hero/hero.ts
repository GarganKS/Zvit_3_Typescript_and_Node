import { icon } from '../../icons'
import type { Button, HeroBlock } from '../../types'
import './hero.css'

function button({ text, link, variant = 'primary', icon: name }: Button): string {
  const glyph = name && name !== 'none' ? icon(name, 18) : ''

  return `<a class="btn btn--${variant}" href="${link}">${glyph}${text}</a>`
}

export function hero(block: HeroBlock): string {
  const { anchor, badge, title, subtitle, image, buttons = [], highlights = [], imageBadges } = block

  const badgeHtml = badge
    ? `<span class="hero__badge">${icon('bus', 16)}${badge}</span>`
    : ''

  const actions = buttons.length
    ? `<div class="hero__actions">${buttons.map(button).join('')}</div>`
    : ''

  const highlightsHtml = highlights.length
    ? `<ul class="hero__highlights">
        ${highlights
          .map(({ text }) => `<li class="hero__highlight">${icon('check-circle', 18)}${text}</li>`)
          .join('')}
      </ul>`
    : ''

  const topLeftBadge = imageBadges?.topLeft
    ? `<span class="hero__image-badge hero__image-badge--top">
        <strong>${imageBadges.topLeft.split('•')[0]?.trim() ?? imageBadges.topLeft}</strong>
        ${imageBadges.topLeft.includes('•')
          ? `<span class="hero__status"><i class="hero__status-dot"></i>${imageBadges.topLeft.split('•')[1]?.trim()}</span>`
          : ''}
      </span>`
    : ''

  const bottomRightBadge = imageBadges?.bottomRight
    ? `<span class="hero__image-badge hero__image-badge--bottom">
        ${icon('ticket', 16)}${imageBadges.bottomRight}
      </span>`
    : ''

  const picture = image
    ? `<div class="hero__media">
        <img class="hero__image" src="${image.src}" alt="${image.alt}">
        ${topLeftBadge}
        ${bottomRightBadge}
      </div>`
    : ''

  return `
  <section class="hero" id="${anchor ?? ''}">
    <div class="hero__content">
      ${badgeHtml}
      <h1 class="hero__title">${title}</h1>
      ${subtitle ? `<p class="hero__subtitle">${subtitle}</p>` : ''}
      ${actions}
      ${highlightsHtml}
    </div>
    ${picture}
  </section>
  `
}
