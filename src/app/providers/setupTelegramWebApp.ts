import WebApp from '@twa-dev/sdk'
import { useApiClient } from '@/shared/api'
import { RouteName, router } from '@/shared/lib/router'
import { isDev } from '@/shared/env/env'
// import { useSessionToken } from '@/shared/lib/composables/useSessionToken'

export const IS_ONBOARDING_PASSED_KEY = 'IS_ONBOARDING_PASSED'

const DARK_THEME_BACKGROUND_COLOR_HEX = '#121212'

const { setTelegramInitData } = useApiClient()

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

// function clearStartParamInInitDataToken(rawTokenWithDetails: string) {
//   const { setInitData } = useSessionToken()
//
//   const cleanedQuery = rawTokenWithDetails
//     .replace(/^"|"$/g, '')
//     .replace(/^\?/, '')
//
//   const cleaned = cleanedQuery
//     .split('&')
//     .filter((pair) => !/^start_param=details-\d+$/.test(pair))
//     .join('&')
//
//   setInitData(cleaned)
//
//   setTelegramInitData(cleaned)
// }

function redirectByExtractDetailsId(raw: string): number | null {
  const s = raw.replace(/^"|"$/g, '')

  const m = s.match(/(?:^|[?&])start_param=details-(\d+)(?:&|$)/)

  if (!m) {
    return
  }

  // clearStartParamInInitDataToken(raw)

  void router.push({ name: RouteName.MealDetails, params: { id: m[1] } })
}

export const setupTelegramWebApp = async () => {
  WebApp.setHeaderColor(DARK_THEME_BACKGROUND_COLOR_HEX)

  WebApp.setBottomBarColor(DARK_THEME_BACKGROUND_COLOR_HEX)

  WebApp.themeParams.secondary_bg_color = DARK_THEME_BACKGROUND_COLOR_HEX

  WebApp.themeParams.section_bg_color = DARK_THEME_BACKGROUND_COLOR_HEX

  WebApp.ready()

  setTelegramInitData(WebApp.initData)

  redirectByExtractDetailsId(WebApp.initData)

  void checkUserOnboardingProcess()

  WebApp.expand()
}
