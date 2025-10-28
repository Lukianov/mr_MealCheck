import ky, { type KyInstance, type Options as KyOptions } from 'ky'
import { readonly, ref, shallowRef } from 'vue'

import type {
  ApiRequestInput,
  ApiRequestOptions,
  BeforeRequestHooks,
} from './types'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

const SKIP_AUTH_HEADER = 'x-mrmealcheck-skip-auth'

const setTelegramInitData = (initData: string): string | null => {
  telegramInitData.value = initData

  return telegramInitData.value
}

const telegramInitData = ref<string | null>(null)

const clientRef = shallowRef<KyInstance | null>(null)

const beforeRequest: BeforeRequestHooks = [
  (request) => {
    const shouldSkip = request.headers.get(SKIP_AUTH_HEADER)

    if (shouldSkip === 'true') {
      request.headers.delete(SKIP_AUTH_HEADER)

      return
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
    hooks: {
      beforeRequest,
    },
  })

const withSkipAuthHeader = (
  headers?: KyOptions['headers'],
): KyOptions['headers'] => {
  if (typeof headers === 'undefined') {
    return {
      [SKIP_AUTH_HEADER]: 'true',
    }
  }

  if (typeof Headers !== 'undefined' && headers instanceof Headers) {
    const clone = new Headers(headers)
    clone.set(SKIP_AUTH_HEADER, 'true')
    return clone
  }

  if (Array.isArray(headers)) {
    return [...headers, [SKIP_AUTH_HEADER, 'true']] as KyOptions['headers']
  }

  return {
    ...(headers as Record<string, string | undefined>),
    [SKIP_AUTH_HEADER]: 'true',
  } as KyOptions['headers']
}

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
  const { skipAuth, headers, ...kyOptions } = options

  const instance = apiClient()

  const finalHeaders = skipAuth ? withSkipAuthHeader(headers) : headers

  const finalOptions: KyOptions = {
    ...kyOptions,
    headers: finalHeaders,
  }

  return instance(input, finalOptions).json<T>()
}

export const useApiClient = () => ({
  apiClient,
  apiRequest,
  initData: readonly(telegramInitData),
  setTelegramInitData,
})
