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

export interface GoalOption {
  id: string
  title: string
  description?: string
  imageUrl?: string
}

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
