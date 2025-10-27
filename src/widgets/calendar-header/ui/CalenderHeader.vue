<template>
  <div
    class="flex items-center justify-between p-4 border-y"
    :style="{
      background: 'rgba(29, 29, 29, 1)',
      'border-color': 'rgba(255, 255, 255, 0.05)',
    }"
  >
    <div class="flex items-center gap-1">
      <RouterLink :to="{ path: '/onboarding-page' }">
        <img
          class="w-7 h-7 rounded-lg"
          src="@/shared/assets/images/logo-mascot.png"
          alt="mealcheck logo"
        />
      </RouterLink>
      <p><span>Meal</span>check</p>
    </div>
    <button>today</button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
