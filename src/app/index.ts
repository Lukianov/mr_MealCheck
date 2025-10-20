import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'

export const initApp = () => {
  const app = createApp(App)

  app.mount('#app')

  return app
}
