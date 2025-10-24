/// <reference types="vite/client" />

declare global {
  interface TelegramWebApp {
    ready: () => void
  }

  interface TelegramNamespace {
    WebApp?: TelegramWebApp
  }

  interface Window {
    Telegram?: TelegramNamespace
  }
}

export {}
