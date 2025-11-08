export const ru = {
  onboarding: {
    buttonTitle: 'Далее',
    final: 'Поехали',
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
    welcomeSlide: {
      title: 'Заполните небольшую анкету',
      description: 'Это необходимо для расчета вашей нормы каллорий',
    },
    goalSlide: {
      title: 'Какая у вас цель?',
      description: 'Подходите к этому ответственно',
      loseWeight: {
        title: 'Похудеть',
        description: 'Создайте калорийный дефицит за счёт осознанного питания',
      },
      gainWeight: {
        title: 'Поддерживать вес',
        description: 'Упор на белок и регулярные структурированные тренировки',
      },
      maintainWeight: {
        title: 'Набрать массу',
        description:
          'Формируйте устойчивые привычки и держите высокий уровень энергии',
      },
    },
    genderSlide: {
      title: 'Ваш пол',
      description: 'Рассчитаем норму каллорий',
      woman: 'Женщина',
      man: 'Мужчина',
    },
    weightSlide: {
      title: 'Ваш вес',
      description: 'Рассчитаем норму каллорий',
    },
    heightSlide: {
      title: 'Ваш рост',
      description: 'Рост нужен для точного расчёта базового метаболизма',
    },
    finishSlide: {
      title: 'Все готово!',
      description: 'Можем начинать',
    },
  },
  summaryWidget: {
    caloriesShort: 'Ккал',
    protein: 'белки',
    fat: 'жиры',
    carbs: 'углеводы',
  },
  todayMealBlock: {
    empty: 'Сегодня ничего не добавлено',
    mealBlockTitle: 'Приёмы пищи за сегодня',
    mealRow: {
      status: {
        pending: 'обработка',
      },
    },
  },
  logMealWidget: {
    buttonTitle: 'Добавить',
  },
  mealType: {
    breakfast: 'Завтрак',
    lunch: 'Обед',
    dinner: 'Ужин',
    snack: 'Перекус',
  },
  mealDetail: {
    mealSummaryCard: {
      title: 'Подробнее',
      summary: 'Итог',
      recommendation: 'Рекомендации',
      recognizedDishes: 'Распознано',
      view: 'Посмотреть',
      macronutrients: 'Макронутриенты',
    },
    dishesSection: {
      weight: 'Вес',
      macronutrients: 'Макронутриенты',
      recommendation: 'Рекомендации',
    },
    deleteButton: 'Удалить',
  },
  mealRow: {
    unrecognizedDish: 'Нужно переснять фото',
  },
  retakePhotoModal: {
    title: 'Не удалось распознать еду на фото',
    description:
      'Попробуйте ещё раз — убедитесь, что блюдо хорошо освещено и полностью попадает в кадр.',
    acceptButton: 'Переснять',
    cancel: 'Отмена',
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
    title: (title: string) => `Удалить "${title}" из приема пищи?`,
    description: 'Это действие невозможно отменить',
    delete: 'Удалить',
    cancel: 'Отменить',
  },
  datepicker: {
    today: 'Сегодня',
    pickDate: 'Выберите дату',
  },
  deleteMealModal: {
    title: 'Удалить этот приём пищи из журнала?',
    description: 'Это действие невозможно отменить',
    delete: 'Удалить',
    cancel: 'Отменить',
  },
  mealAnalyzingModal: {
    title: 'Проводим анализ еды',
    description:
      'Скоро появится на главном экране — или просто закройте приложение, и мы пришлём уведомление, когда всё будет готово.',
    confirm: 'Понятно',
  },
  resendMeal: {
    title: 'Не удалось распознать еду',
    description:
      'Пожалуйста, попробуйте ещё раз — убедитесь, что блюдо хорошо видно, полностью попадает в кадр и достаточно освещено.',
    photo: 'Переснять',
    gallery: 'Из галереи',
  },
  meals: {
    one: 'прием пищи',
    two: 'приема пищи',
    few: 'приемов пищи',
  },
}
