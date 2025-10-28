import type { Hooks, Input, Options as KyOptions } from 'ky'

export type ApiRequestOptions = KyOptions & {
  /** Skip attaching the Authorization header even if initData exists. */
  skipAuth?: boolean
}

export type ApiRequestInput = Input

export type BeforeRequestHooks = NonNullable<Hooks['beforeRequest']>

export type AfterResponseHooks = NonNullable<Hooks['afterResponse']>
