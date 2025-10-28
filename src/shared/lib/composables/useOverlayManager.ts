import { ref, computed } from 'vue'

const openCount = ref(0)

export function useOverlayManager() {
  const isVisible = computed(() => openCount.value > 0)

  function acquire() {
    openCount.value += 1

    let released = false

    return () => {
      if (released) {
        return
      }

      released = true

      openCount.value = Math.max(0, openCount.value - 1)
    }
  }

  return { isVisible, acquire }
}
