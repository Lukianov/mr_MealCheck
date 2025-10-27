import WebApp from '@twa-dev/sdk'

export const setupTelegramWebApp = () => {
  WebApp.headerColor = '#121212'
  WebApp.ready()
  WebApp.expand()

  WebApp.BackButton.show()
  WebApp.BackButton.onClick(() => window.history.back())
}
