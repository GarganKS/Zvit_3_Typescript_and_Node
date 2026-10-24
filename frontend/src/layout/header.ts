import { icon } from '../icons'
import type { Settings } from '../types'

export function header({ siteName, menu }: Settings): string {
  return `
  <header class="header">
    <div class="header__inner">
      <a class="header__logo" href="/">
        <span class="header__logo-badge">${icon('bus', 20)}</span>
        <span>${siteName}</span>
      </a>
      <div class="header__right">
        <nav class="header__nav">
          ${menu.map(({ label, link }) => `<a class="header__link" href="${link}">${label}</a>`).join('')}
        </nav>
        <button class="theme-toggle" type="button" aria-label="Перемкнути тему">
          <span class="icon-moon">${icon('moon', 18)}</span>
          <span class="icon-sun">${icon('sun', 18)}</span>
        </button>
        <a class="header__login" href="#">Увійти</a>
        <a class="btn btn--primary btn--sm" href="#">Реєстрація</a>
      </div>
    </div>
  </header>`
}
