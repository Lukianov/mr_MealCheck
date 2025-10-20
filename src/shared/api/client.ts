import ky, { type KyInstance, type Options as KyOptions } from 'ky'
import { readonly, ref, shallowRef } from 'vue'

import type {AfterResponseHooks, ApiRequestInput, ApiRequestOptions, AuthState, BeforeRequestHooks} from './types'

const STORAGE_KEY = 'MR_MEAL_CHECK_AUTH_TOKEN'
const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api'
const SKIP_AUTH_HEADER = 'x-mrmealcheck-skip-auth'

export class TokenExpiredError extends Error {
  constructor() {
    super('Authentication token has expired')
    this.name = 'TokenExpiredError'
  }
}

const isExpired = (expiresAt: number) => Date.now() >= expiresAt

function loadAuthState(): AuthState | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return null
    }

    const parsed = JSON.parse(raw) as Partial<AuthState>

    if (!parsed.token || !parsed.expiresAt) {
      window.localStorage.removeItem(STORAGE_KEY)
      return null
    }

    if (isExpired(parsed.expiresAt)) {
      window.localStorage.removeItem(STORAGE_KEY)
      return null
    }

    return { token: parsed.token, expiresAt: parsed.expiresAt }
  } catch (error) {
    console.warn('[api] Failed to restore auth token', error)
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
    }
    return null
  }
}

function persistAuthState(nextState: AuthState | null) {
  if (typeof window === 'undefined') {
    return
  }

  if (!nextState) {
    window.localStorage.removeItem(STORAGE_KEY)
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState))
}

const authState = ref<AuthState | null>(loadAuthState())
const clientRef = shallowRef<KyInstance | null>(null)

const beforeRequest: BeforeRequestHooks = [
  (request) => {
    const shouldSkip = request.headers.get(SKIP_AUTH_HEADER)
    if (shouldSkip === 'true') {
      request.headers.delete(SKIP_AUTH_HEADER)
      return
    }

    const stateBefore = authState.value
    const token = getAuthToken()

    if (!token && stateBefore) {
      throw new TokenExpiredError()
    }

    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`)
    }
  },
]

const afterResponse: AfterResponseHooks = [
  async (_request, _options, response) => {
    if (response.status === 401) {
      clearAuthToken()
    }
  },
]

const createClient = (): KyInstance =>
  ky.create({
    prefixUrl: API_BASE_URL.replace(/\/$/, ''),
    hooks: {
      beforeRequest,
      afterResponse,
    },
  })

export const clearAuthToken = () => {
  authState.value = null
  persistAuthState(null)
}

export const setAuthToken = (token: string, expiresAt: number | Date) => {
  const nextExpiresAt = expiresAt instanceof Date ? expiresAt.getTime() : expiresAt

  if (Number.isNaN(nextExpiresAt) || nextExpiresAt <= Date.now()) {
    throw new Error('expiresAt must be a valid future timestamp')
  }

  const nextState: AuthState = {
    token,
    expiresAt: nextExpiresAt,
  }

  authState.value = nextState
  persistAuthState(nextState)
}

export const getAuthToken = (): string | null => {
  const state = authState.value
  if (!state) {
    return null
  }

  if (isExpired(state.expiresAt)) {
    clearAuthToken()
    return null
  }

  return state.token
}

export const hasValidAuthToken = (): boolean => Boolean(getAuthToken())

export const requireValidAuthToken = (): string => {
  const token = getAuthToken()

  if (!token) {
    throw new TokenExpiredError()
  }

  return token
}

const withSkipAuthHeader = (headers?: KyOptions['headers']): KyOptions['headers'] => {
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

export const apiRequest = async <T>(input: ApiRequestInput, options: ApiRequestOptions = {}): Promise<T> => {
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
  authState: readonly(authState),
  clearAuthToken,
  getAuthToken,
  hasValidAuthToken,
  requireValidAuthToken,
  setAuthToken,
})
