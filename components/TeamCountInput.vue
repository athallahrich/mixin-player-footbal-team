<script setup lang="ts">
import { validateTeamCount } from '~/utils/validation'

const props = defineProps<{
  modelValue: number
  playerCount: number
  minTeams?: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'validation-error': [message: string]
}>()

const min = computed(() => props.minTeams ?? 2)

const validationError = computed(() => {
  const result = validateTeamCount(props.modelValue, props.playerCount)
  return result.isValid ? '' : (result.errorMessage ?? '')
})

function handleChange(e: Event) {
  const val = parseInt((e.target as HTMLInputElement).value, 10)
  if (!isNaN(val)) {
    emit('update:modelValue', val)
    const result = validateTeamCount(val, props.playerCount)
    if (!result.isValid) emit('validation-error', result.errorMessage ?? '')
  }
}

function decrement() {
  if (props.modelValue > min.value) emit('update:modelValue', props.modelValue - 1)
}

function increment() {
  emit('update:modelValue', props.modelValue + 1)
}
</script>

<template>
  <div class="neo-card p-3 sm:p-4">
    <h2 class="text-base sm:text-xl font-bold mb-3 uppercase tracking-wide">⚽ Jumlah Tim</h2>

    <div class="flex items-center gap-2 sm:gap-3">
      <button
        class="neo-btn w-10 h-10 sm:w-12 sm:h-12 text-xl p-0 shrink-0"
        @click="decrement"
        :disabled="modelValue <= min"
        aria-label="Kurangi"
      >−</button>

      <input
        type="number"
        :value="modelValue"
        :min="min"
        class="neo-input text-center text-xl sm:text-2xl font-bold flex-1 min-w-0 py-2"
        @change="handleChange"
        aria-label="Jumlah tim"
      />

      <button
        class="neo-btn w-10 h-10 sm:w-12 sm:h-12 text-xl p-0 shrink-0"
        @click="increment"
        aria-label="Tambah"
      >+</button>
    </div>

    <p v-if="validationError" class="text-neo-red font-bold text-xs sm:text-sm mt-2 border-2 border-neo-red px-2 py-1">
      {{ validationError }}
    </p>
    <p v-else class="text-xs sm:text-sm font-bold text-gray-600 mt-2">
      {{ playerCount }} pemain → {{ modelValue }} tim
    </p>
  </div>
</template>
