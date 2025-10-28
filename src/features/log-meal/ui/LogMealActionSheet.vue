<template>
  <div>
    <div
      class="rounded-2xl px-6 py-5"
      :style="{ background: 'rgb(18, 18, 18)' }"
    >
      <button
        class="w-full flex items-center justify-between gap-3 active:scale-[0.99] mb-3"
        @click="openCamera"
      >
        <span class="flex items-center gap-3">
          <span class="text-xl">📷</span>
          <span class="text-left min-w-36 whitespace-nowrap text-base"
            >Take photo</span
          >
        </span>
        <RightArrowIcon class="w-4 h-4 shrink-0" />
      </button>
      <button
        class="w-full flex items-center justify-between gap-3 rounded-2xl active:scale-[0.99]"
        @click="openGallery"
      >
        <span class="flex items-center gap-3">
          <span class="text-xl">🖼️</span>
          <span class="text-left min-w-36 text-base whitespace-nowrap"
            >From Gallery</span
          >
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
      @change="onPick"
    />
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
import { ref } from 'vue'
import WebApp from '@twa-dev/sdk'
import RightArrowIcon from '@/shared/assets/icons/right-arrow-icon.svg'

type Emits = {
  (e: 'close'): void
  (e: 'select', file: File): void
}
const emit = defineEmits<Emits>()

const open = defineModel<boolean>({ required: true })

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
