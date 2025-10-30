<template>
  <div>
    <UIButton @click="openGallery" class="px-4 py-3">
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
import { ru } from '@/shared/lib/i18n/en'
import WebApp from '@twa-dev/sdk'
import { ref } from 'vue'
import { useUploadMealAnalysis } from '@/entities/meal/api/useUploadMealAnalysis'

type Emits = {
  (e: 'open-analyze-popup'): void
  (e: 'select', file: File): void
}

const isOpen = ref(false)

const galleryInput = ref<HTMLInputElement>()

const { upload } = useUploadMealAnalysis()

const emit = defineEmits<Emits>()

function haptic() {
  WebApp.HapticFeedback.impactOccurred('light')
}

function openGallery() {
  isOpen.value = true

  haptic()

  galleryInput.value?.click()
}

async function onPick(e: Event) {
  const tgt = e.target as HTMLInputElement

  const file = tgt.files?.[0]

  tgt.value = '' // сброс

  if (!file) {
    return
  }

  emit('open-analyze-popup')

  const res = await upload(file)

  if (res) {
    emit('open-analyze-popup')
  }

  isOpen.value = false
}
</script>
