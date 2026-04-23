<script setup lang="ts">
import type { Team } from '~/types/index'
import { encodeShareData, buildShareUrl } from '~/utils/shareUrl'

const props = defineProps<{
  teams: Team[]
  bench: string[]
}>()

const copied = ref(false)
const shareUrl = ref('')

function generateUrl() {
  const encoded = encodeShareData(props.teams, props.bench)
  const base = window.location.origin + (useRuntimeConfig().app.baseURL ?? '')
  shareUrl.value = buildShareUrl(base.replace(/\/$/, ''), encoded)
}

async function copyLink() {
  generateUrl()
  await navigator.clipboard.writeText(shareUrl.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2500)
}

function openPreview() {
  generateUrl()
  window.open(shareUrl.value, '_blank')
}

onMounted(() => {
  if (props.teams.length > 0) generateUrl()
})

watch(() => props.teams, () => {
  if (props.teams.length > 0) generateUrl()
}, { deep: true })
</script>

<template>
  <div class="neo-card border-4 border-neo-blue bg-neo-blue p-3 sm:p-4">
    <div class="flex items-center gap-2 mb-3">
      <h3 class="text-base sm:text-lg font-bold uppercase text-white">🔗 Bagikan Hasil Tim</h3>
    </div>

    <!-- URL display -->
    <div v-if="shareUrl" class="flex gap-2 mb-3">
      <input
        :value="shareUrl"
        readonly
        class="neo-input flex-1 text-xs py-2 bg-white truncate"
        @click="($event.target as HTMLInputElement).select()"
      />
    </div>

    <!-- Action buttons -->
    <div class="flex gap-2">
      <button
        class="neo-btn flex-1 text-xs sm:text-sm py-2"
        :class="copied ? 'bg-neo-green' : 'bg-neo-yellow'"
        @click="copyLink"
      >
        {{ copied ? '✅ Link Tersalin!' : '📋 Salin Link' }}
      </button>
      <button
        class="neo-btn-secondary text-xs sm:text-sm py-2 px-3"
        @click="openPreview"
      >
        👁️ Preview
      </button>
    </div>

    <p class="text-white/70 text-xs font-bold mt-2">
      Link ini bisa dibuka siapapun untuk melihat hasil tim tanpa perlu input ulang.
    </p>
  </div>
</template>
