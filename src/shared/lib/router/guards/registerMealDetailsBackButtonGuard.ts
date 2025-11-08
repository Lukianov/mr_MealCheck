import WebApp from '@twa-dev/sdk'
import type { RouteLocationRaw, Router } from 'vue-router'
import { RouteName } from '@/shared/lib/router'

const historyBackHandler = () => {
  window.history.back()
}

export function registerTmaBackButtonGuard(router: Router) {
  let currentFallback: RouteLocationRaw = {
    name: RouteName.Main,
  } as RouteLocationRaw

  const backHandler = () => {
    const hasBack = Boolean(window.history.state?.back)

    if (hasBack) {
      router.back()
    } else {
      router.replace(currentFallback || { path: '/main-page' })
    }
  }

  WebApp.BackButton.offClick(historyBackHandler)

  WebApp.BackButton.onClick(historyBackHandler)

  router.afterEach((to) => {
    const needBack = Boolean(to.meta?.tmaBackButton)

    currentFallback = (to.meta?.backFallback as RouteLocationRaw) ?? {
      name: RouteName.Main,
    }

    if (needBack) {
      WebApp.BackButton.offClick(backHandler)

      WebApp.BackButton.onClick(backHandler)

      WebApp.BackButton.show()
    } else {
      WebApp.BackButton.offClick(backHandler)
      WebApp.BackButton.hide()
    }
  })
}
