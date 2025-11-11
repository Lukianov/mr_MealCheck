<template>
  <div>
    <h3 class="text-white font-semibold mb-3">{{ title }}</h3>
    <div class="rounded-3xl bg-[#1d1d1d]/90 p-4">
      <SegmentedTabs class="mb-6" :options="TABS_OPTIONS" v-model="range" />

      <div class="relative">
        <canvas ref="canvasEl" height="260"></canvas>
        <div
          v-if="loading || emptyState"
          class="absolute inset-0 grid place-items-center text-zinc-400 text-sm"
        >
          <template v-if="loading">
            {{ ru.userStatistics.loading }}
          </template>
          <template v-else>
            {{
              emptyState === 'today'
                ? ru.userStatistics.emptyToday
                : ru.userStatistics.emptyRange
            }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import SegmentedTabs from '@/shared/ui/UITabs/UITabs.vue'
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import {
  StatsEmptyState,
  StatsLoadResult,
  StatsPoint,
  StatsRange,
} from '@/shared/types/stats'
import { TABS_OPTIONS } from '@/widgets/user-statistics/const'
import { ru } from '@/shared/lib/i18n/ru'

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
  Legend,
)

const props = defineProps<{
  title: string
  loader: (range: StatsRange) => Promise<StatsLoadResult>
  yMax?: number | null
  valueSuffix?: string
}>()

const range = defineModel<StatsRange>({ default: 'day' })

const canvasEl = ref<HTMLCanvasElement | null>(null)

let chart: Chart | null = null

const loading = ref(false)

const emptyState = ref<StatsEmptyState | null>(null)

async function load() {
  loading.value = true

  try {
    const currentRange = range.value ?? 'day'

    const { points, emptyState: nextEmptyState } = await props.loader(
      currentRange,
    )

    if (!points.length) {
      emptyState.value = nextEmptyState ?? null
      destroyChart()
      clearCanvas()
      return
    }

    emptyState.value = null

    render(points)
  } finally {
    loading.value = false
  }
}

function clearCanvas() {
  if (!canvasEl.value) {
    return
  }

  const ctx = canvasEl.value.getContext('2d')

  if (!ctx) {
    return
  }

  ctx.clearRect(0, 0, canvasEl.value.width, canvasEl.value.height)
}

function destroyChart() {
  if (chart) {
    chart.destroy()
    chart = null
  }
}

function render(points: StatsPoint[]) {
  if (!canvasEl.value) {
    return
  }

  const ctx = canvasEl.value.getContext('2d')

  if (!ctx) {
    return
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, canvasEl.value.height)

  gradient.addColorStop(0, 'rgba(0,167,237,0.35)')
  gradient.addColorStop(1, 'rgba(0,167,237,0.00)')

  const labels = points.map((p) => p.label)
  const data = points.map((p) => p.value)

  destroyChart()

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          data,
          tension: 0.35,
          borderWidth: 2,
          borderColor: 'rgba(0,167,237,1)',
          pointRadius: 0,
          fill: true,
          backgroundColor: gradient,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          displayColors: false,
          callbacks: {
            label: (i) => {
              const v = i.parsed.y ?? 0
              const suf = props.valueSuffix ?? ''
              return `${v}${suf}`
            },
          },
        },
      },
      scales: {
        x: {
          //TODO: прикрутить цвет грида
          // grid: {
          //   color: 'rgba(255,255,255,0.06)',
          //   borderColor: 'rgba(255,255,255,0.08)',
          //   borderDash: [4, 4],
          //   tickColor: 'rgba(0,0,0,0)',
          // },
          ticks: {
            color: '#A1A1AA',
            maxRotation: 0,
          },
        },
        y: {
          beginAtZero: true,
          suggestedMax: props.yMax ?? undefined,
          // grid: {
          //   color: 'rgba(255,255,255,0.06)',
          //   borderColor: 'rgba(255,255,255,0.08)',
          //   borderDash: [4, 4],
          // },
          ticks: { color: '#A1A1AA' },
        },
      },
    },
  })
}

watch(
  range,
  () => {
    void load()
  },
  { immediate: true, flush: 'post' },
)

onBeforeUnmount(() => destroyChart())
</script>
