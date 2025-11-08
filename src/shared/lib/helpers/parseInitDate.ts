export function parseTelegramInitData(qs: string) {
  const params = new URLSearchParams(qs.trim().replace(/^\?/, ''))

  const userJson = params.get('user')

  return {
    user: userJson ? JSON.parse(userJson) : null,
    chat_instance: params.get('chat_instance'),
    chat_type: params.get('chat_type'),
    auth_date: params.get('auth_date') ? Number(params.get('auth_date')) : null, // unix seconds
  }
}
