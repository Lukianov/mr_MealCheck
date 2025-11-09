import ky, { type KyInstance, type Options as KyOptions } from 'ky'
import { computed, readonly, ref, shallowRef } from 'vue'

import type {
  ApiRequestInput,
  ApiRequestOptions,
  BeforeRequestHooks,
} from './types'
import { isDev } from '@/shared/env/env'
import { parseTelegramInitData } from '@/shared/lib/helpers/parseInitDate'

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'https://mealcheck.backend.kolupaev.tech/api'

const setTelegramInitData = (initData: string): string | null => {
  telegramInitData.value = isDev ? 'testik_pestik-10943' : initData

  return telegramInitData.value
}

const telegramInitData = ref<string | null>(null)

const clientRef = shallowRef<KyInstance | null>(null)

const beforeRequest: BeforeRequestHooks = [
  (request) => {
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
