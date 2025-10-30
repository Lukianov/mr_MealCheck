import { computed, ref } from 'vue'
import { ModalNames } from '@/shared/types/modalNames'

const openedModal = ref<ModalNames | null>(null)

export function useOverlayManager() {
  const isVisible = computed(() => openedModal.value)

  function setOpenedModal(overlayName: ModalNames | null) {
    openedModal.value = overlayName
  }

  return { isVisible, setOpenedModal, openedModal }
}
