<template>
  <div>
    <UIButton
      @click="setShowLogOptionsPopup(!isShowLogOptionsPopup)"
      :is-disabled="isDisabled"
      class="px-4 py-3"
    >
      <div class="flex items-center justify-center shrink-0 gap-2.5">
        <LogPlusIcon class="w-7" />
        <p class="label font-medium select-none">
          {{ ru.logMealWidget.buttonTitle }}
        </p>
      </div>
    </UIButton>
    <LogMealActionSheet
      v-if="isShowLogOptionsPopup"
      class="absolute bottom-full right-0 mb-6"
      @select="onPick"
      @inputText="setOpenedModal(ModalNames.TextLogModal)"
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
import { useLogMeal } from '@/entities/log-meal/model'
import { LogMealActionSheet } from '@/features/log-meal'

const emit = defineEmits<{ (e: 'update-data'): void }>()

const { isShowLogOptionsPopup, setShowLogOptionsPopup } = useLogMeal()

const { setOpenedModal } = useOverlayManager()

const { upload } = useUploadMealAnalysis()
const { enqueue } = useMealAnalysisWorker()

const isDisabled = ref(false)

async function onPick(e: Event) {
  try {
    setOpenedModal(ModalNames.PhotoLoaderModal)

    isDisabled.value = true

    const tgt = e.target as HTMLInputElement

    const file = tgt.files?.[0]

    tgt.value = ''

    if (!file) {
      setOpenedModal(null)

      return
    }

    try {
      const res = await upload(file)

      if (res) {
        emit('update-data')

        enqueue(res.id)

        setOpenedModal(ModalNames.MealAnalyzingModal)
      }
    } catch (e) {
      setOpenedModal(null)

      console.error(e)
    }
  } finally {
    isDisabled.value = false
  }
}
</script>
