import { icon } from './icons'
import type { Button, MediaImage, Point } from './types'

/** Зображення з CMS або пунктирне місце під нього, якщо файл ще не завантажено. */
export function media(image: MediaImage | undefined, className: string, ratio = '4 / 3'): string {
  if (image?.src) return `<img class="${className} media" src="${image.src}" alt="${image.alt}" loading="lazy">`

  return `
  <div class="${className} ph" style="--ratio:${ratio}" role="img" aria-label="Місце для зображення">
    ${icon('image', 32)}<span>Місце для зображення</span>
  </div>`
}

export function sectionHead(title: string, subtitle?: string): string {
  return `
  <div class="section__head">
    <h2 class="section__title">${title}</h2>
    ${subtitle ? `<p class="section__lead">${subtitle}</p>` : ''}
  </div>`
}

export function checks(points: Point[] = []): string {
  if (!points.length) return ''
  return `<ul class="checks">${points.map(({ text }) => `<li>${text}</li>`).join('')}</ul>`
}

export function buttons(list: Button[] = []): string {
  return list.map(({ text, link, variant }) => `<a class="btn btn--${variant}" href="${link}">${text}</a>`).join('')
}
