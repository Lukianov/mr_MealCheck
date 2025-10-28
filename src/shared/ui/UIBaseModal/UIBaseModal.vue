<template>
  <Teleport to="body">
    <transition name="sheet">
      <div
        v-show="modelValue"
        class="fixed inset-x-0 bottom-0 z-[100] mx-auto"
        :aria-label="ariaLabel"
        role="dialog"
      >
        <div
          class="mx-auto px-4 pb-[max(env(safe-area-inset-bottom),16px)]"
          :class="widthClass"
        >
          <div
            class="relative rounded-3xl border border-white/10 bg-zinc-900/95 text-zinc-50 shadow-2xl"
          >
            <!-- кнопка закрытия -->
            <button
              v-if="dismissible"
              aria-label="Close"
              class="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-zinc-200 hover:bg-white/15 active:scale-95"
              @click="close"
            >
              ✕
            </button>

            <slot />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue'
import { useOverlayManager } from '@/shared/lib/composables/useOverlayManager'

interface Props {
  modelValue: boolean
  dismissible?: boolean
  widthClass?: string // например 'max-w-[560px]'
  ariaLabel?: string
}
const props = withDefaults(defineProps<Props>(), {
  dismissible: true,
  widthClass: 'max-w-[640px]',
  ariaLabel: 'bottom sheet',
})
const emit = defineEmits<{ 'update:modelValue': [boolean]; close: [] }>()

const { acquire } = useOverlayManager()

let release: null | (() => void) = null

watch(
  () => props.modelValue,
  (v) => {
    if (v) {
      release = acquire()
    } else {
      release?.()
      release = null
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  release?.()
  release = null
})

function close() {
  if (!props.dismissible) {
    return
  }

  emit('update:modelValue', false)

  emit('close')
}
</script>

<style scoped>
.sheet-enter-from,
.sheet-leave-to {
  transform: translateY(18px);
  opacity: 0;
}
.sheet-enter-to,
.sheet-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.sheet-enter-active,
.sheet-leave-active {
  transition: all 0.18s ease;
}
</style>
