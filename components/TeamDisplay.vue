<script setup lang="ts">
import type { Team } from '~/types/index'

defineProps<{
  teams: Team[]
  showPlayerCount?: boolean
}>()

const teamColors = [
  { bg: 'bg-neo-yellow', shirt: '#FFE500', textSvg: '#000', textClass: 'text-neo-black' },
  { bg: 'bg-neo-blue',   shirt: '#0066FF', textSvg: '#fff', textClass: 'text-white' },
  { bg: 'bg-neo-green',  shirt: '#00CC66', textSvg: '#000', textClass: 'text-neo-black' },
  { bg: 'bg-neo-pink',   shirt: '#FF3CAC', textSvg: '#fff', textClass: 'text-white' },
  { bg: 'bg-neo-orange', shirt: '#FF6B00', textSvg: '#fff', textClass: 'text-white' },
  { bg: 'bg-neo-purple', shirt: '#7B2FBE', textSvg: '#fff', textClass: 'text-white' },
  { bg: 'bg-neo-red',    shirt: '#FF3B3B', textSvg: '#fff', textClass: 'text-white' },
  { bg: 'bg-white',      shirt: '#FFFFFF', textSvg: '#000', textClass: 'text-neo-black' },
]

function getColor(i: number) {
  return teamColors[i % teamColors.length]
}

/**
 * Split outfield players into formation rows (top = attack, bottom = defense).
 * Max 3 rows for readability on mobile.
 */
function getFormationRows(players: string[]): string[][] {
  const n = players.length
  if (n === 0) return []
  if (n <= 3) return [players]
  if (n <= 6) {
    const half = Math.ceil(n / 2)
    return [players.slice(0, half), players.slice(half)]
  }
  // 3 rows
  const def = Math.floor(n / 3)
  const mid = Math.floor(n / 3)
  const fwd = n - def - mid
  return [
    players.slice(0, fwd),
    players.slice(fwd, fwd + mid),
    players.slice(fwd + mid),
  ]
}
</script>

<template>
  <div v-if="teams.length > 0">
    <h2 class="text-xl sm:text-2xl font-bold mb-4 uppercase tracking-wide">🏆 Hasil Tim</h2>

    <!-- 1 col on mobile, 2 col on lg -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <div v-for="(team, index) in teams" :key="team.id">

        <!-- Team header bar -->
        <div
          class="border-4 border-neo-black px-3 py-2 flex items-center justify-between shadow-neo"
          :class="getColor(index).bg"
        >
          <h3 class="text-base sm:text-lg font-bold uppercase" :class="getColor(index).textClass">
            {{ team.name }}
          </h3>
          <span class="neo-badge text-xs">{{ team.playerCount }} pemain</span>
        </div>

        <!-- Football pitch -->
        <div
          class="relative border-4 border-t-0 border-neo-black overflow-hidden"
          style="background: linear-gradient(180deg,#1a6b2a 0%,#1d7a30 25%,#1a6b2a 50%,#1d7a30 75%,#1a6b2a 100%);"
        >
          <!-- SVG pitch markings — responsive via viewBox -->
          <svg
            class="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 300 320"
            preserveAspectRatio="none"
          >
            <line x1="0" y1="160" x2="300" y2="160" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
            <circle cx="150" cy="160" r="38" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
            <rect x="80" y="0"   width="140" height="55" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
            <rect x="110" y="0"  width="80"  height="22" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
            <rect x="80" y="265" width="140" height="55" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
            <rect x="110" y="298" width="80" height="22" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
          </svg>

          <!-- Player layout -->
          <div class="relative z-10 flex flex-col py-3 px-1 gap-2" style="min-height: 320px;">

            <!-- Outfield rows: attack → mid → defense (top to bottom) -->
            <div class="flex flex-col flex-1 justify-around gap-1">
              <div
                v-for="(row, rowIdx) in getFormationRows(team.players)"
                :key="rowIdx"
                class="flex justify-around items-end"
              >
                <div
                  v-for="(player, pIdx) in row"
                  :key="pIdx"
                  class="flex flex-col items-center gap-0.5 min-w-0"
                  style="max-width: 64px;"
                >
                  <!-- Jersey SVG -->
                  <svg width="32" height="32" viewBox="0 0 36 36" class="shrink-0">
                    <path
                      d="M8 10 L4 16 L10 18 L10 32 L26 32 L26 18 L32 16 L28 10 L22 13 C20 8 16 8 14 13 Z"
                      :fill="getColor(index).shirt"
                      stroke="#000" stroke-width="2.5"
                    />
                    <text x="18" y="25" text-anchor="middle" font-size="9" font-weight="bold" :fill="getColor(index).textSvg">
                      {{ team.gk
                        ? getFormationRows(team.players).slice(0, rowIdx).flat().length + pIdx + 2
                        : getFormationRows(team.players).slice(0, rowIdx).flat().length + pIdx + 1
                      }}
                    </text>
                  </svg>
                  <!-- Name -->
                  <span class="text-white text-center font-bold leading-tight w-full truncate drop-shadow-[0_1px_3px_rgba(0,0,0,1)]"
                    style="font-size: clamp(9px, 2.5vw, 11px);">
                    {{ player }}
                  </span>
                </div>
              </div>
            </div>

            <!-- GK at bottom -->
            <div class="flex justify-center items-end pb-1">
              <div v-if="team.gk" class="flex flex-col items-center gap-0.5" style="max-width: 64px;">
                <div class="relative">
                  <svg width="36" height="36" viewBox="0 0 36 36" class="shrink-0">
                    <path
                      d="M8 10 L4 16 L10 18 L10 32 L26 32 L26 18 L32 16 L28 10 L22 13 C20 8 16 8 14 13 Z"
                      fill="#ADFF2F" stroke="#000" stroke-width="2.5"
                    />
                    <text x="18" y="25" text-anchor="middle" font-size="9" font-weight="bold" fill="#000">1</text>
                  </svg>
                  <span class="absolute -top-1 -right-2 bg-neo-black text-white text-xs font-bold px-0.5 leading-tight">GK</span>
                </div>
                <span class="text-white text-center font-bold leading-tight w-full truncate drop-shadow-[0_1px_3px_rgba(0,0,0,1)]"
                  style="font-size: clamp(9px, 2.5vw, 11px);">
                  {{ team.gk }}
                </span>
              </div>
              <div v-else class="opacity-30">
                <span class="text-white text-xs font-bold">— No GK —</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Player list below pitch -->
        <div class="border-4 border-t-0 border-neo-black bg-white p-2 sm:p-3 shadow-neo">
          <!-- GK -->
          <div v-if="team.gk" class="flex items-center gap-2 text-xs sm:text-sm font-bold border-b-2 border-neo-black pb-1 mb-1">
            <span class="bg-[#ADFF2F] border-2 border-neo-black text-black text-xs px-1 font-bold shrink-0">GK</span>
            <span>{{ team.gk }}</span>
          </div>
          <!-- Outfield -->
          <div
            v-for="(player, pIdx) in team.players"
            :key="pIdx"
            class="flex items-center gap-2 text-xs sm:text-sm font-bold py-0.5"
          >
            <span
              class="w-5 h-5 flex items-center justify-center border-2 border-neo-black text-xs font-bold shrink-0"
              :class="getColor(index).bg"
              :style="getColor(index).textSvg === '#fff' ? 'color:white' : ''"
            >
              {{ pIdx + (team.gk ? 2 : 1) }}
            </span>
            {{ player }}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
