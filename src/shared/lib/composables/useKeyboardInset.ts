import { ref, onMounted, onUnmounted } from 'vue'
import WebApp from '@twa-dev/sdk'

export function useKeyboardInset() {
  const inset = ref(0)

  const update = () => {
    const vv = window.visualViewport
    if (vv) {
      // Насколько «съели» высоту экрана
      inset.value = Math.max(0, window.innerHeight - (vv.height + vv.offsetTop))
    } else if (WebApp?.viewportHeight && WebApp?.viewportStableHeight) {
      inset.value = Math.max(
        0,
        WebApp.viewportStableHeight - WebApp.viewportHeight,
      )
    } else {
      inset.value = 0
    }
    document.documentElement.style.setProperty('--kb', `${inset.value}px`)
  }

  onMounted(() => {
    update()
    WebApp?.onEvent?.('viewportChanged', update)
    window.visualViewport?.addEventListener('resize', update)
  })

  onUnmounted(() => {
    WebApp?.offEvent?.('viewportChanged', update)
    window.visualViewport?.removeEventListener('resize', update)
  })

  return { inset }
}
