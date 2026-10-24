import './styles/base.css'
import { getPage, getSettings } from './api'
import { footer } from './layout/footer'
import { header } from './layout/header'
import { renderBlocks } from './render'

const app = document.getElementById('app')

/** Світла чи темна тема; зберігаємо вибір користувача в localStorage */
type Theme = 'light' | 'dark'

const THEME_KEY = 'busflow-theme'

function initialTheme(): Theme {
  const saved = localStorage.getItem(THEME_KEY)

  if (saved === 'light' || saved === 'dark') return saved

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
}

/** Ставить тему до рендеру, щоб не було «миготіння» світлої теми */
applyTheme(initialTheme())

function bindThemeToggle(): void {
  const toggle = document.querySelector<HTMLButtonElement>('.theme-toggle')

  if (!toggle) return

  toggle.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
    const next: Theme = current === 'dark' ? 'light' : 'dark'

    applyTheme(next)
    localStorage.setItem(THEME_KEY, next)
  })
}

function showError(message: string): void {
  if (app) app.textContent = `Something went wrong: ${message}`
}

async function start(): Promise<void> {
  try {
    const [settings, page] = await Promise.all([getSettings(), getPage(location.pathname)])

    document.title = `${page.title} - ${settings.siteName}`

    if (app) {
      app.innerHTML = `
        ${header(settings)}
        <main>${renderBlocks(page.blocks)}</main>
        ${footer(settings)}`

      bindThemeToggle()
    }
  } catch (error) {
    showError(error instanceof Error ? error.message : String(error))
  }
}

void start()
