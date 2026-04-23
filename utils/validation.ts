import type { ValidationResult } from '~/types/index'

/**
 * Validates a player name.
 * Rejects empty strings and strings containing only whitespace.
 */
export function validatePlayerName(name: string): ValidationResult {
  if (!name || /^\s*$/.test(name)) {
    return {
      isValid: false,
      errorMessage: 'Nama pemain tidak boleh kosong atau hanya berisi spasi',
    }
  }
  return { isValid: true }
}

/**
 * Validates the team count against the number of available players.
 */
export function validateTeamCount(teamCount: number, playerCount: number): ValidationResult {
  if (!Number.isInteger(teamCount) || teamCount < 2) {
    return {
      isValid: false,
      errorMessage: 'Jumlah tim minimal adalah 2',
    }
  }
  if (teamCount > playerCount) {
    return {
      isValid: false,
      errorMessage: `Jumlah tim tidak boleh melebihi jumlah pemain (maksimal: ${playerCount})`,
    }
  }
  return { isValid: true }
}

/**
 * Validates that the player list has enough players to form the requested teams.
 */
export function validateCanRandomize(playerCount: number, teamCount: number): ValidationResult {
  if (playerCount === 0) {
    return {
      isValid: false,
      errorMessage: `Tambahkan minimal ${teamCount} pemain untuk membuat ${teamCount} tim`,
    }
  }
  return validateTeamCount(teamCount, playerCount)
}
