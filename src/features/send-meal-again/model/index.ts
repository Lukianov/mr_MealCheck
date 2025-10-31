import { ref } from 'vue'
import WebApp from '@twa-dev/sdk'

export const useResendMeal = () => {
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

  return {
    cameraInput,
    galleryInput,
    openCamera,
    openGallery,
    onPick,
  }
}
