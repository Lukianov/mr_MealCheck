<!-- StaticScoreScale.vue -->
<template>
  <div class="w-full select-none">
    <div
      ref="trackEl"
      class="relative"
      :style="{ paddingLeft: `${padding}px`, paddingRight: `${padding}px` }"
    >
      <div class="relative h-10 flex items-center" :style="{ gap: `${gap}px` }">
        <div
          v-for="(_, i) in labels"
          :key="i"
          class="relative flex-1 h-full flex items-center"
        >
          <div
            class="w-full h-1 rounded-full"
            :class="[i === activeIndex ? 'bg-white' : 'bg-white/30']"
          />
        </div>
        <div
          class="absolute translate-x-[-50%] size-4 rounded-full bg-sky-500 border-4"
          :style="{ left: `${dotX}px` }"
        />
      </div>
    </div>

    <!-- labels -->
    <div class="grid text-white/60 font-semibold" :style="labelsGridStyle">
      <div
        v-for="(label, i) in labels"
        :key="i"
        class="text-center leading-tight whitespace-nowrap text-ellipsis overflow-hidden min-w-0"
        :class="i === activeIndex ? 'text-white' : ''"
      >
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  value: { type: Number, required: true },
  labels: {
    type: Array,
    default: () => ['Вредно', 'Нормально', 'Хорошо', 'Отлично'],
  },
  ranges: { type: Array, default: null },
  gap: { type: Number, default: 4 }, // px между сегментами
  padding: { type: Number, default: 0 }, // px слева/справа
})

const trackEl = ref(null)
const trackWidth = ref(0)

let ro

function measure() {
  if (!trackEl.value) {
    return
  }

  trackWidth.value = trackEl.value.getBoundingClientRect().width || 0
}

onMounted(() => {
  measure()

  ro = new ResizeObserver(measure)

  if (trackEl.value) {
    ro.observe(trackEl.value)
  }

  window.addEventListener('resize', measure, { passive: true })
})

onBeforeUnmount(() => {
  if (ro && trackEl.value) ro.unobserve(trackEl.value)
  window.removeEventListener('resize', measure)
})

const segments = computed(() => Math.max(1, props.labels.length))

const min = 0
const max = 10

const clamped = computed(() => {
  const v = Number.isFinite(props.value) ? props.value : 0
  return Math.min(max, Math.max(min, v))
})

const boundaries = computed(() => {
  const n = segments.value
  const r = props.ranges

  if (Array.isArray(r) && r.length === n + 1) {
    // простая валидация: монотонность
    for (let i = 1; i < r.length; i++) {
      if (!(Number(r[i]) >= Number(r[i - 1]))) {
        break
      }
    }
    return r.map(Number)
  }

  // равные интервалы по умолчанию
  const step = (max - min) / n
  return Array.from({ length: n + 1 }, (_, i) => min + i * step)
})

const innerWidth = computed(() =>
  Math.max(0, trackWidth.value - props.padding * 2),
)

const segmentWidth = computed(() => {
  const n = segments.value
  const gaps = props.gap * (n - 1)
  return Math.max(0, (innerWidth.value - gaps) / n)
})

function findSegment(v) {
  const b = boundaries.value
  const n = segments.value

  // 10 -> последний сегмент
  if (v >= b[n]) return { idx: n - 1, t: 1 }

  for (let i = 0; i < n; i++) {
    const a = b[i]
    const c = b[i + 1]
    if (v >= a && v < c) {
      const denom = c - a || 1
      return { idx: i, t: (v - a) / denom }
    }
  }
  return { idx: 0, t: 0 }
}

const activeIndex = computed(() => findSegment(clamped.value).idx)

const dotX = computed(() => {
  const { idx, t } = findSegment(clamped.value)
  return (
    props.padding +
    idx * (segmentWidth.value + props.gap) +
    t * segmentWidth.value
  )
})

const labelsGridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.labels.length}, minmax(0, 1fr))`,
  columnGap: `${props.gap}px`,
  paddingLeft: `${props.padding}px`,
  paddingRight: `${props.padding}px`,
}))
</script>
