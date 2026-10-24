import { icon } from '../../icons'
import type { Button, CallToActionBlock } from '../../types'
import './cta.css'

function button({ text, link, variant = 'primary', icon: name }: Button): string {
  const glyph = name && name !== 'none' ? icon(name, 18) : ''

  return `<a class="btn btn--${variant}" href="${link}">${glyph}${text}</a>`
}

export function callToAction(block: CallToActionBlock): string {
  const { anchor, title, text, buttons = [] } = block

  return `
  <section class="cta" id="${anchor ?? ''}">
    <div class="cta__inner">
      <div class="cta__content">
        <h2 class="cta__title">${title}</h2>
        ${text ? `<p class="cta__text">${text}</p>` : ''}
      </div>
      ${buttons.length ? `<div class="cta__actions">${buttons.map(button).join('')}</div>` : ''}
    </div>
  </section>
  `
}
