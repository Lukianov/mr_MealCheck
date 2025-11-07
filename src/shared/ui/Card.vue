<template>
  <section>
    <div class="flex justify-between items-center">
      <h2 class="px-4 text-white font-semibold text-base tracking-tight mb-2">
        <slot name="header" />
      </h2>
      <slot name="icon" />
    </div>
    <div
      class="space-y-4 p-4 rounded-2xl"
      :style="{ background: 'rgba(29, 29, 29, 1)' }"
    >
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ title?: string }>()
</script>
