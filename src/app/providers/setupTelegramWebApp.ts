import WebApp from '@twa-dev/sdk'
import { useApiClient } from '@/shared/api'
import { RouteName, router } from '@/shared/lib/router'
import { isDev } from '@/shared/env/env'

export const IS_ONBOARDING_PASSED_KEY = 'IS_ONBOARDING_PASSED'

const DELAY_FOR_INIT_DATA_EXTRACTION = 1500

const DARK_THEME_BACKGROUND_COLOR_HEX = '#121212'

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

async function waitForInitData(
  maxMs = DELAY_FOR_INIT_DATA_EXTRACTION,
): Promise<string> {
  const t0 = performance.now()

  return new Promise((resolve) => {
    const tick = () => {
      const s = WebApp?.initData ?? ''

      if (s) {
        return resolve(s)
      }

      if (performance.now() - t0 > maxMs) {
        return resolve('')
      }

      requestAnimationFrame(tick)
    }

    tick()
  })
}

export const setupTelegramWebApp = async () => {
  const { setTelegramInitData } = useApiClient()

  WebApp.setHeaderColor(DARK_THEME_BACKGROUND_COLOR_HEX)

  WebApp.setBottomBarColor(DARK_THEME_BACKGROUND_COLOR_HEX)

  WebApp.themeParams.secondary_bg_color = DARK_THEME_BACKGROUND_COLOR_HEX

  WebApp.themeParams.section_bg_color = DARK_THEME_BACKGROUND_COLOR_HEX

  WebApp.ready()

  // await waitForInitData()

  setTelegramInitData(WebApp.initData)

  redirectByExtractDetailsId(WebApp.initData)

  void checkUserOnboardingProcess()

  WebApp.expand()
}
