export interface Dish {
  id: number
  name: string
  weight?: string
  weightValue?: number
  calories?: number
  recommendation?: string
  healthScore?: number
  macros?: { protein?: number; fat?: number; carbs?: number; calories?: number }
}
