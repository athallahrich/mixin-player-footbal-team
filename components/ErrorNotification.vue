<script setup lang="ts">
const props = defineProps<{
  message: string
  type?: 'error' | 'warning'
}>()

const emit = defineEmits<{
  close: []
}>()

const visible = ref(true)
let timer: ReturnType<typeof setTimeout> | null = null

watch(() => props.message, (val) => {
  if (val) {
    visible.value = true
    resetTimer()
  }
})

onMounted(() => resetTimer())
onUnmounted(() => { if (timer) clearTimeout(timer) })

function resetTimer() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    visible.value = false
    emit('close')
  }, 5000)
}

function close() {
  visible.value = false
  if (timer) clearTimeout(timer)
  emit('close')
}
</script>

<template>
  <Transition name="slide">
    <div
      v-if="visible && message"
      :class="type === 'warning' ? 'neo-warning' : 'neo-error'"
      class="flex items-start justify-between gap-3"
      role="alert"
    >
      <span>{{ message }}</span>
      <button
        class="font-bold text-lg leading-none shrink-0 hover:opacity-70"
        @click="close"
        aria-label="Tutup notifikasi"
      >
        ✕
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
