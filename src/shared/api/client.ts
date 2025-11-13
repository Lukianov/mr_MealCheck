import ky, { type KyInstance, type Options as KyOptions } from 'ky'
import { computed, readonly, ref, shallowRef } from 'vue'

import type {
  ApiRequestInput,
  ApiRequestOptions,
  BeforeRequestHooks,
} from './types'
import { isDev } from '@/shared/env/env'
import { parseTelegramInitData } from '@/shared/lib/helpers/parseInitDate'
import { useSessionToken } from '@/shared/lib/composables/useSessionToken'

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'https://mealcheck.backend.kolupaev.tech/api'

const LOCALHOST_TEST_TOKEN = 'testik_pestik-10943'

const setTelegramInitData = (initData: string): string | null => {
  telegramInitData.value = isDev ? LOCALHOST_TEST_TOKEN : initData

  return telegramInitData.value
}

const { getInitData, setInitData } = useSessionToken()

function checkSessionInitDataToken(tokenData: string | null) {
  isSessionTokenChecked.value = true

  if (!tokenData || tokenData === 'user') {
    console.warn('tokenData', getInitData())

    return getInitData()
  }

  setInitData(tokenData)

  return tokenData
}

const isSessionTokenChecked = ref(false)

const telegramInitData = ref<string | null>(null)

const clientRef = shallowRef<KyInstance | null>(null)

const beforeRequest: BeforeRequestHooks = [
  (request) => {
    if (!isSessionTokenChecked.value) {
      telegramInitData.value = checkSessionInitDataToken(telegramInitData.value)
    }

    const currentInitData = telegramInitData.value

    if (currentInitData && !telegramInitData.value) {
      telegramInitData.value = currentInitData
    }

    if (currentInitData) {
      request.headers.set('Authorization', `Bearer ${currentInitData}`)
    }
  },
]

const createClient = (): KyInstance =>
  ky.create({
    prefixUrl: API_BASE_URL.replace(/\/$/, ''),
    timeout: 45000,
    hooks: {
      beforeRequest,
    },
  })

export const apiClient = (): KyInstance => {
  if (!clientRef.value) {
    clientRef.value = createClient()
  }

  return clientRef.value
}

export const apiRequest = async <T>(
  input: ApiRequestInput,
  options: ApiRequestOptions = {},
): Promise<T> => {
  const { headers, ...kyOptions } = options

  const instance = apiClient()

  const finalOptions: KyOptions = {
    ...kyOptions,
    headers,
  }

  return instance(input, finalOptions).json<T>()
}

const userData = computed(() => {
  const parsedData = parseTelegramInitData(telegramInitData.value)

  if (parsedData.user) {
    return parsedData.user
  }

  return ''
})

export const useApiClient = () => ({
  apiClient,
  apiRequest,
  initData: readonly(telegramInitData),
  setTelegramInitData,
  userData,
})
