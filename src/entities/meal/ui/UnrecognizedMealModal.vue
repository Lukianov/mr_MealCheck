<template>
  <UIBaseModal>
    <template #header-icon>
      <img
        class="h-16 w-16 object-cover rounded-xl"
        src="@/shared/assets/images/mock-images/mock-unrecognized-meal.jpg"
        alt="mock-unrecognized-meal"
      />
    </template>
    <template #default>
      <div>
        <p class="mb-2 font-bold text-2xl">
          We couldn’t recognize the food in your photo
        </p>
        <p class="mb-6 text-base" :style="{ color: 'rgba(162, 172, 176, 1)' }">
          Please try again with a clearer shot — make sure the dish is fully
          visible and well-lit
        </p>
        <div class="flex items-center gap-3">
          <UIButton
            @click="openCamera"
            class="w-full"
            :style="{ background: 'rgba(0, 167, 237, 1)' }"
          >
            Take photo
          </UIButton>
          <UIButton class="w-full" @click="openGallery"> Upload </UIButton>
        </div>
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
    </template>
  </UIBaseModal>
</template>

<script setup lang="ts">
import UIBaseModal from '@/shared/ui/UIBaseModal/UIBaseModal.vue'
import { UIButton } from '@/shared/ui/UIButton'
import { ref } from 'vue'
import WebApp from '@twa-dev/sdk'

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
}
</script>
