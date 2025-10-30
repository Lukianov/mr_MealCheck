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
        <p class="mb-2 font-bold text-2xl">Food analysis in progress</p>
        <p class="mb-6 text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
          It’ll show up on the main screen soon — or just close the app, and
          we’ll ping you when it’s done.
        </p>
        <UIButton
          class="w-full"
          :style="{ background: 'rgba(0, 167, 237, 1)' }"
          @click="() => setOpenedModal(null)"
        >
          Got it!
        </UIButton>
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

<style scoped></style>
