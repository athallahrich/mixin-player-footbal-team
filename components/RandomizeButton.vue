<script setup lang="ts">
defineProps<{
  disabled?: boolean
  isReRandomize?: boolean
}>()

const emit = defineEmits<{
  randomize: []
}>()
</script>

<template>
  <button
    class="neo-btn w-full text-sm sm:text-lg py-3 sm:py-4"
    :class="isReRandomize ? 'bg-neo-blue text-white' : 'bg-neo-yellow text-neo-black'"
    :disabled="disabled"
    @click="emit('randomize')"
  >
    <span v-if="isReRandomize">🔀 Acak Ulang</span>
    <span v-else>🎲 Acak Tim!</span>
  </button>
</template>
