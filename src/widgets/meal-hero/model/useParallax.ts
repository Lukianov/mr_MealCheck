import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useParallax(speed = 0.35, maxOffset = 140) {
  const offset = ref(0)
  let ticking = false

  const update = () => {
    const sc = window.scrollY || document.documentElement.scrollTop || 0
    offset.value = Math.min(maxOffset, Math.max(0, sc * speed))
    ticking = false
  }

  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(update)
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { offset }
}
