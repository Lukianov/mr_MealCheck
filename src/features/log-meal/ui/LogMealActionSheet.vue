<template>
  <div>
    <div
      class="rounded-3xl py-2.5 px-4"
      :style="{
        background: 'rgb(18, 18, 18)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }"
    >
      <button
        class="w-full flex items-center justify-between gap-3 active:scale-[1.1] py-1.5"
        @click="openCamera"
      >
        <span class="flex items-center gap-3">
          <span class="flex w-7 h-7 items-center justify-center">
            <CameraIcon />
          </span>
          <span class="text-left min-w-36 whitespace-nowrap text-base">
            {{ ru.logMealWidget.takePhoto }}
          </span>
        </span>
        <RightArrowIcon class="w-4 h-4 shrink-0" />
      </button>
      <button
        class="w-full flex items-center justify-between gap-3 rounded-2xl active:scale-[1.1] py-1.5"
        @click="openGallery"
      >
        <span class="flex items-center gap-3">
          <span class="flex w-5 h-5 items-center justify-center">
            <GalleryIcon />
          </span>
          <span class="text-left min-w-36 text-base whitespace-nowrap">
            {{ ru.logMealWidget.fromGallery }}
          </span>
        </span>
        <RightArrowIcon class="w-4 h-4 shrink-0" />
      </button>
      <button
        class="w-full flex items-center justify-between gap-3 rounded-2xl active:scale-[1.1] py-1.5"
        @click="emit('input-text')"
      >
        <span class="flex items-center gap-3">
          <span class="flex w-5 h-5 items-center justify-center">
            <TextInputIcon />
          </span>
          <span class="text-left min-w-36 text-base whitespace-nowrap">
            {{ ru.logMealWidget.inputText }}
          </span>
        </span>
        <RightArrowIcon class="w-4 h-4 shrink-0" />
      </button>
    </div>
    <input
      ref="cameraInput"
      type="file"
      accept="image/*"
      capture="environment"
      class="hidden"
      @change="emit('select', $event)"
    />
    <input
      ref="galleryInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="emit('select', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WebApp from '@twa-dev/sdk'
import RightArrowIcon from '@/shared/assets/icons/right-arrow-icon.svg'
import CameraIcon from '@/shared/assets/icons/camera-icon.svg'
import GalleryIcon from '@/shared/assets/icons/gallery-icon.svg'
import TextInputIcon from '@/shared/assets/icons/text-input-icon.svg'
import { ru } from '@/shared/lib/i18n/ru'

type Emits = {
  (e: 'close'): void
  (e: 'input-text'): void
  (e: 'select', file: Event): void
}

const emit = defineEmits<Emits>()

const cameraInput = ref<HTMLInputElement>()

const galleryInput = ref<HTMLInputElement>()

function haptic() {
  WebApp.HapticFeedback.impactOccurred('light')
}

function openCamera() {
  haptic()

  cameraInput.value?.click()
}

function openGallery() {
  haptic()

  galleryInput.value?.click()
}

function onPick(e: Event) {
  const tgt = e.target as HTMLInputElement
  const file = tgt.files?.[0]

  tgt.value = '' // сброс

  if (!file) {
    return
  }

  emit('select', file)

  open.value = false
}
</script>
