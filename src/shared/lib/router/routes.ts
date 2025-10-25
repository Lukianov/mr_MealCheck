import type { RouteRecordRaw } from 'vue-router'
import { RouteName } from './route-names';

export const routes: RouteRecordRaw[] = [
  {
    path: '/onboarding-page',
    name: RouteName.Onboarding,
    component: () => import('@/pages/onboarding-page/ui/OnboardingPage.vue'),
  },
  {
    path: '/main-page',
    name: RouteName.Main,
    component: () => import('@/pages/main-page/ui/MainPage.vue'),
  },
  {
    path: '/',
    redirect: () => {
      return { path: '/onboarding-page' };
    },
  },

];
