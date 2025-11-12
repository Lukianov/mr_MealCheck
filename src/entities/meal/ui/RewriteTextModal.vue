<template>
  <UIBaseModal>
    <template #header-icon>
      <img
        class="h-16 w-[52px]"
        src="@/shared/assets/images/retake-header-icon.png"
        alt="retake-header-icon"
      />
    </template>
    <template #default>
      <div>
        <p class="mb-2 font-bold text-2xl">{{ ru.rewriteTextModal.title }}</p>
        <p class="mb-6 text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
          {{ ru.rewriteTextModal.description }}
        </p>
        <div class="flex items-center gap-3">
          <UIButton
            class="w-full"
            @click="setOpenedModal(ModalNames.TextLogModal)"
            :style="{ background: 'rgba(0, 167, 237, 1)' }"
          >
            {{ ru.rewriteTextModal.acceptButton }}
          </UIButton>
          <UIButton class="w-full" @click="() => setOpenedModal(null)">
            {{ ru.retakePhotoModal.cancel }}
          </UIButton>
        </div>
      </div>
    </template>
  </UIBaseModal>
</template>

<script setup lang="ts">
import UIBaseModal from '@/shared/ui/UIBaseModal/UIBaseModal.vue'
import { UIButton } from '@/shared/ui/UIButton'
import { useOverlayManager } from '@/shared/lib/composables/useOverlayManager'
import { ru } from '@/shared/lib/i18n/ru'
import { ModalNames } from '@/shared/types/modalNames'

const { setOpenedModal } = useOverlayManager()
</script>

<style scoped></style>
