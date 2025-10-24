import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'
import {router} from "@/shared/lib/router";

export const initApp = () => {
  const app = createApp(App).use(router)

  app.mount('#app')

  return app
}
