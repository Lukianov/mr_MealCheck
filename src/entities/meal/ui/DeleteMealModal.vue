<template>
  <UIBaseModal>
    <template #header-icon>
      <img
        class="h-16 w-16"
        src="@/shared/assets/images/delete-meal-modal.png"
        alt="delete-meal-modal"
      />
    </template>
    <template #default>
      <div>
        <p class="mb-2 font-bold text-2xl">Remove this meal from your log?</p>
        <p class="mb-6 text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
          This action cannot be undone
        </p>
        <div class="flex items-center gap-3">
          <UIButton
            class="w-full"
            :style="{ background: 'rgba(255, 37, 80, 1)' }"
          >
            Delete
          </UIButton>
          <UIButton class="w-full" @click="() => setOpenedModal(null)">
            Cancel
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

const { setOpenedModal } = useOverlayManager()
</script>
