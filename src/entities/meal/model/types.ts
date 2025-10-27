export interface Macro {
  label: 'kcal' | 'protein' | 'fat' | 'carbs';
  value: number;
  unit?: string;
}
export interface Dish {
  id: string;
  name: string;
  weight?: string;
  calories?: number;
  macros?: { protein?: number; fat?: number; carbs?: number };
}
export interface MealDetails {
  id: string;
  title: string;
  image: string;
  subtitle?: string;
  summary?: string;
  recommendations?: string;
  macros: Macro[];
  dishes: Dish[];
}
