<template>
  <UIBaseModal>
    <template #header-icon>
      <img
        class="h-16 w-[52px]"
        src="@/shared/assets/images/analyzing-process-modal.png"
        alt="analyzing-process-modal"
      />
    </template>
    <template #default>
      <div>
        <p class="mb-2 font-bold text-2xl">{{ ru.mealAnalyzingModal.title }}</p>
        <p class="mb-6 text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
          {{ ru.mealAnalyzingModal.description }}
        </p>
        <UIButton
          class="w-full"
          :style="{ background: 'rgba(0, 167, 237, 1)' }"
          @click="() => setOpenedModal(null)"
        >
          {{ ru.mealAnalyzingModal.confirm }}
        </UIButton>
      </div>
    </template>
  </UIBaseModal>
</template>

<script setup lang="ts">
import UIBaseModal from '@/shared/ui/UIBaseModal/UIBaseModal.vue'
import { UIButton } from '@/shared/ui/UIButton'
import { useOverlayManager } from '@/shared/lib/composables/useOverlayManager'
import { ru } from '@/shared/lib/i18n/ru'

const { setOpenedModal } = useOverlayManager()
</script>

<style scoped></style>
