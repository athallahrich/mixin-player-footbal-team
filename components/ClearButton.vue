<script setup lang="ts">
const emit = defineEmits<{
  clear: []
}>()
</script>

<template>
  <button class="neo-btn-danger w-full" @click="emit('clear')">
    🗑️ Reset Semua
  </button>
</template>
