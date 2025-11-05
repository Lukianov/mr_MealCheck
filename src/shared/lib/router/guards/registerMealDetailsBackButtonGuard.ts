import WebApp from '@twa-dev/sdk'
import type { Router } from 'vue-router'

const historyBackHandler = () => {
  window.history.back()
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
