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
        <p class="mb-2 font-bold text-2xl">{{ ru.retakePhotoModal.title }}</p>
        <p class="mb-6 text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
          {{ ru.retakePhotoModal.description }}
        </p>
        <div class="flex items-center gap-3">
          <UIButton
            class="w-full"
            @click="openCamera"
            :style="{ background: 'rgba(0, 167, 237, 1)' }"
          >
            {{ ru.retakePhotoModal.acceptButton }}
          </UIButton>
          <UIButton class="w-full" @click="() => setOpenedModal(null)">
            {{ ru.retakePhotoModal.cancel }}
          </UIButton>
        </div>
      </div>
      <input
        ref="cameraInput"
        type="file"
        accept="image/*"
        capture="environment"
        class="hidden"
        @change="handlePick"
      />
    </template>
  </UIBaseModal>
</template>

<script setup lang="ts">
import UIBaseModal from '@/shared/ui/UIBaseModal/UIBaseModal.vue'
import { UIButton } from '@/shared/ui/UIButton'
import { useOverlayManager } from '@/shared/lib/composables/useOverlayManager'
import { ru } from '@/shared/lib/i18n/ru'
import { useResendMeal } from '@/features/send-meal-again/model'
import { useUploadMealAnalysis } from '@/entities/meal/api/useUploadMealAnalysis'
import { ModalNames } from '@/shared/types/modalNames'
import { useMealAnalysisWorker } from '@/entities/meal/model/useMealAnalysisWorker'
import { useMainPage } from '@/pages/main-page/model'

const { setOpenedModal } = useOverlayManager()

const { cameraInput, openCamera, onPick } = useResendMeal()

const { enqueue, onEvent } = useMealAnalysisWorker()

const { upload } = useUploadMealAnalysis()

const { loadAll } = useMainPage()

onEvent(async (event) => {
  if (event.type === 'done') {
    try {
      await loadAll()
    } catch (err) {
      console.error('Failed to refresh meals after analysis completion', err)
    }
  }
})

const handlePick = async (e: Event) => {
  setOpenedModal(ModalNames.PhotoLoaderModal)

  const file = onPick(e)

  if (!file) {
    setOpenedModal(null)

    return
  }

  try {
    const res = await upload(file)

    if (res) {
      await loadAll()

      enqueue(res.id)

      setOpenedModal(ModalNames.MealAnalyzingModal)
    }
  } catch (e) {
    console.error(e)

    setOpenedModal(ModalNames.RetakePhotoModal)
  }
}
</script>

<style scoped></style>
