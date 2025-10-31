<template>
  <UIBaseModal>
    <template #header-icon>
      <img
        class="h-16 w-16 object-cover rounded-xl"
        src="@/shared/assets/images/mock-images/mock-unrecognized-meal.jpg"
        alt="mock-unrecognized-meal"
      />
    </template>
    <template #default>
      <ResendMeal />
    </template>
  </UIBaseModal>
</template>

<script setup lang="ts">
import UIBaseModal from '@/shared/ui/UIBaseModal/UIBaseModal.vue'
import ResendMeal from '@/features/send-meal-again/ui/ResendMeal.vue'
</script>
