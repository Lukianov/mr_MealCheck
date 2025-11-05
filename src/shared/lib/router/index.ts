import { createRouter, createWebHistory } from 'vue-router'

import { routes } from './routes'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export * from './routes'
export * from './route-names'
