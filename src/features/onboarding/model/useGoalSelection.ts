import { ref } from 'vue'
import {
  GENDER_OPTIONS,
  GenderTypes,
  GOAL_OPTIONS,
  GoalType,
} from '@/features/onboarding/const'
import { sendOnboardingRequest } from '@/features/onboarding/api/sendOnboardingRequest'

const selectedGoal = ref<string>(GOAL_OPTIONS[0]?.id ?? '')

const selectedGender = ref<string>(GENDER_OPTIONS[1]?.id ?? '')

const personalHeight = ref<number>(0)

const personalWeight = ref<number>(0)

export const useGoalSelection = () => {
  const selectGoal = (goalId: string) => {
    selectedGoal.value = goalId
  }

  const selectGender = (genderId: string) => {
    selectedGender.value = genderId
  }

  async function sendOnboardingCharacteristics() {
    try {
      await sendOnboardingRequest({
        goal: selectedGoal.value as GoalType,
        gender: selectedGender.value as GenderTypes,
        height: personalHeight.value,
        weight: personalWeight.value,
      })
    } catch (e) {
      console.error(e)
    }
  }

  return {
    sendOnboardingCharacteristics,
    selectedGoal,
    selectedGender,
    selectGoal,
    selectGender,
    personalHeight,
    personalWeight,
  }
}
