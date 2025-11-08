import type { MealType } from '@/entities/meal/types'
import { ru } from '@/shared/lib/i18n/ru'

export const TYPE_LABEL: Record<MealType, string> = {
  breakfast: ru.mealType.breakfast,
  lunch: ru.mealType.lunch,
  dinner: ru.mealType.dinner,
  snack: ru.mealType.snack,
}
