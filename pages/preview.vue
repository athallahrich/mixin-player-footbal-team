<script setup lang="ts">
import { decodeShareData } from '~/utils/shareUrl'
import type { Team } from '~/types/index'

const route = useRoute()
const teams = ref<Team[]>([])
const bench = ref<string[]>([])
const createdAt = ref<string>('')
const isInvalid = ref(false)
const copied = ref(false)

onMounted(() => {
  const d = route.query.d as string
  if (!d) { isInvalid.value = true; return }

  const data = decodeShareData(d)
  if (!data) { isInvalid.value = true; return }

  teams.value = data.teams
  bench.value = data.bench
  createdAt.value = data.createdAt
})

const formattedDate = computed(() => {
  if (!createdAt.value) return ''
  return new Date(createdAt.value).toLocaleString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
})

async function copyUrl() {
  await navigator.clipboard.writeText(window.location.href)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

useSeoMeta({
  title: 'Preview Tim Bola',
  description: 'Hasil pengacakan tim sepak bola',
})
</script>

<template>
  <div class="min-h-screen bg-neo-bg">

    <!-- Header -->
    <header class="border-b-4 border-neo-black bg-neo-yellow px-3 py-3 shadow-neo sticky top-0 z-20">
      <div class="max-w-5xl mx-auto flex items-center justify-between gap-2">
        <div class="min-w-0">
          <h1 class="text-base sm:text-xl font-bold uppercase tracking-tight leading-tight truncate">
            🏆 Preview Hasil Tim
          </h1>
          <p v-if="formattedDate" class="text-xs font-bold text-black/60">{{ formattedDate }}</p>
        </div>
        <div class="flex gap-2 shrink-0">
          <button class="neo-btn text-xs px-3 py-2" @click="copyUrl">
            {{ copied ? '✅ Tersalin!' : '🔗 Salin URL' }}
          </button>
          <NuxtLink to="/" class="neo-btn-secondary text-xs px-3 py-2">
            ← Kembali
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4">

      <!-- Invalid state -->
      <div v-if="isInvalid" class="neo-card text-center py-12">
        <p class="text-4xl mb-3">❌</p>
        <p class="font-bold text-lg">Link tidak valid atau sudah kadaluarsa</p>
        <NuxtLink to="/" class="neo-btn mt-4 inline-flex">← Buat Tim Baru</NuxtLink>
      </div>

      <template v-else>
        <!-- Bench -->
        <BenchDisplay :bench="bench" />

        <!-- Teams -->
        <TeamDisplay :teams="teams" :show-player-count="true" />

        <!-- CTA -->
        <div class="neo-card text-center py-6 bg-neo-yellow">
          <p class="font-bold text-base mb-3">Mau acak tim sendiri?</p>
          <NuxtLink to="/" class="neo-btn inline-flex">⚽ Buat Tim Baru</NuxtLink>
        </div>
      </template>

    </main>

    <footer class="border-t-4 border-neo-black px-4 py-3 text-center">
      <p class="text-xs font-bold text-black/60">Pengacak Tim Bola &mdash; Nuxt 3</p>
    </footer>
  </div>
</template>
