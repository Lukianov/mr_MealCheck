import type { Input, Options as KyOptions } from 'ky'

export type AuthState = {
  token: string
  /** Epoch milliseconds */
  expiresAt: number
}

export type ApiRequestOptions = KyOptions & {
  /** Skip attaching the Authorization header even if a token exists. */
  skipAuth?: boolean
}

export type ApiRequestInput = Input
