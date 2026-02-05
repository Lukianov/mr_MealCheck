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
      title: 'Умное сопровождение питания',
      description:
        'MealCheck анализирует еду по фото и подсказывает следующий шаг',
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
      description:
        'Начните фиксировать приёмы пищи уже сегодня — завтра утром вы получите первые персональные рекомендации.',
    },
  },
  summaryWidget: {
    caloriesShort: 'Ккал',
    protein: 'белки',
    fat: 'жиры',
    carbs: 'углеводы',
  },
  todayMealBlock: {
    empty: (date: string) => `${date} ничего не добавлено`,
    mealBlockTitle: 'Приёмы пищи за',
    mealRow: {
      status: {
        pending: 'обработка',
      },
    },
  },
  logMealWidget: {
    buttonTitle: 'Добавить',
    takePhoto: 'Сделать фото',
    fromGallery: 'Из Галерии',
    inputText: 'Ввести текстом',
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
  rewriteTextModal: {
    title: 'Не удалось распознать еду по описанию',
    description:
      'Попробуйте описать блюдо проще: название + порция + ключевые ингредиенты.',
    acceptButton: 'Описать',
    cancel: 'Отмена',
  },
  dailyProgressWidget: {
    from: 'За',
    title: 'сегодня',
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
    proteinG: 'белки',
    fatG: 'жиры',
    carbsG: 'угл.',
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
    emptyToday: 'Сегодня ничего не залогировано',
    emptyRange: 'Ничего не логировалось',
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
  textLogModal: {
    title: 'Ввод блюда по тексту',
    description:
      'Опишите, что вы съели. Мы проанализируем и предоставим отчет по блюду',
    buttonTitle: 'Начать анализ',
    placeholder:
      'например, омлет из двух яиц с помидорами, кофе с молоком 200 мл',
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
