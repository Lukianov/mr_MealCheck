import type { MealType } from '@/entities/meal/types'
import { ru } from '@/shared/lib/i18n/ru'
import { RuForms } from '@/shared/lib/helpers/pluralizeRu'
import { rangeOptions } from '@/shared/lib/helpers/rangeDate'

export const TYPE_LABEL: Record<MealType, string> = {
  breakfast: ru.mealType.breakfast,
  lunch: ru.mealType.lunch,
  dinner: ru.mealType.dinner,
  snack: ru.mealType.snack,
}

export const MEAL_FORMS: RuForms = [ru.meals.one, ru.meals.two, ru.meals.few]

export const YEAR_FORMS = (function () {
  const currentYear = new Date().getFullYear()

  const from = currentYear - 100

  const to = currentYear - 14

  return rangeOptions(from, to)
})()

export const MONTH_FORMS = rangeOptions(1, 12)

export const DAY_FORMS = rangeOptions(1, 31)
