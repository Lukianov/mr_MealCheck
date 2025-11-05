import WebApp from '@twa-dev/sdk'
import { useApiClient } from '@/shared/api'
// import { RouteName, router } from '@/shared/lib/router'

export const IS_ONBOARDING_PASSED_KEY = 'IS_ONBOARDING_PASSED'

export const setupTelegramWebApp = () => {
  const { setTelegramInitData } = useApiClient()

  WebApp.headerColor = '#121212'

  WebApp.ready()

  setTelegramInitData(WebApp.initData)

  debugger

  const onboardingKey = WebApp.CloudStorage.getItem(IS_ONBOARDING_PASSED_KEY)

  console.log(
    'onboardingKey',
    onboardingKey,
    WebApp.CloudStorage.getItem(IS_ONBOARDING_PASSED_KEY),
  )

  // if (!onboardingKey) {
  //   void router.push({ name: RouteName.Onboarding })
  // }

  WebApp.expand()
}
