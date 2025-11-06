<!-- src/shared/ui/UILoaderRays/UILoaderRays.vue -->
<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    role="img"
    aria-label="Loading"
    class="block uilr"
    :data-prm="respectReducedMotion ? 'on' : 'off'"
    :class="mode === 'spin' ? 'uilr--spin' : ''"
  >
    <g :stroke="color" :stroke-width="thickness" stroke-linecap="round">
      <line
        v-for="i in 8"
        :key="i"
        x1="32"
        y1="6"
        x2="32"
        y2="14"
        :transform="`rotate(${(i - 1) * 45} 32 32)`"
        :style="rayVars(i - 1)"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: number
    color?: string
    thickness?: number
    duration?: number // сек
    mode?: 'fade' | 'spin' // 'fade' по умолчанию или вращение всего svg
    respectReducedMotion?: boolean // учитывать системную настройку reduce-motion
  }>(),
  {
    size: 28,
    color: 'currentColor',
    thickness: 4,
    duration: 0.9,
    mode: 'fade',
    respectReducedMotion: true,
  },
)

const rayVars = (idx: number) => ({
  '--d': `${props.duration}s`,
  '--delay': `${(props.duration / 8) * idx}s`,
})
</script>

<style scoped>
.uilr {
  display: block;
}

/* Мерцающая дорожка */
.uilr line {
  animation: uilr-fade var(--d) linear infinite;
  animation-delay: var(--delay);
}

/* Режим вращения (на случай, если нужна страховка) */
.uilr.uilr--spin line {
  animation: none;
  opacity: 1;
}
.uilr.uilr--spin {
  transform-origin: center;
  transform-box: fill-box;
  animation: uilr-rotate var(--d) linear infinite;
}

/* keyframes глобальные даже в scoped */
@keyframes uilr-fade {
  0% {
    opacity: 1;
  }
  70%,
  100% {
    opacity: 0.2;
  }
}
@keyframes uilr-rotate {
  to {
    transform: rotate(360deg);
  }
}

/* Учитываем reduce-motion только если это включено пропом */
@media (prefers-reduced-motion: reduce) {
  .uilr[data-prm='on'] line {
    animation: none;
    opacity: 0.6;
  }
  .uilr[data-prm='on'] {
    animation: none;
  }
}
</style>
