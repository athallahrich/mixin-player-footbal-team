<script setup lang="ts">
defineProps<{
  bench: string[]
}>()
</script>

<template>
  <div v-if="bench.length > 0" class="neo-card border-4 border-neo-orange bg-neo-orange shadow-neo p-3 sm:p-4">
    <div class="flex items-center gap-2 mb-3">
      <h3 class="text-base sm:text-lg font-bold uppercase">🪑 Cadangan / Bebas Tim</h3>
      <span class="neo-badge bg-neo-black text-white">{{ bench.length }} orang</span>
    </div>

    <p class="text-xs sm:text-sm font-bold mb-3 text-black/70">
      Pemain ini tidak masuk tim manapun. Bisa bergabung ke tim yang butuh tambahan pemain.
    </p>

    <div class="flex flex-wrap gap-2">
      <div
        v-for="(player, i) in bench"
        :key="i"
        class="inline-flex items-center gap-1 px-3 py-1 text-sm font-bold border-2 border-neo-black bg-white shadow-neo-sm"
      >
        <span class="text-neo-orange font-bold">{{ i + 1 }}.</span>
        {{ player }}
      </div>
    </div>
  </div>
</template>
