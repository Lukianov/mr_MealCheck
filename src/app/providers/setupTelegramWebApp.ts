import WebApp from '@twa-dev/sdk'
import { useApiClient } from '@/shared/api'
import { RouteName, router } from '@/shared/lib/router'

export const IS_ONBOARDING_PASSED_KEY = 'IS_ONBOARDING_PASSED'

export const setupTelegramWebApp = async () => {
  const { setTelegramInitData } = useApiClient()

  WebApp.setHeaderColor('#121212')

  WebApp.setBottomBarColor('#121212')

  WebApp.themeParams.secondary_bg_color = '#121212'

  WebApp.themeParams.section_bg_color = '#121212'

  WebApp.ready()

  setTelegramInitData(WebApp.initData)

  const onboardingKey = await new Promise<string | undefined>(
    (resolve, reject) => {
      WebApp.CloudStorage.getItem(IS_ONBOARDING_PASSED_KEY, (err, value) => {
        if (err) {
          reject(err)
        } else {
          resolve(value)
        }
      })
    },
  )

  if (!onboardingKey) {
    void router.push({ name: RouteName.Onboarding })
  }

  WebApp.expand()
}
