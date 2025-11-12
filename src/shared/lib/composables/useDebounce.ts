import { onBeforeUnmount } from 'vue'

export function useDebounce<T extends (...args: never[]) => void>(
  fn: T,
  delay = 300,
) {
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null

  const invoke = () => {
    if (!lastArgs) {
      fn()
      return
    }

    fn(...lastArgs)
  }

  const cancel = () => {
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
  }

  const run = (...args: Parameters<T>) => {
    lastArgs = args
    cancel()

    timer = setTimeout(() => {
      timer = null
      invoke()
    }, delay)
  }

  const flush = () => {
    if (timer === null) {
      return
    }

    clearTimeout(timer)
    timer = null
    invoke()
  }

  onBeforeUnmount(cancel)

  return {
    run,
    cancel,
    flush,
  }
}
