import type { Page, Settings } from './types'

/** Адреса Payload CMS ( у Vercel — https://ваш-cms.vercel.app ) */
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`)

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }

  return (await res.json()) as T
}

export function getSettings(): Promise<Settings> {
  return getJson('/api/common')
}

export function getPage(path: string): Promise<Page> {
  return getJson(`/api/page?path=${encodeURIComponent(path)}`)
}
