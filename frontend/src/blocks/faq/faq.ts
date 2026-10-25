import { icon } from '../../icons'
import type { FaqBlock } from '../../types'
import { sectionHead } from '../../ui'
import './faq.css'

export function faq({ anchor, title, items = [] }: FaqBlock): string {
  return `
  <section class="section" id="${anchor ?? ''}">
    <div class="container">
      ${sectionHead(title)}
      <div class="faq__list">
        ${items
          .map(
            ({ question, answer }) => `
        <details class="faq__item">
          <summary>${question}${icon('chevron', 20)}</summary>
          <p>${answer}</p>
        </details>`,
          )
          .join('')}
      </div>
    </div>
  </section>`
}
