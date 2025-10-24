import type { RouteRecordRaw } from 'vue-router'
import { RouteName } from './route-names';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: () => {
      return { path: '/onboarding' };
    },
  },
  {
    path: '/onboarding',
    name: RouteName.Onboarding,
    component: () => import('@/pages/onboarding/ui/OnboardingPage.vue'),
  },
];
