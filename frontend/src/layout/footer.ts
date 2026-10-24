import type { Settings } from '../types'

export function footer({ siteName, footer }: Settings): string {
  const year = new Date().getFullYear()

  return `
  <footer class="footer">© ${year} ${siteName}. ${footer.text}</footer>`
}
