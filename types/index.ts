// Player Model
export type Player = string

// Team Model - now includes GK slot
export interface Team {
  id: string
  name: string
  gk: string | null       // Goalkeeper (1 per team)
  players: string[]       // Outfield players
  playerCount: number     // Total including GK
}

// Randomization mode
export type RandomizeMode = 'by-team-count' | 'by-players-per-team'

// Result of randomization including bench (overflow players)
export interface RandomizeResult {
  teams: Team[]
  bench: string[]         // Players who didn't fit into any team
}

// Static Data Model
export interface StaticDataConfig {
  version: string
  lastUpdated: string
  players: string[]
  goalkeepers?: string[]
}

// Validation Result Model
export interface ValidationResult {
  isValid: boolean
  errorMessage?: string
}

// Application State Model
export interface AppState {
  players: string[]
  goalkeepers: string[]
  teamCount: number
  playersPerTeam: number
  randomizeMode: RandomizeMode
  generatedTeams: Team[]
  bench: string[]
  staticPlayerData: string[]
  staticGkData: string[]
  isLoading: boolean
  error: string | null
}
