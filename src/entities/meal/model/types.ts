export interface Dish {
  id: number
  name: string
  weight?: string
  calories?: number
  recommendation?: string
  healthScore?: number
  macros?: { protein?: number; fat?: number; carbs?: number; calories?: number }
}
