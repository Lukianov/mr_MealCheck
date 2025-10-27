import type { MealDetails } from '@/entities/meal/model/types'

export const mockMeal: MealDetails = {
  id: '1',
  title: 'Dinner',
  image: new URL(
    '@/shared/assets/images/mock-images/meal-detailed-template.png',
    import.meta.url,
  ).href,
  subtitle:
    'Cappuchino, Pancakes, Poached eggs, Haloumi, Jam, Fresh vegetables, Ham, Bread',
  summary:
    'A good meal is balanced: protein, veggies, slow carbs, and healthy fats — less sugar, more energy.',
  recommendations:
    'High in simple carbs, but good protein. Add veggies or whole grains, and go easy on sugar and caffeine.',
  macros: [
    { label: 'kcal', value: 1500 },
    { label: 'protein', value: 24, unit: 'g' },
    { label: 'fat', value: 18, unit: 'g' },
    { label: 'carbs', value: 52, unit: 'g' },
  ],
  dishes: [
    { id: 'd1', name: 'Cappuccino' },
    { id: 'd2', name: 'Pancakes' },
    { id: 'd3', name: 'Jam' },
    { id: 'd4', name: 'Poached eggs' },
    { id: 'd5', name: 'Fresh vegetables' },
  ],
}
