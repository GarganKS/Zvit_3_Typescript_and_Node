import { icon } from '../../icons'
import type { RolesBlock } from '../../types'
import { checks, sectionHead } from '../../ui'
import './roles.css'

export function roles({ anchor, title, subtitle, items = [] }: RolesBlock): string {
  return `
  <section class="section section--band" id="${anchor ?? ''}">
    <div class="container">
      ${sectionHead(title, subtitle)}
      <div class="roles__grid">
        ${items
          .map(
            (item) => `
        <article class="card">
          <span class="chip">${icon(item.icon)}</span>
          <h3 class="card__title">${item.title}</h3>
          <p class="card__text">${item.text ?? ''}</p>
          ${checks(item.points)}
        </article>`,
          )
          .join('')}
      </div>
    </div>
  </section>`
}
