export interface Dish {
  id: string
  name: string
  weight?: string
  calories?: number
  recommendation?: string
  macros?: { protein?: number; fat?: number; carbs?: number; calories?: number }
}
