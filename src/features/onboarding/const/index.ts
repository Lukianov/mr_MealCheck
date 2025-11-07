import { ru } from '@/shared/lib/i18n/ru'

export const enum GoalType {
  Lose = 'lose',
  Maintain = 'maintain',
  Gain = 'gain',
}

export const enum GenderTypes {
  Man = 'man',
  Woman = 'woman',
  Unknown = 'unknown',
}

export const enum ActivityLevel {
  Low = 'low',
  Light = 'light',
  Moderate = 'moderate',
  High = 'high',
}

export interface GoalOption {
  id: string
  title: string
  description?: string
  imageUrl?: string
}

export const ACTIVITY_LEVEL_OPTIONS: GoalOption[] = [
  {
    id: ActivityLevel.Low,
    title: ru.onboarding.activityLevel.activityOptions.low.title,
    description: ru.onboarding.activityLevel.activityOptions.low.description,
    imageUrl:
      'src/shared/assets/images/onboading/onboarding-armchair-image.png',
  },
  {
    id: ActivityLevel.Light,
    title: ru.onboarding.activityLevel.activityOptions.light.title,
    description: ru.onboarding.activityLevel.activityOptions.light.description,
    imageUrl: 'src/shared/assets/images/onboading/onboarding-goal-maintain.png',
  },
  {
    id: ActivityLevel.Moderate,
    title: ru.onboarding.activityLevel.activityOptions.average.title,
    description:
      ru.onboarding.activityLevel.activityOptions.average.description,
    imageUrl: 'src/shared/assets/images/onboading/onboarding-goal-gain.png',
  },
  {
    id: ActivityLevel.High,
    title: ru.onboarding.activityLevel.activityOptions.high.title,
    description: ru.onboarding.activityLevel.activityOptions.high.description,
    imageUrl: 'src/shared/assets/images/onboading/onboarding-fire-image.png',
  },
]

export const GOAL_OPTIONS: GoalOption[] = [
  {
    id: GoalType.Lose,
    title: 'Lose weight',
    description: 'Build a calorie deficit with mindful meals',
  },
  {
    id: GoalType.Gain,
    title: 'Gain muscle',
    description: 'Prioritise protein and structured workouts',
  },
  {
    id: GoalType.Maintain,
    title: 'Stay balanced',
    description: 'Maintain habits and keep energy steady',
  },
]

export const GENDER_OPTIONS: GoalOption[] = [
  {
    id: GenderTypes.Woman,
    title: 'Woman',
    imageUrl: 'src/shared/assets/images/onboading/gender-slide-woman.png',
  },
  {
    id: GenderTypes.Man,
    title: 'Man',
    imageUrl: 'src/shared/assets/images/onboading/gender-slide-man.png',
  },
]
