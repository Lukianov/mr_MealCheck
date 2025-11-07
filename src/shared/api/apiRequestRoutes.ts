export const enum ApiResponseType {
  UserOnboardingData = 'users/characteristics',
  UploadAnalysisData = 'users/meals/analyses',
  GetUserDailyStats = 'users/meals/stats',
  GetUserMeals = 'users/meals',
  GetMealAnalyzedStatus = 'users/meals/analyses/',
  DeleteDish = 'users/meals/',
  GetUserCaloriesStatistics = 'users/meals/stats/kcal',
  GetUserWeightStatistics = 'users/meals/stats/weight',
}
