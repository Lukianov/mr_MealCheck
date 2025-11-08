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
    title: ru.onboarding.goalSlide.loseWeight.title,
    description: ru.onboarding.goalSlide.loseWeight.description,
  },
  {
    id: GoalType.Gain,
    title: ru.onboarding.goalSlide.gainWeight.title,
    description: ru.onboarding.goalSlide.gainWeight.description,
  },
  {
    id: GoalType.Maintain,
    title: ru.onboarding.goalSlide.maintainWeight.title,
    description: ru.onboarding.goalSlide.maintainWeight.description,
  },
]

export const GENDER_OPTIONS: GoalOption[] = [
  {
    id: GenderTypes.Woman,
    title: ru.onboarding.genderSlide.woman,
    imageUrl: 'src/shared/assets/images/onboading/gender-slide-woman.png',
  },
  {
    id: GenderTypes.Man,
    title: ru.onboarding.genderSlide.man,
    imageUrl: 'src/shared/assets/images/onboading/gender-slide-man.png',
  },
]
