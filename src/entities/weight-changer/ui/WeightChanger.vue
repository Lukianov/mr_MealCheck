<template>
  <div class="p-4 rounded-2xl" :style="{ background: 'rgba(29, 29, 29, 1)' }">
    <div class="flex items-center gap-4">
      <div
        class="w-8 h-8 flex items-center justify-center rounded-lg"
        :style="{ background: 'rgba(255, 255, 255, 0.08)' }"
      >
        <WeightChanger class="w-5 h-5" />
      </div>
      <div>
        <p
          class="text-base mb-0.5"
          :style="{ color: 'rgba(162, 172, 176, 1)' }"
        >
          {{ ru.metrics.weight }}
        </p>
        <p class="text-[18px] leading-6 text-white">
          {{ props.weight }}{{ ru.metrics.kilo }}
        </p>
      </div>
    </div>
    <div
      class="flex gap-4 mt-3"
      v-if="isToday || true"
      @click="setOpenedModal(ModalNames.WeightChangerModal, props.weight)"
    >
      <div class="pt-3">
        <AddIcon class="w-7 h-7" />
      </div>
      <p
        class="text border-t flex-1 pt-3 -mr-4"
        :style="{
          color: 'rgba(0, 167, 237, 1)',
          'border-color': 'rgba(255, 255, 255, 0.08)',
        }"
      >
        {{ ru.weightProgressWidget.addValue }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import WeightChanger from '@/shared/assets/icons/weight-icon.svg'
import AddIcon from '@/shared/assets/icons/add-icon.svg'

import { ru } from '@/shared/lib/i18n/ru'
import { useOverlayManager } from '@/shared/lib/composables/useOverlayManager'
import { ModalNames } from '@/shared/types/modalNames'

const props = defineProps<{ weight: number; isToday: boolean }>()

const { setOpenedModal } = useOverlayManager()
</script>
