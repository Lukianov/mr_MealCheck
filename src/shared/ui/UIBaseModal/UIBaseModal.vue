<template>
  <div :aria-label="ariaLabel" role="dialog">
    <div
      class="mx-auto px-4 py-5 rounded-3xl border border-white/10 bg-zinc-900/95 text-zinc-50"
      :class="widthClass"
    >
      <div class="relative shadow-2xl mb-5">
        <slot name="header-icon" />
        <CircleCrossIcon
          v-if="dismissible"
          aria-label="Close"
          class="absolute -right-4 -top-4 grid h-14 w-14 place-items-center"
          @click="close"
        />
      </div>
      <div class="">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CircleCrossIcon from '@/shared/assets/icons/circle-cross-icon.svg'
import { useOverlayManager } from '@/shared/lib/composables/useOverlayManager'

interface Props {
  dismissible?: boolean
  widthClass?: string // например 'max-w-[560px]'
  ariaLabel?: string
  overlayName?: string
}

const { setOpenedModal } = useOverlayManager()

const props = withDefaults(defineProps<Props>(), {
  dismissible: true,
  widthClass: 'max-w-[640px]',
  ariaLabel: 'bottom sheet',
  overlayName: 'overlay',
})

function close() {
  if (!props.dismissible) {
    return
  }

  setOpenedModal(null)
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
