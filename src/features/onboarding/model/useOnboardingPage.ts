import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouteName, router } from '@/shared/lib/router'
import { useGoalSelection } from '@/features/onboarding/model/useGoalSelection'
import WebApp from '@twa-dev/sdk'
import { IS_ONBOARDING_PASSED_KEY } from '@/app/providers/setupTelegramWebApp'
import { ru } from '@/shared/lib/i18n/ru'

export const useOnboarding = () => {
  const currentSlideIndex = ref(0)

  const {
    personalWeight,
    personalHeight,
    isPersonalAgeValid,
    validatePersonalAge,
  } = useGoalSelection()

  const isDisabled = computed(() => {
    if (currentSlideIndex.value === 3 && !personalWeight.value) {
      return true
    }

    return currentSlideIndex.value === 4 && !personalHeight.value
  })

  watch(isDisabled, (isFlag) => {
    if (isFlag) {
      WebApp.MainButton.disable()
    } else {
      WebApp.MainButton.enable()
    }
  })

  const { sendOnboardingCharacteristics } = useGoalSelection()

  function goToNextSlide() {
    if (currentSlideIndex.value === 5) {
      validatePersonalAge()

      if (!isPersonalAgeValid.value) {
        return
      }
    }

    if (currentSlideIndex.value === 6) {
      WebApp.MainButton.setText(ru.onboarding.final)
    }

    if (currentSlideIndex.value === 7) {
      try {
        void sendOnboardingCharacteristics()

        WebApp.CloudStorage.setItem(IS_ONBOARDING_PASSED_KEY, 'true')
      } catch (e) {
        console.error(e)
      }

      void router.push({ name: RouteName.Main })

      return
    }

    currentSlideIndex.value = currentSlideIndex.value + 1
  }

  onMounted(() => {
    WebApp.MainButton.setParams({
      text: ru.onboarding.buttonTitle,
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
  }
}
