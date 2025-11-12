import { ref } from 'vue'

export const useLogMeal = () => {
  const isShowLogOptionsPopup = ref(false)

  const setShowLogOptionsPopup = (value: boolean) => {
    isShowLogOptionsPopup.value = value
  }

  return {
    setShowLogOptionsPopup,
    isShowLogOptionsPopup,
  }
}
