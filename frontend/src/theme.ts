const KEY = 'busflow-theme'

/** Початкову тему ставить inline-скрипт в index.html (без спалаху); тут — лише перемикач. */
export function initTheme(): void {
  document.addEventListener('click', (event) => {
    if (!(event.target as Element).closest('[data-theme-toggle]')) return

    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next

    try {
      localStorage.setItem(KEY, next)
    } catch {
      // сховище недоступне — тема діє лише до перезавантаження
    }
  })
}
