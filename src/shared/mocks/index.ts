import type { DailyStatsResponse, MealsResponse } from '@/entities/meal/types'
import type { MealDetailsResponse } from '@/entities/meal/types'

export const DEFAULT_MEAL_DETAILS: MealDetailsResponse = {
  id: 0,
  photoUrl: new URL(
    '@/shared/assets/images/mock-images/meal-detailed-template.png',
    import.meta.url,
  ).href,
  type: 'dinner',
  isViewed: false,
  summary:
    'Balanced plates combine protein, veggies, complex carbs, and healthy fats. Cut back on added sugars to keep energy steady.',
  recommendation:
    'Add more fiber-rich sides and consider swapping sugary drinks for water or tea to improve macro balance.',
  kcal: 640,
  protein: 32,
  fat: 24,
  carb: 68,
  dishes: [
    {
      name: 'Grilled chicken',
      weight: 180,
      kcal: 320,
      protein: 35,
      fat: 10,
      carb: 0,
    },
    {
      name: 'Steamed vegetables',
      weight: 150,
      kcal: 90,
      protein: 5,
      fat: 2,
      carb: 15,
    },
    {
      name: 'Quinoa',
      weight: 120,
      kcal: 180,
      protein: 6,
      fat: 4,
      carb: 32,
    },
  ],
}

export const DAILY_STATS_MOCK: DailyStatsResponse = {
  reached: {
    kcal: 100,
    protein: 24,
    fat: 18,
    carbs: 52,
  },
  goal: {
    kcal: 1500,
    protein: 100,
    fat: 70,
    carbs: 250,
  },
}

export const MEALS_RESPONSE_MOCK: MealsResponse = {
  pendingMeals: [
    {
      id: 1001,
      photoUrl: 'src/shared/assets/images/mock-images/meal-template.jpg',
    },
  ],
  meals: [
    {
      id: 2001,
      photoUrl: 'src/shared/assets/images/mock-images/meal-template.jpg',
      type: 'breakfast',
      isViewed: true,
      dishes: [{ name: 'Oatmeal with berries' }, { name: 'Almond milk' }],
    },
    {
      id: 2002,
      photoUrl: 'src/shared/assets/images/mock-images/meal-template.jpg',
      type: 'lunch',
      isViewed: false,
      dishes: [{ name: 'Spaghetti Bolognese' }, { name: 'Caesar salad' }],
    },
    {
      id: 2003,
      photoUrl: 'src/shared/assets/images/mock-images/meal-template.jpg',
      type: 'snack',
      isViewed: true,
      dishes: [{ name: 'Greek yogurt' }],
    },
  ],
}

// export const MEALS_RESPONSE_MOCK: MealsResponse = {
//   pendingMeals: [],
//   meals: [],
// }
