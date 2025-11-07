import { apiRequest, ApiResponseType } from '@/shared/api'
import { GenderTypes, GoalType } from '@/features/onboarding/const'

export async function sendOnboardingRequest(data: {
  goal?: GoalType
  gender?: GenderTypes
  height?: number
  weight?: number
  activityLevel?: string
  birthDate?: string
}) {
  await apiRequest<void>(ApiResponseType.UserOnboardingData, {
    method: 'PATCH',
    json: data,
  })
}
