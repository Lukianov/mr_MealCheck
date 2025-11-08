import { computed, ref } from 'vue'
import {
  ACTIVITY_LEVEL_OPTIONS,
  GENDER_OPTIONS,
  GenderTypes,
  GOAL_OPTIONS,
  GoalType,
} from '@/features/onboarding/const'
import { sendOnboardingRequest } from '@/features/onboarding/api/sendOnboardingRequest'
import {useISODate} from "@/shared/lib/composables/useISODate";

const selectedGoal = ref<string>(GOAL_OPTIONS[0]?.id ?? '')

const selectedGender = ref<string>(GENDER_OPTIONS[1]?.id ?? '')

const selectedActivityLevel = ref<string>(ACTIVITY_LEVEL_OPTIONS[1]?.id ?? '')

const personalHeight = ref<number | null>(null)

const personalWeight = ref<number | null>(null)

const personalAge = ref<string | null>(null)

const sanitizedHeight = computed(() =>
  typeof personalHeight.value === 'number' ? personalHeight.value : undefined,
)

const sanitizedWeight = computed(() =>
  typeof personalWeight.value === 'number' ? personalWeight.value : undefined,
)

export const useGoalSelection = () => {
  const { toIsoDate } = useISODate()

  const selectGoal = (goalId: string) => {
    selectedGoal.value = goalId
  }

  const selectGender = (genderId: string) => {
    selectedGender.value = genderId
  }

  const selectActivityLevel = (activityLevelId: string) => {
    selectedActivityLevel.value = activityLevelId
  }

  async function sendOnboardingCharacteristics() {
    try {
      await sendOnboardingRequest({
        goal: selectedGoal.value as GoalType,
        gender: selectedGender.value as GenderTypes,
        height: sanitizedHeight.value,
        weight: sanitizedWeight.value,
        activityLevel: selectedActivityLevel.value,
        birthDate: toIsoDate(personalAge.value),
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
    personalAge,
    selectActivityLevel,
    selectedActivityLevel,
  }
}
