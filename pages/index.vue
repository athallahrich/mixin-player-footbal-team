<script setup lang="ts">
import { useTeamRandomizerStore } from '~/stores/teamRandomizer'

const store = useTeamRandomizerStore()

onMounted(async () => {
  await store.loadStaticData()
})

useSeoMeta({
  title: 'Pengacak Tim Bola',
  description: 'Aplikasi untuk mengacak tim sepak bola secara adil dan cepat',
})
</script>

<template>
  <div class="min-h-screen bg-neo-bg">

    <!-- Header -->
    <header class="border-b-4 border-neo-black bg-neo-yellow px-3 py-3 shadow-neo sticky top-0 z-20">
      <div class="max-w-5xl mx-auto flex items-center justify-between">
        <div>
          <h1 class="text-lg sm:text-2xl md:text-3xl font-bold uppercase tracking-tight leading-tight">
            ⚽ Pengacak Tim Bola
          </h1>
          <p class="text-xs sm:text-sm font-bold text-black/70 hidden sm:block">
            Bagi pemain ke tim secara acak & adil
          </p>
        </div>
        <div class="neo-badge text-xs">v1.0</div>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">

      <!-- Error notification -->
      <ErrorNotification
        v-if="store.error"
        :message="store.error"
        type="error"
        @close="store.clearError()"
      />

      <!-- Input section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

        <!-- Player input -->
        <div class="md:col-span-2">
          <PlayerInput
            :players="store.players"
            :goalkeepers="store.goalkeepers"
            :static-data="store.staticPlayerData"
            @update:players="store.players = $event"
            @update:goalkeepers="store.goalkeepers = $event"
            @load-static="store.loadStaticDataIntoPlayers()"
          />
        </div>

        <!-- Controls sidebar -->
        <div class="flex flex-col gap-3">

          <!-- Mode selector (replaces old TeamCountInput) -->
          <TeamModeSelector
            :mode="store.randomizeMode"
            :team-count="store.teamCount"
            :players-per-team="store.playersPerTeam"
            :player-count="store.players.length"
            :preview-team-count="store.previewTeamCount"
            :preview-bench-count="store.previewBenchCount"
            @update:mode="store.setRandomizeMode($event)"
            @update:team-count="store.setTeamCount($event)"
            @update:players-per-team="store.setPlayersPerTeam($event)"
          />

          <!-- Summary -->
          <div class="neo-card bg-neo-bg text-sm font-bold space-y-2 p-3">
            <div class="flex justify-between items-center">
              <span>Pemain</span>
              <span class="neo-badge">{{ store.players.length }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span>Kiper</span>
              <span class="neo-badge bg-neo-green">{{ store.goalkeepers.length }}</span>
            </div>
            <div class="flex justify-between items-center border-t-2 border-neo-black pt-2">
              <span>Tim terbentuk</span>
              <span class="neo-badge bg-neo-blue text-white">{{ store.previewTeamCount }}</span>
            </div>
            <div
              v-if="store.previewBenchCount > 0"
              class="flex justify-between items-center"
            >
              <span>Cadangan</span>
              <span class="neo-badge bg-neo-orange text-white">{{ store.previewBenchCount }}</span>
            </div>
            <p
              v-if="store.goalkeepers.length > 0 && store.goalkeepers.length < store.previewTeamCount"
              class="text-neo-red text-xs border-2 border-neo-red px-2 py-1"
            >
              ⚠️ Kiper ({{ store.goalkeepers.length }}) kurang dari tim ({{ store.previewTeamCount }})
            </p>
          </div>

          <!-- Action buttons (hidden on mobile — shown in sticky bar) -->
          <div class="hidden md:flex flex-col gap-3">
            <RandomizeButton
              :disabled="!store.canRandomize"
              :is-re-randomize="store.hasGeneratedTeams"
              @randomize="store.randomizeTeams()"
            />
            <ClearButton
              v-if="store.hasPlayers || store.hasGeneratedTeams || store.goalkeepers.length > 0"
              @clear="store.clearAll()"
            />
          </div>
        </div>
      </div>

      <!-- Bench (overflow players) -->
      <BenchDisplay :bench="store.bench" />

      <!-- Team results -->
      <TeamDisplay :teams="store.generatedTeams" :show-player-count="true" />

      <!-- Empty state -->
      <div
        v-if="!store.hasGeneratedTeams && !store.hasPlayers && store.goalkeepers.length === 0"
        class="neo-card text-center py-10 sm:py-16"
      >
        <p class="text-5xl mb-3">⚽</p>
        <p class="font-bold text-base sm:text-lg">Tambahkan pemain & tentukan mode pembagian</p>
        <p class="text-sm text-gray-600 font-bold mt-1">lalu klik "Acak Tim!"</p>
      </div>

    </main>

    <!-- Sticky bottom bar (mobile only) -->
    <div
      v-if="store.hasPlayers || store.goalkeepers.length > 0"
      class="fixed bottom-0 left-0 right-0 z-20 md:hidden border-t-4 border-neo-black bg-neo-bg px-3 py-2 flex gap-2"
    >
      <RandomizeButton
        class="flex-1"
        :disabled="!store.canRandomize"
        :is-re-randomize="store.hasGeneratedTeams"
        @randomize="store.randomizeTeams()"
      />
      <ClearButton
        v-if="store.hasPlayers || store.hasGeneratedTeams || store.goalkeepers.length > 0"
        @clear="store.clearAll()"
      />
    </div>

    <div class="h-20 md:hidden" />

    <footer class="border-t-4 border-neo-black px-4 py-3 text-center">
      <p class="text-xs sm:text-sm font-bold text-black/60">Pengacak Tim Bola &mdash; Nuxt 3</p>
    </footer>
  </div>
</template>
