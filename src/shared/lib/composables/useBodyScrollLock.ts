import { watch, onBeforeUnmount, type Ref } from 'vue'

export function useBodyScrollLock(active: Ref<boolean>) {
  const el = document.documentElement

  const lock = () => el.classList.add('overflow-hidden', 'touch-none')
  const unlock = () => el.classList.remove('overflow-hidden', 'touch-none')

  watch(active, (v) => (v ? lock() : unlock()), { immediate: true })

  onBeforeUnmount(unlock)
}
