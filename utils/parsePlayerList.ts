/**
 * Cleans a single line into a player name.
 * Returns null if the line should be skipped.
 */
function cleanLine(line: string): string | null {
  let cleaned = line.trim()
  if (!cleaned) return null

  // Remove zero-width characters
  cleaned = cleaned.replace(/[\u2060\u200B\u200C\u200D\uFEFF]/g, '')
  cleaned = cleaned.trim()
  if (!cleaned) return null

  // Skip category headers like "GK:", "PLAYER:", "KIPER:", "OUTFIELD:" etc.
  if (/^[A-Z\s\/]+:?\s*$/.test(cleaned)) return null

  // Remove leading numbering: "1.", "1)", "1 ", "22. " etc.
  cleaned = cleaned.replace(/^\d+[\.\)\-\s]+\s*/, '')

  // Remove leading bullet/dash/dot markers
  cleaned = cleaned.replace(/^[-•·*▪▸►→✓✔✅⚽]\s*/, '')

  // Remove trailing checkmarks, emojis, status indicators
  cleaned = cleaned.replace(/\s*[✅✓✔☑️⭐🔴🟢🟡⚽🏆🧤]\s*$/g, '')

  // Remove trailing parentheses like (GK), (kiper)
  cleaned = cleaned.replace(/\s*\(.*?\)\s*$/, '')

  cleaned = cleaned.trim()
  if (!cleaned) return null

  // Skip if it's just numbers/punctuation
  if (/^[\d\s\.\-\,\:\;]+$/.test(cleaned)) return null

  // Skip short all-caps (likely a header)
  if (/^[A-Z\s]{1,12}$/.test(cleaned)) return null

  return cleaned
}

/**
 * Parses a bulk player list text into separate arrays for GK and outfield players.
 *
 * Supports formats like:
 *   GK:
 *   1. Rainer
 *   2.
 *
 *   PLAYER:
 *   1. Iky
 *   2. Adam ✅
 */
export function parsePlayerListWithRoles(text: string): {
  goalkeepers: string[]
  players: string[]
} {
  const lines = text.split('\n')
  const goalkeepers: string[] = []
  const players: string[] = []

  // Detect if text has GK/PLAYER sections
  const hasGkSection = /^(GK|KIPER|GOALKEEPER|PENJAGA GAWANG)\s*:/im.test(text)
  const hasPlayerSection = /^(PLAYER|PEMAIN|OUTFIELD|FIELD)\s*:/im.test(text)

  if (hasGkSection || hasPlayerSection) {
    // Parse with sections
    let currentSection: 'gk' | 'player' | null = null

    for (const line of lines) {
      const trimmed = line.trim()

      // Detect section headers
      if (/^(GK|KIPER|GOALKEEPER|PENJAGA GAWANG)\s*:?\s*$/i.test(trimmed)) {
        currentSection = 'gk'
        continue
      }
      if (/^(PLAYER|PEMAIN|OUTFIELD|FIELD)\s*:?\s*$/i.test(trimmed)) {
        currentSection = 'player'
        continue
      }

      const name = cleanLine(line)
      if (!name) continue

      if (currentSection === 'gk') {
        goalkeepers.push(name)
      } else {
        players.push(name)
      }
    }
  } else {
    // No sections — treat all as outfield players
    for (const line of lines) {
      const name = cleanLine(line)
      if (name) players.push(name)
    }
  }

  return { goalkeepers, players }
}

/**
 * Simple parse — returns flat list of player names (no role separation).
 */
export function parsePlayerList(text: string): string[] {
  const { players } = parsePlayerListWithRoles(text)
  return players
}
