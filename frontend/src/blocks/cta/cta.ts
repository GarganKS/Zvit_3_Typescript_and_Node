import type { CtaBlock } from '../../types'
import { buttons } from '../../ui'
import './cta.css'

export function cta({ anchor, title, text, buttons: list }: CtaBlock): string {
  return `
  <section class="section section--tight" id="${anchor ?? ''}">
    <div class="container">
      <div class="cta__box">
        <h2 class="cta__title">${title}</h2>
        ${text ? `<p class="cta__text">${text}</p>` : ''}
        <div class="cta__actions">${buttons(list)}</div>
      </div>
    </div>
  </section>`
}
