<template>
  <div>
    <Card v-for="dish in props.dishes" class="not-last:mb-6">
      <template #header>
        {{ dish.name }}
      </template>
      <template #default>
        <KeyValueRow label="Weight" :value="dish.weight || '~150g'" />
        <KeyValueRow
          label="Calories"
          :value="(dish.calories ?? '') + ' kcal'"
        />
        <div>
          <div class="text-zinc-400 text-sm mb-1">
            {{ ru.mealDetail.dishesSection.macronutrients }}
          </div>
          <div class="flex items-center gap-2">
            <StatChip
              label="Protein"
              :value="dish.macros?.protein"
              postfix="g"
            />
            <StatChip label="Fat" :value="dish.macros?.fat" postfix="g" />
            <StatChip label="Carbs" :value="dish.macros?.carbs" postfix="g" />
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

const props = defineProps<{ dishes: Dish[] }>()
</script>
