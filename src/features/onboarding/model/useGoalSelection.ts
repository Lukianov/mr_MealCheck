import { ref } from 'vue'
import { GENDER_OPTIONS, GOAL_OPTIONS } from '@/features/onboarding/const'

const selectedGoal = ref<string>(GOAL_OPTIONS[0]?.id ?? '')

const selectedGender = ref<string>(GENDER_OPTIONS[1]?.id ?? '')

export const useGoalSelection = () => {
  const selectGoal = (goalId: string) => {
    selectedGoal.value = goalId
  }

  const selectGender = (genderId: string) => {
    selectedGender.value = genderId
  }

  return {
    selectedGoal,
    selectedGender,
    selectGoal,
    selectGender,
  }
}
