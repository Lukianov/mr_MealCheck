import { useApiClient } from '@/shared/api'
import { computed } from 'vue'

export const useTestUserData = () => {
  const { userData } = useApiClient()

  const isTestUser = computed(
    () =>
      userData.value.id &&
      [199311767, 180600889, 254724042, 52270401].includes(userData.value.id),
  )

  return {
    isTestUser,
  }
}
