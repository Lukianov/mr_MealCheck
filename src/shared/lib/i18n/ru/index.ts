export const ru = {
  onboarding: {
    buttonTitle: 'Next',
    final: 'Let`s go',
    birthDate: {
      title: 'Дата рождения',
      description: 'Дата нужна для точного расчёта базового метаболизма',
    },
    activityLevel: {
      title: 'Уровень активности',
      description: 'Рассчитаем норму каллорий под вашу цель',
      activityOptions: {
        low: {
          title: 'Низкая',
          description: 'Сидячий образ жизни',
        },
        light: {
          title: 'Легкая',
          description: 'Активность в течение дня',
        },
        average: {
          title: 'Умеренная',
          description: '1–3 тренировки в неделю',
        },
        high: {
          title: 'Высокая',
          description: 'Тренировки почти каждый день',
        },
      },
    },
  },
  summaryWidget: {
    caloriesShort: 'KCAL',
    protein: 'protein',
    fat: 'fat',
    carbs: 'carbs',
  },
  todayMealBlock: {
    empty: 'Nothing was added yet',
    mealBlockTitle: 'Meals logged today',
    mealRow: {
      status: {
        pending: 'pending',
      },
    },
  },
  logMealWidget: {
    buttonTitle: 'Log Meal',
  },
  mealDetail: {
    mealSummaryCard: {
      title: 'About',
      summary: 'Summary',
      recommendation: 'Recommendation',
      recognizedDishes: 'Recognized dishes',
      view: 'View',
      macronutrients: 'Macronutrients',
    },
    dishesSection: {
      macronutrients: 'Macronutrients',
    },
    deleteButton: 'Delete',
  },
  mealRow: {
    unrecognizedDish: 'Need to retake photo',
  },
  retakePhotoModal: {
    title: 'We couldn’t recognize the food in your photo',
    description:
      'Please try again with a clearer shot — make sure the dish is fully visible and well-lit',
    acceptButton: 'Retake photo',
    cancel: 'Cancel',
  },
  dailyProgressWidget: {
    title: 'За сегодня',
    more: 'Подробнее',
  },
  weightChangerModal: {
    title: 'Обновление веса',
    description: 'Введите актуальное значение, чтобы отслеживать прогресс',
    save: 'Сохранить',
  },
  weightProgressWidget: {
    addValue: 'Добавить значения',
  },
  metrics: {
    kcal: 'ккал',
    from: 'из',
    protein: 'белки',
    fat: 'жиры',
    carbs: 'углеводы',
    weight: 'Вес',
    kilo: 'кг',
  },
  userStatistics: {
    title: 'Дневник изменений',
    description: 'Здесь мы бережно храним данные \n о вашем прогрессе',
    chartUserCalories: {
      title: 'Потребление калорий',
    },
    chartUserWeight: {
      title: 'Изменение веса',
    },
    loading: 'Загрузка...',
  },
  deleteDishModal: {
    title: (title: string) => `Удалить ${title} из приема пищи?`,
    description: 'Это действие невозможно отменить',
    delete: 'Удалить',
    cancel: 'Отменить',
  },
}
