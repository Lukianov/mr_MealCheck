import { computed, ref } from 'vue'
import { ModalNames } from '@/shared/types/modalNames'

const openedModal = ref<ModalNames | null>(null)

const modalPayload = ref<unknown | null>(null)

export function useOverlayManager() {
  const isVisible = computed(() => Boolean(openedModal.value))

  function setOpenedModal(overlayName: ModalNames, payload?: unknown) {
    modalPayload.value = payload ?? null

    openedModal.value = overlayName
  }

  return { isVisible, setOpenedModal, openedModal, modalPayload }
}
