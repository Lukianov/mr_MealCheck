import { onMounted, onUnmounted, ref } from 'vue'
import { RouteName, router } from '@/shared/lib/router'
import { useGoalSelection } from '@/features/onboarding/model/useGoalSelection'
import WebApp from '@twa-dev/sdk'
import { IS_ONBOARDING_PASSED_KEY } from '@/app/providers/setupTelegramWebApp'
import { ru } from '@/shared/lib/i18n/ru'

export const useOnboarding = () => {
  const currentSlideIndex = ref(0)

  const { sendOnboardingCharacteristics } = useGoalSelection()

  function goToNextSlide() {
    if (currentSlideIndex.value === 5) {
      try {
        void sendOnboardingCharacteristics()

        WebApp.CloudStorage.setItem(IS_ONBOARDING_PASSED_KEY, 'true')
      } catch (e) {
        console.error(e)
      }

      void router.push({ name: RouteName.Main })

      return
    }

    if (currentSlideIndex.value === 4) {
      WebApp.MainButton.setText(ru.onboarding.buttonTitle)
    }

    currentSlideIndex.value = currentSlideIndex.value + 1
  }

  onMounted(() => {
    WebApp.setBackgroundColor?.('#121212')

    WebApp.MainButton.setParams({
      text: ru.onboarding.final,
      color: '#1d1d1d',
      text_color: '#ffffff',
    })

    WebApp.MainButton.show()

    WebApp.onEvent('mainButtonClicked', goToNextSlide)
  })

  onUnmounted(() => {
    WebApp.offEvent('mainButtonClicked', goToNextSlide)

    WebApp.MainButton.hide()
  })

  return {
    currentSlideIndex,
    goToNextSlide,
  }
}
