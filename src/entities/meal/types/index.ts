export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export interface PendingMeal {
  id: number
  photoUrl: string
}

export interface Dish {
  name: string
  weight?: number
  kcal?: number
  protein?: number
  fat?: number
  carb?: number
}

export interface Meal {
  id: number
  photoUrl: string
  type: MealType
  isViewed: boolean
  dishes: Dish[]
}

export interface MealsResponse {
  pendingMeals: PendingMeal[]
  meals: Meal[]
}

export interface Macros {
  kcal: number
  protein: number
  fat: number
  carb: number
}

export interface DailyStatsResponse {
  reached: Macros
  goal: Macros
}

export interface UploadAnalysisResponse {
  id: number
  photoUrl: string
}

export type AnalysisStatus = 'pending' | 'done'

export interface AnalysisStatusResponse {
  id: number
  status: AnalysisStatus
}

export interface MealDetailsResponse {
  id: number
  photoUrl: string
  type: MealType
  isViewed: boolean
  summary: string
  recommendation: string
  kcal: number
  protein: number
  fat: number
  carb: number
  dishes: Dish[]
}
