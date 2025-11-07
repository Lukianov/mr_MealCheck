<template>
  <UIBaseModal>
    <template #default>
      <div>
        <p class="mb-1 text-2xl text-white font-bold text-center">
          {{ ru.weightChangerModal.title }}
        </p>
        <p
          class="mb-7 text-center"
          :style="{ color: 'rgba(162, 172, 176, 1)' }"
        >
          {{ ru.weightChangerModal.description }}
        </p>
        <div class="flex justify-center">
          <UIWeightStepper v-model="modalPayload as number" class="mb-7" />
        </div>
        <UIButton
          @click="handleSave"
          class="w-full"
          :style="{ background: 'rgba(0, 167, 237, 1)' }"
        >
          {{ ru.weightChangerModal.save }}
        </UIButton>
      </div>
    </template>
  </UIBaseModal>
</template>

<script setup lang="ts">
import { ru } from '@/shared/lib/i18n/ru'
import UIWeightStepper from '@/shared/ui/UIWeightStepper/UIWeightStepper.vue'
import { UIButton } from '@/shared/ui/UIButton'
import UIBaseModal from '@/shared/ui/UIBaseModal/UIBaseModal.vue'
import { useOverlayManager } from '@/shared/lib/composables/useOverlayManager'
import { sendOnboardingRequest } from '@/features/onboarding/api/sendOnboardingRequest'
import { useMainPage } from '@/pages/main-page/model'

const { modalPayload, setOpenedModal } = useOverlayManager()

const { dailyStatsCache } = useMainPage()

const handleSave = async () => {
  await sendOnboardingRequest({ weight: modalPayload.value as number })

  dailyStatsCache.value.weight = modalPayload.value as number

  setOpenedModal(null)
}
</script>

<style scoped></style>
