import { ref } from 'vue'
import { RouteName, router } from '@/shared/lib/router'
import { useDebounce } from '@/shared/lib/composables/useDebounce'

const TAP_THRESHOLD = 5
const TAP_TIMEOUT = 500

export function useShowOnboarding() {
  const tapCount = ref(0)

  const { run: scheduleReset, cancel } = useDebounce(() => {
    tapCount.value = 0
  }, TAP_TIMEOUT)

  const registerTap = () => {
    tapCount.value += 1

    scheduleReset()

    if (tapCount.value >= TAP_THRESHOLD) {
      tapCount.value = 0

      cancel()

      void router.push({ name: RouteName.Onboarding })
    }
  }

  return {
    tapCount,
    registerTap,
  }
}
