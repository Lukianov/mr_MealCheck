import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { registerMealDetailsBackButtonGuard } from './guards/registerMealDetailsBackButtonGuard'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

registerMealDetailsBackButtonGuard(router)

export * from './routes'
export * from './route-names'
