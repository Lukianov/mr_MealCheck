<template>
  <div>
    <UIButton @click="openGallery" :is-disabled="isDisabled" class="px-4 py-3">
      <div class="flex items-center justify-center shrink-0 gap-2.5">
        <LogPlusIcon class="w-7" />
        <p class="">
          {{ ru.logMealWidget.buttonTitle }}
        </p>
      </div>
    </UIButton>
    <input
      ref="galleryInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="onPick"
    />
  </div>
</template>

<script setup lang="ts">
import LogPlusIcon from '@/shared/assets/icons/log-plus-icon.svg'
import { UIButton } from '@/shared/ui/UIButton'
import { ru } from '@/shared/lib/i18n/ru'

import WebApp from '@twa-dev/sdk'
import { ref } from 'vue'
import { useUploadMealAnalysis } from '@/entities/meal/api/useUploadMealAnalysis'
import { useOverlayManager } from '@/shared/lib/composables/useOverlayManager'
import { ModalNames } from '@/shared/types/modalNames'
import { useMealAnalysisWorker } from '@/entities/meal/model/useMealAnalysisWorker'
import { useMainPage } from '@/pages/main-page/model'

const { setOpenedModal } = useOverlayManager()

type Emits = {
  (e: 'open-analyze-popup'): void
  (e: 'select', file: File): void
}

const isOpen = ref(false)

const galleryInput = ref<HTMLInputElement>()

const { upload } = useUploadMealAnalysis()
const { enqueue, onEvent } = useMealAnalysisWorker()
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

function haptic() {
  WebApp.HapticFeedback.impactOccurred('light')
}

function openGallery() {
  isOpen.value = true

  haptic()

  galleryInput.value?.click()
}

const isDisabled = ref(false)

async function onPick(e: Event) {
  try {
    isDisabled.value = true

    const tgt = e.target as HTMLInputElement

    const file = tgt.files?.[0]

    tgt.value = ''

    if (!file) {
      return
    }

    const res = await upload(file)

    if (res) {
      enqueue(res.id)

      setOpenedModal(ModalNames.MealAnalyzingModal)
    }

    isOpen.value = false
  } finally {
    isDisabled.value = false
  }
}
</script>
