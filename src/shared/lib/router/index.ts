import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { registerTmaBackButtonGuard } from './guards/registerMealDetailsBackButtonGuard'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

registerTmaBackButtonGuard(router)

export * from './routes'
export * from './route-names'
