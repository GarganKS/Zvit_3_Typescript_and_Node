import type { StepsBlock } from '../../types'
import './steps.css'

export function steps({ anchor, title, subtitle, items = [] }: StepsBlock): string {
  return `
  <section class="steps" id="${anchor ?? ''}">
    <div class="section-head">
      <h2 class="section-title">${title}</h2>
      ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
    </div>
    <ol class="steps__list">
      ${items
        .map(
          ({ title: itemTitle, text }, index) => `
      <li class="step">
        <span class="step__number">${index + 1}</span>
        <h3 class="step__title">${itemTitle}</h3>
        <p class="step__text">${text ?? ''}</p>
      </li>`,
        )
        .join('')}
    </ol>
  </section>
  `
}
