<template>
  <div>
    <UIButton class="px-4 py-3">
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
</script>

<style scoped></style>
