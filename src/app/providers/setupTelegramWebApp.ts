import WebApp from '@twa-dev/sdk'
import { useApiClient } from '@/shared/api'

export const setupTelegramWebApp = () => {
  const { setTelegramInitData } = useApiClient()

  WebApp.headerColor = '#121212'
  WebApp.ready()
  setTelegramInitData(WebApp.initData)
  WebApp.expand()

  WebApp.BackButton.show()
  WebApp.BackButton.onClick(() => window.history.back())
}
