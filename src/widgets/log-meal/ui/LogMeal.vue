<template>
  <div>
    <LogMealActionSheet
      v-if="showSheet"
      class="absolute right-0 bottom-[72px]"
      v-model="showSheet"
    />
    <UIButton @click="showSheet = !showSheet" class="px-4 py-3">
      <div class="flex items-center justify-center shrink-0 gap-2.5">
        <LogPlusIcon class="w-7" />
        <p class="">
          {{ ru.logMealWidget.buttonTitle }}
        </p>
      </div>
    </UIButton>
  </div>
</template>

<script setup lang="ts">
import LogPlusIcon from '@/shared/assets/icons/log-plus-icon.svg'
import { UIButton } from '@/shared/ui/UIButton'
import { ru } from '@/shared/lib/i18n/en'
import { ref } from 'vue'
import { LogMealActionSheet } from '@/features/log-meal'

const showSheet = ref(false)
</script>

<style scoped></style>
