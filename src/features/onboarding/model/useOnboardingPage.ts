import { ref } from 'vue'
import { RouteName, router } from '@/shared/lib/router'

export const useOnboarding = () => {
  const currentSlideIndex = ref(0)

  const goToNextSlide = () => {
    if (currentSlideIndex.value === 5) {
      void router.push({ name: RouteName.Main })

      return
    }

    currentSlideIndex.value = currentSlideIndex.value + 1
  }

  return {
    currentSlideIndex,
    goToNextSlide,
  }
}
