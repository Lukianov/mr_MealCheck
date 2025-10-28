<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-show="isVisible"
        class="fixed inset-0 z-[80]"
        style="
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          background: rgba(0, 0, 0, 0.45);
          transition: opacity 0.2s ease;
        "
      />
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useOverlayManager } from '@/shared/lib/composables/useOverlayManager'
import { useBodyScrollLock } from '@/shared/lib/composables/useBodyScrollLock'

const { isVisible } = useOverlayManager()

useBodyScrollLock(isVisible)
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
