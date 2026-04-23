<script setup lang="ts">
import { parsePlayerListWithRoles } from '~/utils/parsePlayerList'

const emit = defineEmits<{
  'add-players': [payload: { players: string[]; goalkeepers: string[] }]
}>()

const bulkText = ref('')
const preview = ref<{ players: string[]; goalkeepers: string[] }>({ players: [], goalkeepers: [] })
const showPreview = ref(false)
const isOpen = ref(false)

function handleInput() {
  if (bulkText.value.trim()) {
    preview.value = parsePlayerListWithRoles(bulkText.value)
    showPreview.value = true
  } else {
    preview.value = { players: [], goalkeepers: [] }
    showPreview.value = false
  }
}

const totalDetected = computed(() => preview.value.players.length + preview.value.goalkeepers.length)

function confirmAdd() {
  if (totalDetected.value > 0) {
    emit('add-players', { ...preview.value })
    bulkText.value = ''
    preview.value = { players: [], goalkeepers: [] }
    showPreview.value = false
    isOpen.value = false
  }
}

function cancel() {
  bulkText.value = ''
  preview.value = { players: [], goalkeepers: [] }
  showPreview.value = false
  isOpen.value = false
}

const exampleText = `GK:
1. Rainer
2.
3.

PLAYER:
1. Iky
2. Adam ✅
3. Mas Dado
4. Syahrir`
</script>

<template>
  <div>
    <button class="neo-btn-secondary w-full text-xs sm:text-sm py-2" @click="isOpen = !isOpen">
      📋 {{ isOpen ? 'Tutup' : 'Input Massal (Paste List)' }}
    </button>

    <Transition name="slide-down">
      <div v-if="isOpen" class="neo-card mt-3 bg-neo-bg">
        <h3 class="font-bold text-base mb-1 uppercase">📋 Paste Daftar Pemain</h3>
        <p class="text-xs font-bold text-gray-600 mb-3">
          Paste dari WhatsApp/Notes. Gunakan <code class="bg-neo-yellow px-1">GK:</code> dan <code class="bg-neo-yellow px-1">PLAYER:</code> untuk memisahkan kiper dan pemain.
        </p>

        <textarea
          v-model="bulkText"
          class="neo-input font-mono text-sm resize-none"
          rows="10"
          :placeholder="exampleText"
          @input="handleInput"
        />

        <!-- Preview -->
        <div v-if="showPreview" class="mt-3 space-y-2">
          <!-- GK preview -->
          <div v-if="preview.goalkeepers.length > 0">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-bold text-sm uppercase">🧤 Kiper</span>
              <span class="neo-badge bg-neo-green">{{ preview.goalkeepers.length }}</span>
            </div>
            <div class="border-4 border-neo-black bg-neo-green p-2 shadow-neo-sm">
              <div
                v-for="(name, i) in preview.goalkeepers"
                :key="i"
                class="text-sm font-bold py-0.5 border-b border-black/20 last:border-0"
              >
                {{ i + 1 }}. {{ name }}
              </div>
            </div>
          </div>

          <!-- Players preview -->
          <div v-if="preview.players.length > 0">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-bold text-sm uppercase">⚽ Pemain</span>
              <span class="neo-badge">{{ preview.players.length }}</span>
            </div>
            <div class="border-4 border-neo-black bg-white p-2 max-h-40 overflow-y-auto shadow-neo-sm">
              <div
                v-for="(name, i) in preview.players"
                :key="i"
                class="text-sm font-bold py-0.5 border-b border-gray-200 last:border-0"
              >
                {{ i + 1 }}. {{ name }}
              </div>
            </div>
          </div>

          <p v-if="totalDetected === 0" class="text-neo-red font-bold text-sm border-2 border-neo-red px-2 py-1">
            Tidak ada nama yang terdeteksi. Coba format lain.
          </p>
        </div>

        <div class="flex gap-2 mt-3">
          <button class="neo-btn flex-1" :disabled="totalDetected === 0" @click="confirmAdd">
            ✅ Tambahkan {{ totalDetected > 0 ? totalDetected + ' Orang' : '' }}
          </button>
          <button class="neo-btn-secondary" @click="cancel">Batal</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.2s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
