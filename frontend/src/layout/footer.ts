import type { Settings } from '../types'

export function footer({ siteName, footer }: Settings): string {
  const year = new Date().getFullYear()
  const extra = footer.text ? ` ${footer.text}` : ''

  return `
  <footer class="footer">
    <p class="footer__text">${siteName} © ${year}${extra}</p>
  </footer>`
}
