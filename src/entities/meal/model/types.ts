export interface Dish {
  id: string
  name: string
  weight?: string
  calories?: number
  macros?: { protein?: number; fat?: number; carbs?: number }
}
