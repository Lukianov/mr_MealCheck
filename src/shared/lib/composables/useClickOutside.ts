import { isRef, onBeforeUnmount, type Ref, type UnwrapRef } from 'vue'

type MaybeElement = HTMLElement | null
type MaybeElementSource = Ref<MaybeElement> | MaybeElement
type MaybeEnabled = Ref<boolean> | boolean | undefined

type ClickOutsideEvent = MouseEvent | PointerEvent | TouchEvent

interface UseClickOutsideOptions {
  enabled?: MaybeEnabled
  ignore?: MaybeElementSource[]
  eventName?: 'mousedown' | 'mouseup' | 'click' | 'pointerdown'
}

const defaultEvent: UseClickOutsideOptions['eventName'] = 'pointerdown'

function resolveElement(target: MaybeElementSource): MaybeElement {
  if (isRef(target)) {
    return target.value as UnwrapRef<MaybeElement>
  }

  return target ?? null
}

function resolveEnabled(source: MaybeEnabled): boolean {
  if (isRef(source)) {
    return Boolean(source.value)
  }

  return source ?? true
}

export function useClickOutside(
  target: Ref<MaybeElement>,
  handler: (event: ClickOutsideEvent) => void,
  options: UseClickOutsideOptions = {},
) {
  if (typeof window === 'undefined') {
    return { stop: () => {} }
  }

  const eventName = options.eventName ?? defaultEvent

  const listener = (event: ClickOutsideEvent) => {
    if (!resolveEnabled(options.enabled)) {
      return
    }

    const el = resolveElement(target)
    const eventTarget = event.target as Node | null

    if (!el || !eventTarget) {
      return
    }

    if (el === eventTarget || el.contains(eventTarget)) {
      return
    }

    if (
      options.ignore?.some((item) => {
        const ignored = resolveElement(item)
        return (
          ignored && (ignored === eventTarget || ignored.contains(eventTarget))
        )
      })
    ) {
      return
    }

    handler(event)
  }

  document.addEventListener(eventName, listener, true)

  const stop = () => {
    document.removeEventListener(eventName, listener, true)
  }

  onBeforeUnmount(stop)

  return { stop }
}
