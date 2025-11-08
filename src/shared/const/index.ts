import type { MealType } from '@/entities/meal/types'
import { ru } from '@/shared/lib/i18n/ru'
import { RuForms } from '@/shared/lib/helpers/pluralizeRu'

export const TYPE_LABEL: Record<MealType, string> = {
  breakfast: ru.mealType.breakfast,
  lunch: ru.mealType.lunch,
  dinner: ru.mealType.dinner,
  snack: ru.mealType.snack,
}

export const MEAL_FORMS: RuForms = [ru.meals.one, ru.meals.two, ru.meals.few]
