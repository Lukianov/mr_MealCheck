<template>
  <UIBackgroundBlurred />
  <main class="min-h-screen flex max-w-3xl m-auto">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import UIBackgroundBlurred from '@/shared/ui/UIBackgroundBlurred/UIBackgroundBlurred.vue'
</script>
