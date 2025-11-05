import WebApp from '@twa-dev/sdk'
import type { Router } from 'vue-router'
import { RouteName } from '../route-names'

const historyBackHandler = () => {
  window.history.back()
}

export function registerMealDetailsBackButtonGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    if (to.name === RouteName.MealDetails) {
      WebApp.BackButton.show()
      WebApp.BackButton.offClick(historyBackHandler)
      WebApp.BackButton.onClick(historyBackHandler)
    } else if (from.name === RouteName.MealDetails) {
      WebApp.BackButton.offClick(historyBackHandler)
      WebApp.BackButton.hide()
    }

    next()
  })
}
