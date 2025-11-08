import WebApp from '@twa-dev/sdk'
import { useApiClient } from '@/shared/api'
import { RouteName, router } from '@/shared/lib/router'
import { isDev } from '@/shared/env/env'

export const IS_ONBOARDING_PASSED_KEY = 'IS_ONBOARDING_PASSED'

async function checkUserOnboardingProcess() {
  const canUseCloudStorage =
    WebApp.CloudStorage && typeof WebApp.CloudStorage.getItem === 'function'

  if (canUseCloudStorage && !isDev) {
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
  }
}

function redirectByExtractDetailsId(raw: string): number | null {
  const s = raw.replace(/^"|"$/g, '')

  const m = s.match(/(?:^|[?&])start_param=details-(\d+)(?:&|$)/)

  if (!m) {
    return
  }

  void router.push({ name: RouteName.MealDetails, params: { id: m[1] } })
}

export const setupTelegramWebApp = async () => {
  const { setTelegramInitData } = useApiClient()

  WebApp.setHeaderColor('#121212')

  WebApp.setBottomBarColor('#121212')

  WebApp.themeParams.secondary_bg_color = '#121212'

  WebApp.themeParams.section_bg_color = '#121212'

  WebApp.ready()

  setTelegramInitData(WebApp.initData)

  redirectByExtractDetailsId(WebApp.initData)

  void checkUserOnboardingProcess()

  WebApp.expand()
}
