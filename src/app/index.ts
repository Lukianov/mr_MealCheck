import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'
import { router } from '@/shared/lib/router'
import { setupTelegramWebApp } from '@/app/providers/setupTelegramWebApp'

export const initApp = () => {
  const app = createApp(App).use(router)

  app.mount('#app')

  setupTelegramWebApp()

  return app
}
