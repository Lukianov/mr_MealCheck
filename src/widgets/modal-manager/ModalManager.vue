<template>
  <Teleport to="body">
    <transition name="sheet">
      <component
        v-show="isVisible"
        class="fixed inset-x-0 bottom-0 z-[100] mx-auto px-4 pb-10"
        :is="currentModal"
      />
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { ModalNames } from '@/shared/types/modalNames'
import { useOverlayManager } from '@/shared/lib/composables/useOverlayManager'

const { openedModal, isVisible } = useOverlayManager()

const currentModal = computed(() => {
  switch (openedModal.value) {
    case ModalNames.MealAnalyzingModal:
      return defineAsyncComponent(
        () => import('@/entities/meal/ui/MealAnalyzingModal.vue'),
      )
    case ModalNames.DeleteMealModal:
      return defineAsyncComponent(
        () => import('@/entities/meal/ui/DeleteMealModal.vue'),
      )
    case ModalNames.PhotoLoaderModal:
      return defineAsyncComponent(
        () => import('@/entities/meal/ui/PhotoLoaderModal.vue'),
      )
    case ModalNames.RetakePhotoModal:
      return defineAsyncComponent(
        () => import('@/entities/meal/ui/RetakePhotoModal.vue'),
      )
    case ModalNames.WeightChangerModal:
      return defineAsyncComponent(
        () => import('@/entities/weight-changer/ui/WeightChangerModal.vue'),
      )
    case ModalNames.DeleteDishModal:
      return defineAsyncComponent(
        () => import('@/entities/meal/ui/DeleteDishModal.vue'),
      )
    case ModalNames.TextLogModal:
      return defineAsyncComponent(
        () => import('@/entities/log-meal/ui/TextLogModal.vue'),
      )
    case ModalNames.RewriteTextModal:
      return defineAsyncComponent(
        () => import('@/entities/meal/ui/RewriteTextModal.vue'),
    )
    default:
      return null
  }
})
</script>

<style scoped>
.sheet-enter-from,
.sheet-leave-to {
  transform: translateY(18px);
  opacity: 0;
}
.sheet-enter-to,
.sheet-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.sheet-enter-active,
.sheet-leave-active {
  transition: all 0.18s ease;
}
</style>
