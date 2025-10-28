import { apiRequest, ApiResponseType } from '@/shared/api'
import { GenderTypes, GoalType } from '@/features/onboarding/const'

type UpdateCharacteristicsPayload = {
  goal?: GoalType
  weight?: number
  height?: number
  gender?: GenderTypes
}

export async function sendOnboardingRequest(
  data: UpdateCharacteristicsPayload,
) {
  await apiRequest<void>(ApiResponseType.UserOnboardingData, {
    method: 'PATCH',
    json: data,
  })
}
