const SESSION_INIT_DATA_TOKEN = 'SESSION_INIT_DATA_TOKEN'

export function useSessionToken() {
  const setInitData = (token: string | null) => {
    if (!token) {
      sessionStorage.removeItem(SESSION_INIT_DATA_TOKEN)

      return
    }

    sessionStorage.setItem(SESSION_INIT_DATA_TOKEN, token)
  }

  const getInitData = () => {
    return sessionStorage.getItem(SESSION_INIT_DATA_TOKEN)
  }

  return { setInitData, getInitData }
}
