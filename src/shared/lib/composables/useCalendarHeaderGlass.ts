import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

export function useCalendarHeaderGlass(
  headerRef: Ref<HTMLElement | null>,
  firstBlockRef: Ref<HTMLElement | null>,
) {
  const isGlassVisible = ref(false)

  const sync = () => {
    const header = headerRef.value
    const firstBlock = firstBlockRef.value

    if (!header || !firstBlock) {
      return
    }

    isGlassVisible.value =
      firstBlock.getBoundingClientRect().top <=
      header.getBoundingClientRect().bottom
  }

  onMounted(() => {
    sync()

    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', sync)
    window.removeEventListener('resize', sync)
  })

  return { isGlassVisible }
}
