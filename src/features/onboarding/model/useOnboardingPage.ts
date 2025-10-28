import { ref } from 'vue'
import { RouteName, router } from '@/shared/lib/router'
import { useGoalSelection } from '@/features/onboarding/model/useGoalSelection'

export const useOnboarding = () => {
  const currentSlideIndex = ref(0)

  const { sendOnboardingCharacteristics } = useGoalSelection()

  const goToNextSlide = () => {
    if (currentSlideIndex.value === 5) {
      try {
        void sendOnboardingCharacteristics()
      } catch (e) {
        console.error(e)
      }

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
