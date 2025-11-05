// shared/composables/useFocusAutoscroll.ts
import { onMounted, onUnmounted, Ref } from 'vue'

type Opts = {
  container?: Ref<HTMLElement | null> // если скроллите не window
  footerReserve?: number // высота вашей нижней панели/кнопки, px
}

export function useFocusAutoscroll(opts: Opts = {}) {
  const getScrollEl = () =>
    opts.container?.value ??
    document.scrollingElement ??
    document.documentElement

  const footerReserve = opts.footerReserve ?? 96 // ваша кнопка + паддинги

  let focusedEl: HTMLElement | null = null
  let rafId = 0

  const getKeyboardHeight = () => {
    const vv = window.visualViewport
    if (!vv) return 0
    return Math.max(0, window.innerHeight - (vv.height + vv.offsetTop))
  }

  const ensureVisible = (el: HTMLElement) => {
    const scrollEl = getScrollEl()
    const vv = window.visualViewport
    const kb = getKeyboardHeight()

    // видимая нижняя граница контента с учётом клавиатуры и футера
    const viewportH = vv ? vv.height : window.innerHeight
    const bottomLimit = viewportH - kb - footerReserve

    const rect = el.getBoundingClientRect()
    if (rect.bottom > bottomLimit) {
      const delta = rect.bottom - bottomLimit + 12 // небольшой запас
      if (
        scrollEl === document.scrollingElement ||
        scrollEl === document.documentElement
      ) {
        window.scrollBy({ top: delta, behavior: 'smooth' })
      } else {
        ;(scrollEl as HTMLElement).scrollBy({ top: delta, behavior: 'smooth' })
      }
    }
  }

  const onFocusIn = (e: Event) => {
    const t = e.target as HTMLElement
    if (!t) return
    if (
      t.tagName === 'INPUT' ||
      t.tagName === 'TEXTAREA' ||
      t.isContentEditable
    ) {
      focusedEl = t
      // подождать кадр/пересчёт клавы
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => ensureVisible(t))
    }
  }

  const onFocusOut = () => {
    focusedEl = null
  }

  const onVVResize = () => {
    if (focusedEl) ensureVisible(focusedEl)
  }

  onMounted(() => {
    document.addEventListener('focusin', onFocusIn, true)
    document.addEventListener('focusout', onFocusOut, true)
    window.visualViewport?.addEventListener('resize', onVVResize)
  })

  onUnmounted(() => {
    document.removeEventListener('focusin', onFocusIn, true)
    document.removeEventListener('focusout', onFocusOut, true)
    window.visualViewport?.removeEventListener('resize', onVVResize)
    cancelAnimationFrame(rafId)
  })
}
