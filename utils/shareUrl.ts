import type { Team } from '~/types/index'

interface SharePayload {
  teams: Team[]
  bench: string[]
  createdAt: string
}

/**
 * Encode teams data to a base64 URL-safe string
 */
export function encodeShareData(teams: Team[], bench: string[]): string {
  const payload: SharePayload = {
    teams,
    bench,
    createdAt: new Date().toISOString(),
  }
  const json = JSON.stringify(payload)
  // btoa works in browser; use encodeURIComponent to make URL-safe
  const base64 = btoa(unescape(encodeURIComponent(json)))
  return base64
}

/**
 * Decode base64 share string back to teams data
 */
export function decodeShareData(encoded: string): SharePayload | null {
  try {
    const json = decodeURIComponent(escape(atob(encoded)))
    return JSON.parse(json) as SharePayload
  } catch {
    return null
  }
}

/**
 * Build the full share URL for a given base path
 */
export function buildShareUrl(baseUrl: string, encoded: string): string {
  return `${baseUrl}/preview?d=${encoded}`
}
