<template>
  <div>
    <Card v-for="dish in props.dishes" :key="dish.id" class="not-last:mb-6">
      <template #header>
        {{ dish.name }}
      </template>
      <template #icon>
        <TrashIcon class="w-5 h-5" @click="emit('on-delete', dish)" />
      </template>
      <template #default>
        <KeyValueRow
          :label="ru.mealDetail.dishesSection.weight"
          :value="dish.weight"
        >
          <template #action>
            <button
              class="inline-flex items-center gap-1 text-xs text-[#A2ACB0]"
              type="button"
              @click="emit('on-edit-weight', dish)"
            >
              <EditIcon class="h-5 w-5" />
            </button>
          </template>
        </KeyValueRow>
        <KeyValueRow
          :label="ru.mealDetail.dishesSection.health"
          :value="`${dish.healthScore}/10`"
        />
        <KeyValueRow
          :label="ru.mealDetail.dishesSection.recommendation"
          :value="dish.recommendation"
        />
        <div>
          <div class="text-zinc-400 text-sm mb-1">
            {{ ru.mealDetail.dishesSection.macronutrients }}
          </div>
          <div
            class="flex items-center gap-2 overflow-x-scroll -mr-4 no-scrollbar"
          >
            <StatChip
              :label="ru.metrics.kcal"
              :value="dish.macros?.calories"
              postfix=""
            />
            <StatChip
              :label="ru.metrics.protein"
              :value="dish.macros?.protein"
              postfix="g"
            />
            <StatChip
              :label="ru.metrics.fat"
              :value="dish.macros?.fat"
              postfix="g"
            />
            <StatChip
              :label="ru.metrics.carbs"
              :value="dish.macros?.carbs"
              postfix="g"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { Dish } from '@/entities/meal/model/types'
import StatChip from '@/shared/ui/StatChip.vue'
import Card from '@/shared/ui/Card.vue'
import KeyValueRow from '@/shared/ui/KeyValueRow.vue'
import { ru } from '@/shared/lib/i18n/ru'
import TrashIcon from '@/shared/assets/icons/trash-icon.svg'
import EditIcon from '@/shared/assets/icons/edit-icon.svg'

const props = defineProps<{ dishes: Dish[] }>()

const emit = defineEmits<{
  (e: 'on-delete', dish: Dish): void
  (e: 'on-edit-weight', dish: Dish): void
}>()
</script>
