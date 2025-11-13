import WebApp from '@twa-dev/sdk'
import type { Router } from 'vue-router'
import { RouteName, router } from '@/shared/lib/router'

const historyBackHandler = () => {
  console.warn(
    'window.history',
    window.history.state?.back,
    window.history.length > 1,
  )

  const hasBack =
    Boolean(window.history.state?.back) || window.history.length > 1

  if (hasBack) {
    window.history.back()
  } else {
    router.push({ name: RouteName.Main })
  }
}

export function registerTmaBackButtonGuard(router: Router) {
  WebApp.ready()

  WebApp.BackButton.offClick(historyBackHandler)

  WebApp.BackButton.onClick(historyBackHandler)

  router.afterEach((to) => {
    const needBack = Boolean(to.meta?.tmaBackButton)

    if (needBack) {
      WebApp.BackButton.show()
    } else {
      WebApp.BackButton.hide()
    }
  })
}
