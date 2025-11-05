import { onMounted, onUnmounted } from 'vue'
import WebApp from '@twa-dev/sdk'

export function useTwaViewportVar() {
  const setVH = () =>
    document.documentElement.style.setProperty(
      '--twa-vh',
      `${WebApp.viewportHeight}px`,
    )

  onMounted(() => {
    setVH()
    WebApp?.onEvent?.('viewportChanged', setVH)
  })

  onUnmounted(() => {
    WebApp?.offEvent?.('viewportChanged', setVH)
  })
}
