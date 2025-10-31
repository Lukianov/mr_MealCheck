import type { DailyStatsResponse, MealsResponse } from '@/entities/meal/types'

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
      dishes: [
        { name: 'Oatmeal with berries' },
        { name: 'Almond milk' },
      ],
    },
    {
      id: 2002,
      photoUrl: 'src/shared/assets/images/mock-images/meal-template.jpg',
      type: 'lunch',
      isViewed: false,
      dishes: [
        { name: 'Spaghetti Bolognese' },
        { name: 'Caesar salad' },
      ],
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
